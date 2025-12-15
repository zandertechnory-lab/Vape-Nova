import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductDetails from "@/components/product-details";

export async function generateStaticParams() {
  await connectDB();
  const products = await Product.find({}).select("slug").lean();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  await connectDB();
  const product = await Product.findOne({ slug: params.slug }).lean();

  if (!product) {
    notFound();
  }

  // Get related products
  const relatedProducts = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  })
    .limit(4)
    .lean();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <ProductDetails product={JSON.parse(JSON.stringify(product))} relatedProducts={JSON.parse(JSON.stringify(relatedProducts))} />
      </div>
      <Footer />
    </div>
  );
}

