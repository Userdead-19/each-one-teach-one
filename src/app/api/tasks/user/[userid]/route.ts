import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Task from "@/lib/models/Task";

// Define RouteContext type for dynamic route params
type RouteContext = {
    params: {
        userid: string;
    };
};


export async function GET(request: Request, { params }: { params: Promise<{ userid: string }> }) {
    try {
        const { userid } = await params;
        await connectToDatabase();

        const tasks = await Task.find({ userId: userid });

        if (!tasks.length) {
            return NextResponse.json({ message: "No tasks found for this user" }, { status: 404 });
        }

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error("Error fetching tasks by user ID:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
