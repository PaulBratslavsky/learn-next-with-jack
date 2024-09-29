"use client";

import { useRef, useEffect, useCallback } from "react";
import { getCompletion } from "@/actions/get-completion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";

import { Separator } from "@/components/ui/separator";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface FormState {
  messages: Message[];
  error?: string;
}

export function ChatInterface() {
  
  const handleSubmit = useCallback(async (prevState: FormState, formData: FormData) => {
    const result = await getCompletion(prevState, formData);
    return { messages: result.messages as Message[], error: result.error };
  }, []);

  const [state, formAction] = useFormState(handleSubmit, { messages: [], error: ""  });
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages]);

  console.log(state);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Chat Interface</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ScrollArea className="h-[400px] pr-4" ref={scrollAreaRef}>
          {state?.messages.map((message: Message, index: number) => (
            <div
              key={index}
              ref={index === state.messages.length - 1 ? lastMessageRef : null}
              className={`mb-4 p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-muted"
              } max-w-[80%] ${message.role === "user" ? "ml-auto" : "mr-auto"}`}
            >
              {message.content}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <form
          action={formAction}
          className="flex w-full items-center space-x-2"
        >
          <Input
            id="prompt"
            type="text"
            name="prompt"
            placeholder="Type your message..."
            className="flex-grow"
          />
          <SubmitButton />
        </form>
        {state.error && (
          <p className="text-destructive text-sm w-full text-center bg-destructive/10 p-2 rounded-md">
            {state.error}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
