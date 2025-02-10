import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Chat from "@/lib/models/Chat";

// GET: Fetch all chats for a user
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        await connectToDatabase();

        const chats = await Chat.find({
            participants: userId,
        });

        return NextResponse.json(chats, { status: 200 });
    } catch (error) {
        console.error("Error fetching chats:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST: Create a new chat
export async function POST(request: Request) {
    try {
        const { participants, message } = await request.json();

        if (!participants || participants.length < 2 || !message) {
            return NextResponse.json(
                { error: "At least two participants and a message are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const newChat = new Chat({
            participants,
            messages: [
                {
                    sender: participants[0],
                    content: message,
                    timestamp: new Date(),
                },
            ],
            createdAt: new Date(),
        });

        await newChat.save();

        return NextResponse.json({ _id: newChat._id }, { status: 201 });
    } catch (error) {
        console.error("Error creating chat:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
