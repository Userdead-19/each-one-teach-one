import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Group from "@/lib/models/Group";

// GET: Fetch all groups for a user
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        await connectToDatabase();

        let query = {};
        if (userId) {
            query = { members: userId };
        }

        const groups = await Group.find(query);

        return NextResponse.json(groups, { status: 200 });
    } catch (error) {
        console.error("Error fetching groups:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST: Create a new group
export async function POST(request: Request) {
    try {
        const { name, description, creator } = await request.json();

        if (!name || !creator) {
            return NextResponse.json({ error: "Group name and creator are required" }, { status: 400 });
        }

        await connectToDatabase();

        const newGroup = new Group({
            name,
            description,
            creator,
            members: [creator],
            createdAt: new Date(),
        });

        await newGroup.save();

        return NextResponse.json({ _id: newGroup._id }, { status: 201 });
    } catch (error) {
        console.error("Error creating group:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
