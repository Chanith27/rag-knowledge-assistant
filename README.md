# RAG Knowledge Assistant

A professional Retrieval-Augmented Generation (RAG) system built with TypeScript and Node.js. This application allows users to upload documents (PDF and TXT), index them into a vector database, and perform natural language queries to receive context-aware answers grounded in the uploaded data.

---

## Features

- **Multi-format Support**: Process both `.txt` and `.pdf` documents.
- **Web Interface**: Modern, responsive UI for uploading documents and chatting.
- **REST API**: Robust Express.js backend for integration with other services.
- **Vector Storage**: Powered by ChromaDB for efficient similarity search.
- **Smart Chunking**: Optimized text chunking for better retrieval accuracy.
- **AI Powered**: Uses OpenAI's `text-embedding-3-small` and `gpt-4o-mini` for embeddings and generation.
- **Containerization**: Fully containerized for easy deployment and local development.

---

## Quick Start (Docker)

The fastest way to get started is using Docker Compose.

### 1. Configuration
```bash
git clone https://github.com/Chanith27/rag-knowledge-assistant.git
cd rag-knowledge-assistant
```
Create a `.env` file and add your OpenAI Key:
```env
OPENAI_API_KEY=your_key_here
```

### 2. Deployment
```bash
docker-compose up --build
```

### 3. Access
Navigate to `http://localhost:3001` in your browser.

---

## Manual Installation

If you prefer to run the project without Docker:

### Prerequisites
- **Node.js**: v20 or higher
- **Python**: v3.10+ (for ChromaDB server)
- **OpenAI API Key**

### Setup
1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Setup ChromaDB**
   ```bash
   pip install chromadb
   ```
3. **Environment Variables**
   Create a `.env` file:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

---

## Running the Application

### 1. Start Vector Database
Open a terminal and run:
```bash
npm run chroma
```
*This starts ChromaDB on port 8000 with persistence in `./chroma_db`.*

### 2. Start the Server
In a new terminal, run:
```bash
npm run serve
```
The server will start at `http://localhost:3001`.

---

## Project Structure

```
rag-knowledge-assistant/
├── docs/                # Uploaded/Processed documents
├── public/              # Frontend web interface (HTML/CSS/JS)
├── src/
│   ├── embeddings/      # OpenAI Embedding integration
│   ├── loaders/         # PDF and Text file processors
│   ├── utils/           # Text chunker and Chroma client
│   ├── retrieval/       # Similarity search logic
│   ├── llm/             # OpenAI Chat completion logic
│   ├── server.ts        # Express API server
│   ├── ingest.ts        # CLI Ingestion script
│   └── query.ts         # CLI Query script
├── Dockerfile           # Web app container definition
└── docker-compose.yml   # Multi-container orchestration
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/upload` | Upload and index a `.txt` or `.pdf` file |
| `POST` | `/query` | Ask a question based on indexed knowledge |

---

## Technology Stack

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: Vanilla JS, Modern CSS (Glassmorphism)
- **Database**: ChromaDB (Vector Store)
- **AI**: OpenAI API (Embeddings & Completion)
- **DevOps**: Docker, Docker Compose

---

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request.

---
