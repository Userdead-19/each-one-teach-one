import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/lib/models/User";

export async function PUT(request: Request) {
    try {
        const { email, password, name } = await request.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        await connectToDatabase();

        // Check if the user already exists
        const existingUser = await User.findOne({ email }).lean();
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        // Hash password and create user
        const hashedPassword = await hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "User created successfully", userId: newUser._id }, { status: 201 });
    } catch (error) {
        console.error("User registration error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
