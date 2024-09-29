export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface FormState {
  messages: Message[];
  error?: string;
}