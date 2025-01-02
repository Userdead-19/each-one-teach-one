"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatContentProps {
  chatId: string;
}

export function ChatContent({ chatId }: ChatContentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatPartner, setChatPartner] = useState({ name: "", avatar: "" });

  useEffect(() => {
    // Simulating fetching chat data
    const fetchedMessages = [
      {
        id: 1,
        sender: "John Doe",
        content: "Hey, how's your project going?",
        timestamp: "10:30 AM",
      },
      {
        id: 2,
        sender: "You",
        content: "It's going well, thanks for asking!",
        timestamp: "10:32 AM",
      },
      {
        id: 3,
        sender: "John Doe",
        content: "Great! Let me know if you need any help.",
        timestamp: "10:33 AM",
      },
    ];
    setMessages(fetchedMessages);
    setChatPartner({
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    });
  }, [chatId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white shadow-sm p-4 flex items-center space-x-4">
        <Link
          href="/communications"
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <Avatar>
          <AvatarImage src={chatPartner.avatar} />
          <AvatarFallback>
            {chatPartner.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">{chatPartner.name}</h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] ${
                message.sender === "You"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } rounded-lg p-3`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 text-right">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="bg-white p-4 flex items-center space-x-2">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1"
        />
        <Button onClick={sendMessage}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  );
}
