import { ChromaClient } from "chromadb";
import { generateEmbedding } from "../embeddings/openaiEmbedding";

const client = new ChromaClient({ host: "localhost", port: 8000, ssl: false });

const embeddingFunction = {
  generate: async (texts: string[]) =>
    Promise.all(texts.map((t) => generateEmbedding(t))),
};

export async function retrieveContext(question: string): Promise<string[]> {
  const collection = await client.getOrCreateCollection({
    name: "knowledge_base",
    embeddingFunction,
  });

  const questionEmbedding = await generateEmbedding(question);

  const results = await collection.query({
    queryEmbeddings: [questionEmbedding],
    nResults: 3,
  });

  return results.documents[0] as string[];
}