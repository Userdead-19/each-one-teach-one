import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import StudyGroup from "@/lib/models/StudygGroup";

export async function POST(request: Request) {
    try {
        const { groupName, description, members } = await request.json();

        if (!groupName || !members || members.length === 0) {
            return NextResponse.json({ error: "Group name and members are required" }, { status: 400 });
        }

        await connectToDatabase();

        // Create new study group
        const newGroup = await StudyGroup.create({ groupName, description, members });

        return NextResponse.json({ message: "Study group created", groupId: newGroup._id }, { status: 201 });
    } catch (error) {
        console.error("Study group creation error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
