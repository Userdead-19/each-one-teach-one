import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Resource from "@/lib/models/Resource";
import { ObjectId } from "mongodb";

// GET: Fetch a resource by ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectToDatabase();

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid resource ID format" }, { status: 400 });
        }

        const resource = await Resource.findById(id);

        if (!resource) {
            return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        }

        return NextResponse.json(resource, { status: 200 });
    } catch (error) {
        console.error("Error fetching resource:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PUT: Update a resource by ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectToDatabase();

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid resource ID format" }, { status: 400 });
        }

        const updates = await request.json();
        const updatedResource = await Resource.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedResource) {
            return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Resource updated successfully", resource: updatedResource });
    } catch (error) {
        console.error("Error updating resource:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE: Delete a resource by ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        await connectToDatabase();

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid resource ID format" }, { status: 400 });
        }

        const deletedResource = await Resource.findByIdAndDelete(id);

        if (!deletedResource) {
            return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Resource deleted successfully" });
    } catch (error) {
        console.error("Error deleting resource:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
