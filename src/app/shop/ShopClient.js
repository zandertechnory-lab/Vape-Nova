"use client";

import { useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './page.module.css';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import ShopControls from '@/components/ShopControls';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductSkeleton from '@/components/ProductSkeleton';
import VideoBackground from '@/components/VideoBackground';
import { useProducts } from '@/context/ProductContext';
import { E_LIQUID_BRANDS } from '@/constants/eLiquidBrands';

export default function ShopClient({ initialProducts = [], categories }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { products: contextProducts, isLoading: productsLoading } = useProducts();

    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [viewMode, setViewMode] = useState('grid');

    const products = useMemo(() => {
        if (contextProducts && contextProducts.length > 0) {
            return contextProducts;
        }
        return initialProducts;
    }, [contextProducts, initialProducts]);

    const activeCategory = searchParams.get('category') || 'all';
    const activeBrand = searchParams.get('brand') || 'all';

    const handleCategoryChange = (catId) => {
        if (catId === activeCategory) return;
        const params = new URLSearchParams(searchParams.toString());
        if (catId === 'all') {
            params.delete('category');
            params.delete('brand');
        } else {
            params.set('category', catId);
            if (catId !== 'e-liquids') {
                params.delete('brand');
            }
        }
        const query = params.toString();
        router.push(query ? `/shop?${query}` : '/shop');
    };

    const handleBrandChange = (brandId) => {
        const params = new URLSearchParams(searchParams.toString());
        if (brandId === 'all') {
            params.delete('brand');
        } else {
            params.set('brand', brandId);
        }
        const query = params.toString();
        router.push(query ? `/shop?${query}` : '/shop');
    };

    const normalizedProducts = Array.isArray(products) ? products : [];

    const filteredProducts = useMemo(() => {
        let filtered = normalizedProducts.filter(p => {
            const pCat = p.category?.slug || p.categoryId;
            const matchesCategory = activeCategory === 'all' ? true : pCat === activeCategory;
            const matchesBrand = activeBrand === 'all'
                ? true
                : (p.brand ? p.brand.toLowerCase() === activeBrand.toLowerCase() : false);
            const price = typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0;
            const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
            const matchesStock = inStockOnly ? (p.stock && p.stock > 0) : true;
            return matchesCategory && matchesBrand && matchesPrice && matchesStock;
        });

        // Apply sorting
        return filtered.sort((a, b) => {
            const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price) || 0;
            const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price) || 0;

            switch (sortBy) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'name-asc':
                    return (a.name || '').localeCompare(b.name || '');
                case 'name-desc':
                    return (b.name || '').localeCompare(a.name || '');
                case 'newest':
                    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
                default:
                    return 0;
            }
        });
    }, [normalizedProducts, activeCategory, activeBrand, priceRange, inStockOnly, sortBy]);

    const isDataLoading = productsLoading && normalizedProducts.length === 0;

    const breadcrumbs = [
        { label: 'Shop', href: '/shop' },
        ...(activeCategory !== 'all' ? [{ label: categories.find(c => c.slug === activeCategory)?.name || activeCategory, href: `/shop?category=${activeCategory}` }] : [])
    ];

    return (
        <div className={`container ${styles.page}`}>
            <Breadcrumbs items={breadcrumbs} />

            <aside className={styles.sidebar}>
                <ProductFilters
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                    categories={categories}
                    brandOptions={activeCategory === 'e-liquids' ? E_LIQUID_BRANDS : []}
                    activeBrand={activeBrand}
                    onBrandChange={activeCategory === 'e-liquids' ? handleBrandChange : undefined}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    inStockOnly={inStockOnly}
                    onStockChange={setInStockOnly}
                />
            </aside>

            <main className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Shop</h1>
                </div>

                <ShopControls
                    viewMode={viewMode}
                    onViewChange={setViewMode}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    resultsCount={filteredProducts.length}
                />

                <div className={`${styles.grid} ${viewMode === 'list' ? styles.listView : ''}`}>
                    {isDataLoading ? (
                        Array(6).fill(0).map((_, i) => <ProductSkeleton key={i} />)
                    ) : (
                        filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} viewMode={viewMode} />
                        ))
                    )}
                </div>

                {!isDataLoading && filteredProducts.length === 0 && (
                    <div className={styles.empty}>
                        <p>No products match your filters. Try adjusting them.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
