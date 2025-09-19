from fastapi import APIRouter
from database import get_connection
import psycopg2.extras
import psycopg2.extras

from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from database import get_connection
import psycopg2.extras, os, shutil
from auth import verify_admin 


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

UPLOAD_DIR = "uploads/collections"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ✅ Create new collection (Admin only)
@router.post("/collections")
def create_collection(
    name: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(...),
    user=Depends(verify_admin)
):
    conn = get_connection()
    image_path = f"/uploads/collections/{image.filename}"
    file_location = os.path.join(UPLOAD_DIR, image.filename)

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(
            "INSERT INTO collections (name, description, image_path) VALUES (%s, %s, %s) RETURNING id, name, description, image_path;",
            (name, description, image_path),
        )
        new_collection = cur.fetchone()
        conn.commit()

    return {
        "id": new_collection["id"],
        "name": new_collection["name"],
        "description": new_collection["description"],
        "image_path": f"http://localhost:8000{new_collection['image_path']}"
    }


# ✅ Create NFT (Admin only)
@router.post("/collections/{collection_id}/nfts")
def create_nft(
    collection_id: int,
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    status: str = Form(...),  # e.g., "available", "sold"
    image: UploadFile = File(...),
    user=Depends(verify_admin)
):
    conn = get_connection()
    upload_dir = f"uploads/nfts/{collection_id}"
    os.makedirs(upload_dir, exist_ok=True)

    image_path = f"/{upload_dir}/{image.filename}"
    file_location = os.path.join(upload_dir, image.filename)

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(
            """
            INSERT INTO nfts (collection_id, name, description, price, status, image_path)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id, name, description, price, status, image_path;
            """,
            (collection_id, name, description, price, status, image_path),
        )
        new_nft = cur.fetchone()
        conn.commit()

    return {
        "id": new_nft["id"],
        "name": new_nft["name"],
        "description": new_nft["description"],
        "price": float(new_nft["price"]),
        "status": new_nft["status"],
        "image_url": f"http://localhost:8000{new_nft['image_path']}",
    }

# ✅ Update NFT (Admin only)
@router.put("/{nft_id}")
def update_nft(
    nft_id: int,
    name: str = Form(None),
    description: str = Form(None),
    price: float = Form(None),
    status: str = Form(None),
    image: UploadFile = File(None),
    user=Depends(verify_admin)
):
    conn = get_connection()

    # Handle image upload if provided
    image_path = None
    if image:
        upload_dir = f"uploads/nfts/{nft_id}"
        os.makedirs(upload_dir, exist_ok=True)
        image_path = f"/{upload_dir}/{image.filename}"
        file_location = os.path.join(upload_dir, image.filename)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

    fields = []
    values = []
    if name: fields.append("name=%s"); values.append(name)
    if description: fields.append("description=%s"); values.append(description)
    if price is not None: fields.append("price=%s"); values.append(price)
    if status: fields.append("status=%s"); values.append(status)
    if image_path: fields.append("image_path=%s"); values.append(image_path)

    if not fields:
        raise HTTPException(status_code=400, detail="No fields to update")

    query = f"UPDATE nfts SET {', '.join(fields)} WHERE id=%s RETURNING id, name, description, price, status, image_path;"
    values.append(nft_id)

    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(query, tuple(values))
        updated = cur.fetchone()
        conn.commit()

    if not updated:
        raise HTTPException(status_code=404, detail="NFT not found")

    return {
        "id": updated["id"],
        "name": updated["name"],
        "description": updated["description"],
        "price": float(updated["price"]),
        "status": updated["status"],
        "image_url": f"http://localhost:8000{updated['image_path']}" if updated["image_path"] else None,
    }

# ✅ Delete NFT (Admin only)
@router.delete("/{nft_id}")   
def delete_nft(nft_id: int, user=Depends(verify_admin)):
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute("DELETE FROM nfts WHERE id=%s RETURNING id;", (nft_id,))
        deleted = cur.fetchone()
        conn.commit()

    if not deleted:
        raise HTTPException(status_code=404, detail="NFT not found")

    return {"message": "NFT deleted successfully", "id": nft_id}
