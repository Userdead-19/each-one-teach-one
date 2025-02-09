import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Course from "@/lib/models/Course";
import { ObjectId } from "mongodb";

// Define proper route segment config
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
        }

        await connectToDatabase();

        const courses = await Course.find({ userId: new ObjectId(id) });

        return NextResponse.json(courses, { status: 200 });

    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
    }
}