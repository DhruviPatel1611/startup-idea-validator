import psycopg2

conn = psycopg2.connect("postgresql://neondb_owner:npg_7qkceWPO6udX@ep-sparkling-mode-an479a6r-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")

cursor = conn.cursor()

# print("Neon Database Connected!!")

# cursor.execute("""
# CREATE TABLE IF NOT EXISTS startup_idea(
#                id SERIAL PRIMARY KEY,
#                idea TEXT,
#                sector VARCHAR(100),
#                market_saturation VARCHAR(50),
#                tech_complexity VARCHAR(50),
#                funding_stage VARCHAR(50),
#                risk VARCHAR(20),
#                confidence NUMERIC,
#                message TEXT,
#                team_size VARCHAR(50),
#                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#                )
# """)

# conn.commit()

# print("Table Created!!")

query = """
INSERT INTO startup_idea
(idea, sector, market_saturation, tech_complexity, funding_stage, risk, confidence, message, team_size)
VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
"""

values = (
    "AI fitness app",
    "HealthTech",
    "High",
    "Medium",
    "Seed",
    "Medium",
    0.82,
    "Moderate risk",
    "4-6 members"
)

cursor.execute(query, values)
conn.commit()

print("✅ Data inserted")