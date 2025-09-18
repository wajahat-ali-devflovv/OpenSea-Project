from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import auth_routes, nft_routes

app = FastAPI()

# ✅ Allow frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Serve static images
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ✅ Routers
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(nft_routes.router, prefix="/nfts", tags=["NFTs"])
