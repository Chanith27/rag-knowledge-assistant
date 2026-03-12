import { loadDocuments } from "./loaders/documentLoader";
import { chunkText } from "./utils/chunker";
import { generateEmbedding } from "./embeddings/openaiEmbedding";
import { chromaClient } from "./utils/chromaClient";

const docsPath = "./docs";

const embeddingFunction = {
  generate: async (texts: string[]) =>
    Promise.all(texts.map((t) => generateEmbedding(t))),
};

async function main() {
  const documents = await loadDocuments(docsPath);
  console.log(`Documents Loaded: ${documents.length}`);

  const allChunks: string[] = [];
  for (const doc of documents) {
    const chunks = chunkText(doc);
    allChunks.push(...chunks);
  }
  console.log(`Chunks Created: ${allChunks.length}`);

  const embeddings: number[][] = [];
  for (const chunk of allChunks) {
    const embedding = await generateEmbedding(chunk);
    embeddings.push(embedding);
  }
  console.log(`Embeddings Generated: ${embeddings.length}`);

  const collection = await chromaClient.getOrCreateCollection({
    name: "knowledge_base",
    embeddingFunction,
  });

  const ids = allChunks.map((_, i) => `chunk_${i}`);
  await collection.add({ ids, embeddings, documents: allChunks });

  console.log(`Stored in ChromaDB: ${allChunks.length}`);
}

main();