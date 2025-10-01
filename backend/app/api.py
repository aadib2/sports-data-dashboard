from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.fetch_data import router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]

# we need to enable Cross Origin Resource Sharing (CORS) to be able to handle cross-origin requests (different protocols)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/", tags=['root'])
async def read_root() -> dict:
    return {"message": "Welcome to this dashboard!"}

# add route for fetching nfl game data
app.include_router(router)
