import { NextResponse } from "next/server"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
    const { email, password } = await request.json()

    try {
        const client = await clientPromise
        const db = client.db("edulearn")
        const user = await db.collection("users").findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        const token = sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "fallback_secret", {
            expiresIn: "1h",
        })

        return NextResponse.json({ token }, { status: 200 })
    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

