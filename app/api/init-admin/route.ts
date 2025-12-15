import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const adminEmail = "admin@vapenova.com";
        const adminPassword = "admin123";

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            return NextResponse.json(
                {
                    message: "Admin user already exists!",
                    email: adminEmail,
                    note: "Use these credentials to sign in"
                },
                { status: 200 }
            );
        }

        // Create admin user
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const admin = new User({
            name: "Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
        });

        await admin.save();

        return NextResponse.json({
            success: true,
            message: "Admin user created successfully!",
            credentials: {
                email: adminEmail,
                password: adminPassword,
            },
            warning: "IMPORTANT: Change the admin password after first login!",
            nextSteps: [
                "Go to /account/signin",
                "Sign in with the credentials above",
                "Access the admin panel at /admin"
            ]
        });
    } catch (error: any) {
        console.error("Error creating admin:", error);
        return NextResponse.json(
            { error: "Failed to create admin user", details: error.message },
            { status: 500 }
        );
    }
}
