import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET() {
    try {
        await connectDB();

        // Test different email formats
        const exactCase = await User.findOne({ email: "admin@vapenova.com" });
        const lowerCase = await User.findOne({ email: "admin@vapenova.com".toLowerCase() });
        const allAdmins = await User.find({ role: "admin" }).select("email name role");

        return NextResponse.json({
            exactCaseFound: !!exactCase,
            lowerCaseFound: !!lowerCase,
            exactCaseEmail: exactCase?.email,
            lowerCaseEmail: lowerCase?.email,
            allAdmins: allAdmins.map(u => ({ email: u.email, name: u.name, role: u.role }))
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
