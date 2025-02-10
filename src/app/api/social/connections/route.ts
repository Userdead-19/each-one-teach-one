import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Connection from "@/lib/models/Connection";

// GET: Fetch connections for a user
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        await connectToDatabase();

        const connections = await Connection.find({
            $or: [{ user1: userId }, { user2: userId }],
        });

        return NextResponse.json(connections, { status: 200 });
    } catch (error) {
        console.error("Error fetching connections:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST: Create a new connection
export async function POST(request: Request) {
    try {
        const { user1, user2 } = await request.json();

        if (!user1 || !user2) {
            return NextResponse.json({ error: "Both user IDs are required" }, { status: 400 });
        }

        await connectToDatabase();

        // Check if connection already exists
        const existingConnection = await Connection.findOne({
            $or: [
                { user1, user2 },
                { user1: user2, user2: user1 },
            ],
        });

        if (existingConnection) {
            return NextResponse.json({ error: "Connection already exists" }, { status: 400 });
        }

        const newConnection = new Connection({
            user1,
            user2,
            status: "pending",
            createdAt: new Date(),
        });

        await newConnection.save();

        return NextResponse.json({ _id: newConnection._id }, { status: 201 });
    } catch (error) {
        console.error("Error creating connection:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
