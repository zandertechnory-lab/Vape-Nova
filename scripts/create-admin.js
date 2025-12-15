/**
 * Script to initialize admin user
 * Run with: node scripts/create-admin.js
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// MongoDB connection string - update this with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/vapenova";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function createAdmin() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("✓ Connected to MongoDB");

        const adminEmail = "admin@vapenova.com";
        const adminPassword = "admin123";

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("\n⚠️  Admin user already exists!");
            console.log(`Email: ${adminEmail}`);
            console.log("\nIf you forgot the password, you can:");
            console.log("1. Delete the existing admin from MongoDB");
            console.log("2. Run this script again");
            await mongoose.connection.close();
            process.exit(0);
        }

        // Create admin user
        console.log("\nCreating admin user...");
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const admin = new User({
            name: "Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
        });

        await admin.save();
        console.log("\n✓ Admin user created successfully!");
        console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📧 Email:    " + adminEmail);
        console.log("🔑 Password: " + adminPassword);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("\n⚠️  IMPORTANT: Change the admin password after first login!");
        console.log("\nYou can now:");
        console.log("1. Go to http://localhost:3000/account/signin");
        console.log("2. Sign in with the credentials above");
        console.log("3. Access the admin panel at http://localhost:3000/admin");

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("\n❌ Error:", error.message);
        if (error.code === 11000) {
            console.log("\nAdmin user already exists with this email.");
        }
        await mongoose.connection.close();
        process.exit(1);
    }
}

createAdmin();
