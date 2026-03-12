import { chromaClient } from "../utils/chromaClient";
import { generateEmbedding } from "../embeddings/openaiEmbedding";

const embeddingFunction = {
  generate: async (texts: string[]) =>
    Promise.all(texts.map((t) => generateEmbedding(t))),
};

export async function retrieveContext(question: string): Promise<string[]> {
  const collection = await chromaClient.getOrCreateCollection({
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