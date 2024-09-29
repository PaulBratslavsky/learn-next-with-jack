"use server";

import { auth } from "../auth";
import { getCompletionService } from "@/services/get-completion-service";
import { Message, FormState } from "@/types";

export async function getCompletion(prevState: FormState, formData: FormData): Promise<FormState> {
  const session = await auth();
  if (!session?.user) return { messages: [], error: "Not authenticated" };

  const prompt = formData.get("prompt") as string;
  if (!prompt) return { ...prevState , error: "Prompt is required" };

  const messageHistory: Message[] = [
    ...prevState.messages,
    { role: "user", content: prompt },
  ];

  try {
    const completionContent = await getCompletionService(messageHistory);
    return {
      messages: [
        ...messageHistory,
        { role: "assistant", content: completionContent },
      ],
    };
  } catch (error) {
    console.error("Error in getCompletion:", error);
    return { messages: prevState.messages, error: "Failed to get completion" };
  }
}
