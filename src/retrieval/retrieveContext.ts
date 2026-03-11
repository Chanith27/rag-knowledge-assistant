import { ChromaClient } from "chromadb";
import { generateEmbedding } from "../embeddings/openaiEmbedding";

const client = new ChromaClient({ path: "http://localhost:8000" });

export async function retrieveContext(question: string): Promise<string[]> {
  const collection = await client.getOrCreateCollection({ name: "knowledge_base" });

  const questionEmbedding = await generateEmbedding(question);

  const results = await collection.query({
    queryEmbeddings: [questionEmbedding],
    nResults: 3,
  });

  return results.documents[0] as string[];
}