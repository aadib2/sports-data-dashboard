from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.fetch_data import router

# database
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel

app = FastAPI()

# DB setup
DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# where the cross origin requests are coming from
origins = [
    "http://localhost:5173",
    "localhost:5173"
]

# we need to enable Cross Origin Resource Sharing (CORS) to be able to handle cross-origin requests (different protocols)
# this is needed to handle requests that originate from a different protocol, IP address, domain-name, or port (e.g. React.js)
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
