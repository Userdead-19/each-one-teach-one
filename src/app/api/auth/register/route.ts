import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import clientPromise from "@/lib/mongodb";

export async function PUT(request: Request) {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("edulearn");

        // Check if the user already exists
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Insert new user
        const newUser = await db.collection("users").insertOne({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        return NextResponse.json({ message: "User created successfully", userId: newUser.insertedId }, { status: 201 });
    } catch (error) {
        console.error("User registration error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
