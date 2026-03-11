import { loadDocuments } from "./loaders/documentLoader";
import { chunkText } from "./utils/chunker";

const docsPath = "./docs";

const documents = loadDocuments(docsPath);
console.log(`Documents Loaded: ${documents.length}`);

const allChunks: string[] = [];

for (const doc of documents) {
  const chunks = chunkText(doc);
  allChunks.push(...chunks);
}

console.log(`Chunks Created: ${allChunks.length}`);
console.log(allChunks);