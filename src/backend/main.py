from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import psycopg2
import os

app = FastAPI()

# ✅ Allow frontend (React Vite) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static images from /uploads
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Example DB connection
conn = psycopg2.connect(
    dbname="opensea_db",
    user="postgres",
    password="yourpassword",
    host="localhost",
    port="5432"
)

@app.get("/nfts")
def get_nfts():
    with conn.cursor() as cur:
        cur.execute("SELECT id, name, description, image_path, price, status FROM nfts;")
        rows = cur.fetchall()
        nfts = []
        for r in rows:
            nfts.append({
                "id": r[0],
                "name": r[1],
                "description": r[2],
                "image_url": f"http://localhost:8000{r[3]}",  # make full URL
                "price": float(r[4]),
                "status": r[5],
            })
        return nfts
