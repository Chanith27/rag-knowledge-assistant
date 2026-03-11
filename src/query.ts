import { ragPipeline } from "./rag";

async function main() {
  const question = "What is Machine Learning?";

  console.log(`Question: ${question}\n`);

  const answer = await ragPipeline(question);

  console.log(`Answer:\n${answer}`);
}

main();