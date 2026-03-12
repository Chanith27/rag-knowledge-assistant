import fs from "fs";
import path from "path";
const pdf = require("pdf-parse");

export async function loadByFilePath(filePath: string): Promise<string> {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".txt") {
    return fs.readFileSync(filePath, "utf-8");
  } else if (extension === ".pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    let text = "";
    
    // In v2.4.5+, the function is often a class PDFParse
    if (typeof pdf.PDFParse === "function") {
      const parser = new pdf.PDFParse({ data: dataBuffer });
      const result = await parser.getText();
      text = result.text;
      await parser.destroy();
    } else if (typeof pdf === "function") {
      const data = await pdf(dataBuffer);
      text = data.text;
    } else if (typeof pdf.default === "function") {
      const data = await pdf.default(dataBuffer);
      text = data.text;
    } else {
      throw new Error("pdf-parse library not loaded correctly. Export keys: " + Object.keys(pdf).join(", "));
    }
    
    return text;
  }

  return "";
}

export async function loadDocuments(directoryPath: string): Promise<string[]> {
  const documents: string[] = [];

  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const content = await loadByFilePath(filePath);
    if (content.trim()) {
      documents.push(content);
    }
  }

  return documents;
}