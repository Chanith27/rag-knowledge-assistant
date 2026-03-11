import { retrieveContext } from "./retrieval/retrieveContext";

async function main() {
  const question = "What is Machine Learning?";

  console.log(`Question: ${question}\n`);

  const context = await retrieveContext(question);

  console.log("Retrieved Context:");
  context.forEach((chunk, i) => {
    console.log(`${i + 1}. ${chunk}`);
  });
}

main();