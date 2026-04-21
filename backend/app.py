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
from dotenv import load_dotenv
import os

load_dotenv()  # load .env file

app = Flask(__name__)
CORS(app)

SECRET_KEY = os.getenv("SECRET_KEY","fallback_secret")
DATABASE_URL = os.getenv("DATABASE_URL")

# DB connection fun
def get_connection():
    return psycopg2.connect(DATABASE_URL)

# Load Model(best.pkl)
data = joblib.load("best.pkl")
model = data["model"]
vectorizer = data["vectorizer"]
le = data["label_encoder"]
le1 = data["ms_encoder"]
le2 = data["tc_encoder"]
le3 = data["fs_encoder"]
le4 = data["comp_encoder"]

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

def competitors_count(comp):
    if comp == "Low":
        return "1-3 competitors"
    elif comp == "Medium":
        return "4-7 competitors"
    elif comp == "Many":
        return "8+ competitors"
    else:
        return "Unknown"

def competitors_to_number(comp):
    if comp == "Low":
        return 2
    elif comp == "Medium":
        return 5
    elif comp == "Many":
        return 10
    else:
        return 0

# API predict route
@app.route("/predict",methods=["POST"])
def predict():

      #  ADD THIS PART HERE
    if request.method == "GET":
        return "Use POST request with JSON (Postman)"

    try:
        conn = get_connection()
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
        ms = str(data_input["market_saturation"]).strip().title()
        tc = str(data_input["tech_complexity"]).strip().title()
        fs = str(data_input["funding_stage"]).strip().title()
        # comp = str(data_input["competitors"]).strip().title()

        if ms == "High":
            comp = "Many"
        elif ms == "Medium":
            comp = "Medium"
        else:
            comp = "Low"

        # preprocess
        text = clean_text(idea + " " + sector)
        X_text = vectorizer.transform([text])

        def safe_transform(value, encoder):
            if value in encoder.classes_:
                return encoder.transform([value])[0]
            else:
                return 0
    
        ms_enc = safe_transform(ms,le1)
        tc_enc = safe_transform(tc, le2)
        fs_enc = safe_transform(fs, le3)
        comp_enc = safe_transform(comp, le4)

        X_final = sp.hstack([X_text, [[ms_enc,tc_enc,fs_enc,comp_enc]]])

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
        (user_id,idea, sector, market_saturation, tech_complexity, funding_stage, competitors, risk, confidence, message, team_size)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """

        comp_num = competitors_to_number(comp)
        
        values = (
            user_id,
            idea, sector, ms, tc, fs,comp_num,
            risk, confidence, message, team
        )

        cursor.execute(query, values)
        conn.commit()

        cursor.close()
        conn.close()

        # response
        return jsonify({
            "idea":idea,
            "sector":sector,
            "market_saturation":ms,
            "tech_complexity":tc,
            "funding_complexity":fs,
            "competitors":comp,
            "competitors_range": competitors_count(comp),
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
        conn = get_connection()
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

        cursor.close()
        conn.close()

        return jsonify({"message" : "User registered successfully"})
    except Exception as e:
        return jsonify({"error" : str(e)})


# PROTECTED ROUTE
@app.route("/protected", methods=["GET"])
def protected():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"error": "Token missing"})

        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])

        cursor.close()
        conn.close()

        return jsonify({"message": "Access granted", "user": decoded})

    except Exception as e:
        return jsonify({"error": str(e)})

# LOGIN API
@app.route("/login",methods=["POST"])
def login():
    try:
        conn = get_connection()
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

            cursor.close()
            conn.close()

            return jsonify({"token": token})
        
        else:
            return jsonify({"error":"Invalid Password"})
        
    except Exception as e:
        return jsonify({"error":str(e)})
    

# HISTORY API
@app.route("/history",methods=["GET"])
def history():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        # GET token
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"error":"Token missing"})
        decoded = jwt.decode(token,SECRET_KEY,algorithms=["HS256"])
        user_id = decoded["user_id"]

        # Fetch user data
        query = """
        SELECT idea, sector, competitors, risk, confidence, created_at
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
                "competitors":row[2],
                "risk":row[3],
                "confidence":float(row[4]),
                "created_at":str(row[5])
            })

        cursor.close()
        conn.close()
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)})

# USER API CODE
@app.route("/user", methods=["GET"])
def get_user():
    try:
        conn = get_connection()
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
    port = int(os.environ.get("PORT",5000))
    app.run(host="0.0.0.0",port=port)