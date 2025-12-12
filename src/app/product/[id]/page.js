"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './page.module.css';
import Button from '@/components/Button';
import ProductTabs from '@/components/ProductTabs';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';

// Default specs, reviews, and FAQs
const DEFAULT_SPECS = [
    { label: 'Battery Life', value: '90 minutes' },
    { label: 'Heat Time', value: '20 seconds' },
    { label: 'Warranty', value: '2 Years' },
    { label: 'Dimensions', value: '4" x 1.2" x 0.8"' },
];

const DEFAULT_REVIEWS = [
    { user: 'Alex M.', rating: 5, text: 'Best vape I have ever owned. Smooth hits and great battery life.' },
    { user: 'Sarah K.', rating: 4, text: 'Great flavor, but the mouthpiece gets a bit warm.' },
];

const DEFAULT_FAQS = [
    { question: 'Is it compatible with concentrates?', answer: 'Yes, it comes with a concentrate pad insert.' },
    { question: 'How do I clean it?', answer: 'Use isopropyl alcohol and the included brush.' },
];

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const [isZoomed, setIsZoomed] = useState(false);
    const { addToCart } = useCart();
    const { getProductById, isLoading } = useProducts();

    const product = getProductById(params.id);

    if (isLoading && !product) {
        return (
            <div className={`container ${styles.page}`}>
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <h1>Loading product...</h1>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className={`container ${styles.page}`}>
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <h1>Product Not Found</h1>
                    <Button variant="primary" onClick={() => router.push('/shop')}>
                        Back to Shop
                    </Button>
                </div>
            </div>
        );
    }

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPos({ x, y });
    };

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.grid}>
                {/* Image Gallery */}
                <div className={styles.gallery}>
                    <div
                        className={styles.mainImage}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsZoomed(true)}
                        onMouseLeave={() => setIsZoomed(false)}
                        style={{
                            backgroundImage: isZoomed && product.image ? `url("${product.image}")` : 'none',
                            backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                            backgroundSize: '200%'
                        }}
                    >
                        {!isZoomed && (
                            product.image ? (
                                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div className={styles.placeholder}>
                                    Product Image (Hover to Zoom)
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className={styles.info}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.price}>${product.price}</p>
                    <p className={styles.description}>
                        {product.description || `Premium ${product.category} vaporizer. High-quality construction and exceptional performance.`}
                    </p>

                    <div className={styles.actions}>
                        <Button variant="primary" size="lg" onClick={() => addToCart(product)}>
                            Add to Cart
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => {
                                addToCart(product);
                                router.push('/checkout');
                            }}
                        >
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>

            <ProductTabs
                specs={product.specs || DEFAULT_SPECS}
                reviews={product.reviews || DEFAULT_REVIEWS}
                faqs={product.faqs || DEFAULT_FAQS}
            />
        </div>
    );
}
