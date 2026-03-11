import chromadb
from chromadb.app import app
import uvicorn
import os

if __name__ == "__main__":
    os.environ["PERSIST_DIRECTORY"] = "./chroma_db"
    os.environ["CHROMA_SERVER_AUTH_PROVIDER"] = "" # Disable auth
    # Most newer Chroma versions use ANONYMIZED_TELEMETRY=False or similar
    os.environ["ANONYMIZED_TELEMETRY"] = "False"
    
    print("Starting ChromaDB on 127.0.0.1:8000...")
    uvicorn.run(app, host="127.0.0.1", port=8000)
