from fastapi import APIRouter, HTTPException, Form
from database import get_connection
from auth import hash_password, verify_password, create_access_token
import psycopg2.extras

router = APIRouter()

@router.post("/signup")
def signup(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...)
):
    conn = get_connection()
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute("SELECT * FROM users WHERE email=%s;", (email,))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed = hash_password(password)
        cur.execute(
            "INSERT INTO users (username, email, password_hash, role) VALUES (%s, %s, %s, %s) RETURNING id, username, email, role;",
            (username, email, hashed, "user"),
        )
        user = cur.fetchone()
        conn.commit()

        token = create_access_token({
    "sub": str(user["id"]),
    "role": user["role"]
})

@router.post("/login")
def login(email: str = Form(...), password: str = Form(...)):
    conn = get_connection()
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute("SELECT * FROM users WHERE email=%s;", (email,))
        user = cur.fetchone()
        if not user or not verify_password(password, user["password_hash"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        token = create_access_token({
    "sub": str(user["id"]),
    "role": user["role"]
})
        return {
            "token": token,
            "user": {
                "id": user["id"],
                "username": user["username"],
                "email": user["email"],
                "role": user["role"],
            },
        }
