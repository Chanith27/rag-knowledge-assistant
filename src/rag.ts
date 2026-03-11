import { retrieveContext } from "./retrieval/retrieveContext";
import { generateAnswer } from "./llm/generateAnswer";

export async function ragPipeline(question: string): Promise<string> {
  const context = await retrieveContext(question);
  const answer = await generateAnswer(question, context);
  return answer;
}