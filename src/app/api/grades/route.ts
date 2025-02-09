import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Course from "@/lib/models/Course";

export async function POST(request: Request) {
    try {
        const { name, grade, credits, userId } = await request.json();

        if (!name || !grade || !credits || !userId) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        await connectToDatabase();
        const newCourse = await Course.create({ name, grade, credits, userId });

        return NextResponse.json(newCourse, { status: 201 });
    } catch (error) {
        console.error("Error adding course:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
