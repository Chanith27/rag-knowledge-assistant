import { loadDocuments } from "./loaders/documentLoader";
import { chunkText } from "./utils/chunker";
import { generateEmbedding } from "./embeddings/openaiEmbedding";

const docsPath = "./docs";

async function main() {
  const documents = loadDocuments(docsPath);
  console.log(`Documents Loaded: ${documents.length}`);

  const allChunks: string[] = [];
  for (const doc of documents) {
    const chunks = chunkText(doc);
    allChunks.push(...chunks);
  }
  console.log(`Chunks Created: ${allChunks.length}`);

  const results: { text: string; embedding: number[] }[] = [];

  for (const chunk of allChunks) {
    const embedding = await generateEmbedding(chunk);
    results.push({ text: chunk, embedding });
  }

  console.log(`Embeddings Generated: ${results.length}`);
  console.log(`Embedding Length: ${results[0].embedding.length}`);
}

main();