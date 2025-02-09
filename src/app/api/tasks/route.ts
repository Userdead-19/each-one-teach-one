import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Task from "@/lib/models/Task";

export async function GET() {
    try {
        await connectToDatabase();
        const tasks = await Task.find({});
        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { title, description, status, dueDate, userId } = await request.json();

        if (!title || !userId) {
            return NextResponse.json({ error: "Title and userId are required" }, { status: 400 });
        }

        await connectToDatabase();

        const newTask = await Task.create({ title, description, status, dueDate, userId });

        return NextResponse.json({ message: "Task created", task: newTask }, { status: 201 });
    } catch (error) {
        console.error("Task creation error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}



export async function PUT(request: Request) {
    try {
        const { _id, ...updateData } = await request.json();

        if (!_id) {
            return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
        }

        await connectToDatabase();

        const updatedTask = await Task.findByIdAndUpdate(_id, updateData, { new: true });

        if (!updatedTask) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Task updated", task: updatedTask }, { status: 200 });
    } catch (error) {
        console.error("Task update error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

