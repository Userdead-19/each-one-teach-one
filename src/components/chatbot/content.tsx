"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
}

export function ChatbotContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI study assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        content: input,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInput("");
      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          content:
            "I'm processing your request. As an AI assistant, I'm here to help with your studies!",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen p-6">
      <div>
        <h1 className="text-3xl font-bold">AI Study Assistant</h1>
        <p className="text-gray-500">Get help with your studies anytime</p>
      </div>

      <ScrollArea className="flex-grow mt-6 border rounded-lg p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`flex items-start ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={
                    message.sender === "user"
                      ? "/placeholder.svg?height=32&width=32"
                      : "/bot-avatar.png"
                  }
                />
                <AvatarFallback>
                  {message.sender === "user" ? "U" : "AI"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`mx-2 p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="mt-4 flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message here..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSend}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  );
}
