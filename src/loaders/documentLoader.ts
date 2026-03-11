import fs from "fs";
import path from "path";

export function loadDocuments(directoryPath: string): string[] {
  const documents: string[] = [];

  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    if (file.endsWith(".txt")) {
      const content = fs.readFileSync(filePath, "utf-8");
      documents.push(content);
    }
  }

  return documents;
}