import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/lib/models/User";
import StudyGroup from "@/lib/models/StudygGroup";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");

        await connectToDatabase();

        if (type === "users") {
            const users = await User.find({});
            return NextResponse.json(users, { status: 200 });
        }
        if (type === "groups") {
            const groups = await StudyGroup.find({});
            return NextResponse.json(groups, { status: 200 });
        }

        // Fetch both users and study groups
        const [users, groups] = await Promise.all([User.find({}), StudyGroup.find({})]);

        return NextResponse.json({ users, studyGroups: groups }, { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
