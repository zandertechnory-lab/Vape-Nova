import type { Metadata } from "next";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductDetails from "@/components/product-details";
import Breadcrumb from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vapenovashop.com";

export async function generateStaticParams() {
  await connectDB();
  const products = await Product.find({}).select("slug").lean();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  await connectDB();
  const product = await Product.findOne({ slug: params.slug }).lean();

  if (!product) {
    return { title: "Product Not Found" };
  }

  const title = `${product.name} — Buy Online`;
  const description = `Buy the ${product.name} at VapeNova. ${product.description.slice(0, 120)}. From $${product.price}. Free shipping on orders over $50.`;
  const image = product.images?.[0] || "/images/hero/vaping-lifestyle.png";

  return {
    title,
    description,
    keywords: [product.name, product.category, product.subcategory, ...product.tags, "buy online", "VapeNova"],
    alternates: { canonical: `/shop/${params.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/shop/${params.slug}`,
      type: "website",
      images: [{ url: image, width: 800, height: 800, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
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

  const relatedProducts = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  })
    .limit(4)
    .lean();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images?.[0] ? `${SITE_URL}${product.images[0]}` : `${SITE_URL}/images/hero/vaping-lifestyle.png`,
    sku: product._id.toString(),
    brand: {
      "@type": "Brand",
      name: "VapeNova",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/shop/${product.slug}`,
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "VapeNova",
      },
    },
    ...(product.rating > 0 && product.numReviews > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating.toFixed(1),
            reviewCount: product.numReviews,
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
  };

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: product.category, href: `/shop?category=${product.category}` },
    { name: product.name, href: `/shop/${product.slug}` },
  ];

  const serialized = JSON.parse(JSON.stringify(product));
  const serializedRelated = JSON.parse(JSON.stringify(relatedProducts));

  return (
    <div className="min-h-screen">
      <JsonLd data={productSchema} />
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <Breadcrumb items={breadcrumbs} />
        <ProductDetails product={serialized} relatedProducts={serializedRelated} />
      </div>
      <Footer />
    </div>
  );
}
