import OpenAI from "openai";
import { Message } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
const TEMPERATURE = Number(process.env.OPENAI_TEMPERATURE) || 0.7;

export async function getCompletionService(messageHistory: Message[]): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: MODEL,
    temperature: TEMPERATURE,
    messages: messageHistory,
  });

  return completion.choices[0].message.content || "No response";
}