import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";
import { ragPipeline } from "./rag";
import { chromaClient } from "./utils/chromaClient";
import { generateEmbedding } from "./embeddings/openaiEmbedding";
import { chunkText } from "./utils/chunker";
import { loadByFilePath } from "./loaders/documentLoader";

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "docs/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


const embeddingFunction = {
  generate: async (texts: string[]) =>
    Promise.all(texts.map((t) => generateEmbedding(t))),
};

// Routes
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const content = await loadByFilePath(filePath);
    
    if (!content) {
      return res.status(400).json({ error: "Unsupported file type or empty file" });
    }

    const chunks = chunkText(content);
    
    const embeddings = await Promise.all(
      chunks.map((chunk) => generateEmbedding(chunk))
    );

    const collection = await chromaClient.getOrCreateCollection({
      name: "knowledge_base",
      embeddingFunction,
    });

    const timestamp = Date.now();
    const ids = chunks.map((_, i) => `file_${timestamp}_chunk_${i}`);
    
    await collection.add({
      ids,
      embeddings,
      documents: chunks,
    });

    res.json({ message: "File uploaded and indexed successfully", filename: req.file.filename });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/query", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const answer = await ragPipeline(question);
    res.json({ answer });
  } catch (error: any) {
    console.error("Query error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
