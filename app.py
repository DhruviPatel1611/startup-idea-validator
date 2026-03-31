# run command - python app.py

from flask import Flask,request,jsonify
import joblib
import psycopg2
import numpy as np
import re
import scipy.sparse as sp
import bcrypt
import jwt
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
SECRET_KEY = "mysecretkey"

# Load Model(best.pkl)
data = joblib.load("best.pkl")
model = data["model"]
vectorizer = data["vectorizer"]
le = data["label_encoder"]
le1 = data["ms_encoder"]
le2 = data["tc_encoder"]
le3 = data["fs_encoder"]

# connect neon database
conn = psycopg2.connect("postgresql://neondb_owner:npg_7qkceWPO6udX@ep-sparkling-mode-an479a6r-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")
# cursor = conn.cursor()

# Home route
@app.route("/")
def home():
    return "🚀 Startup Idea Validator API Running"

# text cleaning
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]','',text)
    return text

# extra features
def risk_message(risk):
    if risk == "Low":
        return "Statup idea has good potential"
    elif risk == "Medium":
        return "Moderate risk, needs validation"
    else:
        return "High risk, rethink strategy"
    
def suggest_team(tc):
    if tc == "Low":
        return "2-4 members"
    elif tc == "Medium":
        return "4-6 members"
    else:
        return "6-10 members"
    
# API predict route
@app.route("/predict",methods=["POST"])
def predict():

      # 👇 ADD THIS PART HERE
    if request.method == "GET":
        return "Use POST request with JSON (Postman)"

    try:
        cursor = conn.cursor()
        # GET Token
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error" : "Token missing"})
        
        decoded = jwt.decode(token,SECRET_KEY,algorithms=["HS256"])
        user_id = decoded["user_id"]

        # GET input
        data_input = request.json

        idea = data_input["idea"]
        sector = data_input["sector"]
        ms = data_input["market_saturation"]
        tc = data_input["tech_complexity"]
        fs = data_input["funding_stage"]

        # preprocess
        text = clean_text(idea + " " + sector)
        X_text = vectorizer.transform([text])

        ms_enc = le1.transform([ms])
        tc_enc = le2.transform([tc])
        fs_enc = le3.transform([fs])

        X_final = sp.hstack([X_text, [[ms_enc[0],tc_enc[0],fs_enc[0]]]])

        # prediction
        pred = model.predict(X_final)
        prob = model.predict_proba(X_final)

        risk = le.inverse_transform(pred)[0]
        confidence = float(np.max(prob))

        message = risk_message(risk)
        team = suggest_team(tc)

        # Insert into db
        query = """
        INSERT INTO startup_idea
        (user_id,idea, sector, market_saturation, tech_complexity, funding_stage, risk, confidence, message, team_size)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """

        values = (
            user_id,
            idea, sector, ms, tc, fs,
            risk, confidence, message, team
        )

        cursor.execute(query, values)
        conn.commit()

        # response
        return jsonify({
            "risk":risk,
            "confidence":round(confidence,2),
            "message":message,
            "team_size":team
        })
    except Exception as e:
        return jsonify({"error" : str(e)})
    

# REGISTER API
@app.route("/register",methods=["POST"])
def register():
    try:
        cursor = conn.cursor()
        data = request.json

        name = data["name"]
        email = data["email"]
        password = data["password"]

        # hash password
        hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        query = "INSERT INTO users (name, email, password) VALUES (%s,%s,%s)"
        cursor.execute(query,(name, email, hashed_pw))
        conn.commit()
        
        return jsonify({"message" : "User registered successfully"})
    except Exception as e:
        return jsonify({"error" : str(e)})


# PROTECTED ROUTE
@app.route("/protected", methods=["GET"])
def protected():
    try:
        cursor = conn.cursor()
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"error": "Token missing"})

        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

        return jsonify({"message": "Access granted", "user": decoded})

    except Exception as e:
        return jsonify({"error": str(e)})

# LOGIN API
@app.route("/login",methods=["POST"])
def login():
    try:
        conn = psycopg2.connect("postgresql://neondb_owner:npg_7qkceWPO6udX@ep-sparkling-mode-an479a6r-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")

        cursor = conn.cursor()

        data = request.json

        email = data["email"]
        password = data["password"]

        cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
        user = cursor.fetchone()

        if user is None:
            return jsonify({"error" : "User not found"})
        stored_password = user[3].encode('utf-8')

        if bcrypt.checkpw(password.encode('utf-8'), stored_password):

            # create token
            token = jwt.encode({
                "user_id":user[0],
                "exp":datetime.utcnow() + timedelta(hours=2)
            }, SECRET_KEY,algorithm="HS256")

            return jsonify({"token": token})
        
        else:
            return jsonify({"error":"Invalid Password"})
        
    except Exception as e:
        return jsonify({"error":str(e)})
    

# HISTORY API
@app.route("/history",methods=["GET"])
def history():
    try:
        cursor = conn.cursor()
        # GET token
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"error":"Token missing"})
        decoded = jwt.decode(token,SECRET_KEY,algorithms=["HS256"])
        user_id = decoded["user_id"]

        # Fetch user data
        query = """
        SELECT idea, sector, risk, confidence, created_at
        FROM startup_idea
        WHERE user_id = %s
        ORDER BY created_at DESC
        """

        cursor.execute(query, (user_id,))
        rows = cursor.fetchall()

        # Format response
        result = []

        for row in rows:
            result.append({
                "idea":row[0],
                "sector":row[1],
                "risk":row[2],
                "confidence":float(row[3]),
                "created_at":str(row[4])
            })
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"reeoe": str(e)})

# USER API CODE
@app.route("/user", methods=["GET"])
def get_user():
    try:
        cursor = conn.cursor()
        # GET TOKEN
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"error": "Token missing"})

        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded["user_id"]

        # FETCH USER FROM DB
        cursor.execute("SELECT name, email FROM users WHERE id=%s", (user_id,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "User not found"})

        return jsonify({
            "name": user[0],
            "email": user[1]
        })

    except Exception as e:
        return jsonify({"error": str(e)})
    
# run app
if __name__ == "__main__":
    app.run(debug=True)