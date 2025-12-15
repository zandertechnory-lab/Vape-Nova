/**
 * Script to add CBDfx products to the database
 * Run with: node scripts/add-cbdfx-products.js
 */

const mongoose = require("mongoose");

// MongoDB connection string - update this with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/vapenova";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    images: [String],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

// Helper function to create slug
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

const products = [
    {
        name: "CBDfx 2500 CBD Disposable",
        description: "Premium CBDfx 2500 puff CBD disposable vape. Available in multiple delicious flavors including Mango Ice, Blue Raspberry, and Cool Mint. Each device contains 1500mg CBD with no nicotine for a smooth, relaxing experience.",
        price: 19.99,
        category: "Vapes",
        subcategory: "CBD Vapes",
        stock: 50,
        featured: true,
        images: ["/images/products/cbdfx-2500-cbd.png"]
    },
    {
        name: "CBDfx 2500 CBD + THC Disposable",
        description: "CBDfx 2500 puff disposable vape with a powerful blend of CBD and THC. Features 1500mg CBD and 10mg THC per device. Available in Purple Punch and Maui Wowie flavors for an enhanced experience.",
        price: 17.99,
        category: "Vapes",
        subcategory: "CBD Vapes",
        stock: 45,
        featured: true,
        images: ["/images/products/cbdfx-2500-cbd-thc.png"]
    },
    {
        name: "CBDFX CBD 500mg Disposable",
        description: "Compact and convenient CBDfx 500mg CBD disposable vape. Perfect for on-the-go use with a sleek white design. Contains 500mg of premium CBD with no nicotine, delivering smooth and consistent vapor.",
        price: 9.99,
        category: "Vapes",
        subcategory: "CBD Vapes",
        stock: 75,
        featured: false,
        images: ["/images/products/cbdfx-500mg.png"]
    }
];

async function addProducts() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("✓ Connected to MongoDB\n");

        console.log("Adding CBDfx products...\n");

        for (const productData of products) {
            const slug = slugify(productData.name);

            // Check if product already exists
            const existingProduct = await Product.findOne({ slug });
            if (existingProduct) {
                console.log(`⚠️  Product already exists: ${productData.name}`);
                continue;
            }

            // Create product
            const product = new Product({
                ...productData,
                slug
            });

            await product.save();
            console.log(`✅ Added: ${productData.name}`);
            console.log(`   Price: $${productData.price}`);
            console.log(`   Category: ${productData.category} > ${productData.subcategory}`);
            console.log(`   Stock: ${productData.stock}\n`);
        }

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("✓ Finished adding products!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("\nYou can now view these products:");
        console.log("1. In the shop at http://localhost:3000/shop");
        console.log("2. In the admin panel at http://localhost:3000/admin/products");

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("\n❌ Error:", error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
}

addProducts();
