import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/lib/models/User";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        await connectToDatabase();
        const user = await User.findOne({ email }).lean() as { _id: string, email: string, password: string } | null;

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || "fallback_secret",
            { expiresIn: "1h" }
        );

        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
