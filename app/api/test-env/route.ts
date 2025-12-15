import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        hasMongoUri: !!process.env.MONGODB_URI,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        mongoUriPreview: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + "..." : "NOT SET",
        message: "Environment check"
    });
}
