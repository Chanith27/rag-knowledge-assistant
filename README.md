# RAG Knowledge Assistant

A Retrieval-Augmented Generation (RAG) system built with TypeScript that allows you to ask natural language questions and receive answers grounded in your own document knowledge base. The system loads text documents, generates vector embeddings, stores them in ChromaDB, and uses OpenAI to produce accurate, context-aware answers.

---

## How It Works

The system follows a two-phase pipeline.

**Ingestion Phase** — run once to build the knowledge base:

```
Text Documents --> Chunking --> Embedding --> ChromaDB Storage
```

**Query Phase** — run whenever you want an answer:

```
User Question --> Embedding --> ChromaDB Similarity Search --> OpenAI LLM --> Answer
```

---

## Project Structure

```
rag-knowledge-assistant/
│
├── docs/                        # Your knowledge documents (.txt files)
│   ├── ai.txt
│   ├── ml.txt
│   └── dl.txt
│
├── src/
│   ├── loaders/
│   │   └── documentLoader.ts    # Reads .txt files from the docs folder
│   │
│   ├── utils/
│   │   └── chunker.ts           # Splits documents into fixed-size chunks
│   │
│   ├── embeddings/
│   │   └── openaiEmbedding.ts   # Generates vector embeddings using OpenAI
│   │
│   ├── vectorstore/
│   │   └── chromaClient.ts      # Stores and retrieves embeddings from ChromaDB
│   │
│   ├── retrieval/
│   │   └── retrieveContext.ts   # Performs similarity search in ChromaDB
│   │
│   ├── llm/
│   │   └── generateAnswer.ts    # Sends context and question to OpenAI Chat API
│   │
│   ├── ingest.ts                # Entry point for the ingestion pipeline
│   ├── query.ts                 # Entry point for the query pipeline
│   └── rag.ts                   # Orchestrates the full RAG pipeline
│
├── .env                         # API keys (not committed to git)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## Prerequisites

Make sure you have the following installed before getting started:

- Node.js (v18 or higher)
- Python (v3.10 or higher)
- An OpenAI API key

---

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/Chanith27/rag-knowledge-assistant.git
cd rag-knowledge-assistant
```

**2. Install Node dependencies**

```bash
npm install
```

**3. Install ChromaDB**

```bash
pip install chromadb
```

**4. Set up environment variables**

Create a `.env` file in the root of the project:

```
OPENAI_API_KEY=your-openai-api-key-here
```

---

## Running the Project

### Step 1 — Start ChromaDB

Open a dedicated terminal and run:

```bash
python -m chromadb.cli.cli run --path ./chroma_db
```

Keep this terminal running throughout your session.

### Step 2 — Ingest Your Documents

In a second terminal, run the ingestion pipeline:

```bash
npm run ingest
```

This will load all `.txt` files from the `docs/` folder, chunk them, generate embeddings, and store everything in ChromaDB.

Expected output:

```
Documents Loaded: 3
Chunks Created: 3
Embeddings Generated: 3
Stored in ChromaDB: 3
```

You only need to run this once, or again when you add or update documents.

### Step 3 — Ask a Question

```bash
npm run query
```

Expected output:

```
Question: What is Machine Learning?

Answer:
Machine Learning is a branch of Artificial Intelligence that enables
systems to learn patterns from data and improve performance without
being explicitly programmed.
```

---

## Adding Your Own Documents

Place any `.txt` file inside the `docs/` folder, then re-run the ingestion:

```bash
npm run ingest
```

The system will automatically pick up the new files.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| Ingest | `npm run ingest` | Load, chunk, embed and store documents |
| Query | `npm run query` | Ask a question and get an answer |

---

## Technology Stack

| Technology | Purpose |
|---|---|
| TypeScript | Application language |
| Node.js | Runtime environment |
| OpenAI API | Embeddings and answer generation |
| ChromaDB | Local vector database |
| ts-node | TypeScript execution |
| dotenv | Environment variable management |

---

## Environment Variables

| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | Your OpenAI API key from platform.openai.com |

---
