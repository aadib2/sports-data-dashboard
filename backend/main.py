import uvicorn # asynchronous server gateway interface, used to stand up backend API
from dotenv import load_dotenv

load_dotenv() # make environment variables accessible to server

if __name__ == "__main__":
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)