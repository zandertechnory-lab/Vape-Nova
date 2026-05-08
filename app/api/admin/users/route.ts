import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/clerk-auth";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET(request: NextRequest) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;
    await connectDB();
    const users = await User.find({}).select("-password").lean();
    return NextResponse.json({ users, count: users.length }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
