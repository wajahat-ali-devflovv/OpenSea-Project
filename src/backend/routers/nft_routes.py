from fastapi import APIRouter
from database import get_connection
import psycopg2.extras
import psycopg2.extras


router = APIRouter()

# ✅ Get all categories
@router.get("/categories")
def get_categories():
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT id, name FROM categories;")
        return cur.fetchall()

# ✅ Get collections for a given category
@router.get("/collections/{category_id}")
def get_collections(category_id: int):
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT id, name FROM collections WHERE category_id=%s;", (category_id,))
        return cur.fetchall()
        
# ✅ Get all collections (without category filter)

@router.get("/collections")
def get_all_collections():
    conn = get_connection()
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute("SELECT id, name, description,  created_at, image_path FROM collections;")
        rows = cur.fetchall()
        return [
            {
                "id": r["id"],
                "name": r["name"],
                "description": r["description"],
                
                "created_at": r["created_at"],
                "image_path": f"http://localhost:8000{r['image_path']}" if r["image_path"] else None,
            }
            for r in rows
        ]


# ✅ Get NFTs for a given collection
@router.get("/collections/{collection_id}/nfts")
def get_nfts_by_collection(collection_id: int):
    conn = get_connection()
    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(
            "SELECT id, name, description, image_path, price, status FROM nfts WHERE collection_id=%s;",
            (collection_id,)
        )
        rows = cur.fetchall()
        return [
            {
                "id": r["id"],
                "name": r["name"],
                "description": r["description"],
                "image_url": f"http://localhost:8000{r['image_path']}" if r["image_path"] else None,
                "price": float(r["price"]),
                "status": r["status"],
            }
            for r in rows
        ]

