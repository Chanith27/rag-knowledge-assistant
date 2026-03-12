import { ChromaClient } from "chromadb";

const host = process.env.CHROMA_HOST || "localhost";
const port = parseInt(process.env.CHROMA_PORT || "8000");

export const chromaClient = new ChromaClient({ 
  host, 
  port, 
  ssl: false 
});
