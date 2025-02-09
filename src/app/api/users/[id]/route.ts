import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/lib/models/User";
import { ObjectId } from "mongodb";

// Define RouteContext type for dynamic route params
type RouteContext = {
    params: {
        id: string;
    };
};

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        // ✅ Extract `id` from dynamic route params
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // ✅ Validate ObjectId before querying
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findById(new ObjectId(id));

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
