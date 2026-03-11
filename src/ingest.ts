import { loadDocuments } from "./loaders/documentLoader";

const docsPath = "./docs";

const documents = loadDocuments(docsPath);

console.log("Loaded Documents:");
console.log(documents);