import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Conversation from "@/lib/models/Conversation";

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        await connectToDatabase();

        // Mock AI response (Replace with actual AI integration)
        const botResponse = `I received your message: "${message}". As an AI study assistant, I'm here to help with your studies!`;

        // Store conversation in MongoDB
        const newConversation = await Conversation.create({ userMessage: message, botResponse });

        return NextResponse.json({ response: botResponse, id: newConversation._id }, { status: 200 });
    } catch (error) {
        console.error("Chatbot error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
