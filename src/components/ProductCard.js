'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './ProductCard.module.css';
import Button from './Button';

export default function ProductCard({ product }) {
    const router = useRouter();
    const stock = product.stock || 0;
    const isOutOfStock = stock === 0;

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                {product.image ? (
                    <img src={product.image} alt={product.name} className={styles.productImage} />
                ) : (
                    <div className={styles.placeholder}>
                        <span>{product.name}</span>
                    </div>
                )}
                {isOutOfStock && (
                    <div className={styles.outOfStockBadge}>Out of Stock</div>
                )}
                <div className={styles.overlay}>
                    <Button
                        variant="primary"
                        size="sm"
                        disabled={isOutOfStock}
                        onClick={(e) => {
                            e.preventDefault();
                            if (!isOutOfStock) {
                                router.push(`/product/${product.id}`);
                            }
                        }}
                    >
                        {isOutOfStock ? 'Out of Stock' : 'View Details'}
                    </Button>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.name}>
                        <Link href={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <span className={styles.price}>${product.price}</span>
                </div>
                <p className={styles.category}>{product.category?.name || product.category}</p>
            </div>
        </div>
    );
}
