from fastapi import APIRouter, HTTPException, Form
from database import get_connection
from auth import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/signup")
def signup(email: str = Form(...), password: str = Form(...)):
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM users WHERE email=%s;", (email,))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed = hash_password(password)
        cur.execute("INSERT INTO users (email, password_hash) VALUES (%s, %s) RETURNING id;", (email, hashed))
        user_id = cur.fetchone()["id"]
        conn.commit()

        token = create_access_token({"sub": str(user_id)})
        return {"token": token, "user": {"id": user_id, "email": email}}

@router.post("/login")
def login(email: str = Form(...), password: str = Form(...)):
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM users WHERE email=%s;", (email,))
        user = cur.fetchone()
        if not user or not verify_password(password, user["password_hash"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        token = create_access_token({"sub": str(user['id'])})
        return {"token": token, "user": {"id": user["id"], "email": user["email"]}}
