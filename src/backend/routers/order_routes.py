from fastapi import APIRouter, Depends, HTTPException, status, Form                 #last edit 20 sep 2025
from database import get_connection
from auth import oauth2_scheme, jwt, SECRET_KEY, ALGORITHM
import psycopg2.extras
from datetime import datetime

router = APIRouter()

# ✅ Helper: Get logged in user from token
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication")
        return int(user_id)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# ✅ Place an order
@router.post("/orders")
def place_order(
    nft_id: int = Form(...),
    user_id: int = Depends(get_current_user)   # get from JWT
):
    conn = get_connection()
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        # 1. Check NFT availability
        cur.execute("SELECT id, price, status FROM nfts WHERE id=%s;", (nft_id,))
        nft = cur.fetchone()
        if not nft:
            raise HTTPException(status_code=404, detail="NFT not found")
        if nft["status"] != "available":
            raise HTTPException(status_code=400, detail="NFT already sold")

        # 2. Create order
        cur.execute(
            """
            INSERT INTO orders (user_id, nft_id, price, status, created_at)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id, user_id, nft_id, price, status, created_at;
            """,
            (user_id, nft_id, nft["price"], "completed", datetime.utcnow())
        )
        new_order = cur.fetchone()

        # 3. Mark NFT as sold
        cur.execute("UPDATE nfts SET status=%s WHERE id=%s;", ("sold", nft_id))

        conn.commit()

    return {
        "message": "Order placed successfully",
        "order": new_order
    }

# ✅ Get current user's orders
@router.get("/orders/my")
def get_my_orders(user_id: int = Depends(get_current_user)):
    conn = get_connection()
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(
            """
            SELECT o.id, o.nft_id, o.price, o.status, o.created_at,
                   n.name AS nft_name, n.image_path
            FROM orders o
            JOIN nfts n ON o.nft_id = n.id
            WHERE o.user_id=%s
            ORDER BY o.created_at DESC;
            """,
            (user_id,)
        )
        rows = cur.fetchall()
        return [
            {
                "id": r["id"],
                "nft_id": r["nft_id"],
                "nft_name": r["nft_name"],
                "price": float(r["price"]),
                "status": r["status"],
                "created_at": r["created_at"],
                "image_url": f"http://localhost:8000{r['image_path']}" if r["image_path"] else None,
            }
            for r in rows
        ]

# ✅ (Optional) Admin: Get all orders
@router.get("/orders")
def get_all_orders(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admins only")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    conn = get_connection()
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(
            """
            SELECT o.id, o.user_id, u.username, o.nft_id, n.name AS nft_name,
                   o.price, o.status, o.created_at
            FROM orders o
            JOIN users u ON o.user_id = u.id
            JOIN nfts n ON o.nft_id = n.id
            ORDER BY o.created_at DESC;
            """
        )
        return cur.fetchall()
