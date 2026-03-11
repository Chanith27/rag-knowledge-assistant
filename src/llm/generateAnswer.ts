import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAnswer(
  question: string,
  context: string[]
): Promise<string> {
  const contextText = context.join("\n");

  const prompt = `You are an AI assistant that answers questions using the provided context.

Context:
${contextText}

Question:
${question}

Answer:`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content ?? "No answer generated.";
}