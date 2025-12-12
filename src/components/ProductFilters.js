"use client";

import { useState } from 'react';
import styles from './ProductFilters.module.css';

export default function ProductFilters({
    activeCategory,
    onCategoryChange,
    categories = [],
    brandOptions = [],
    activeBrand = 'all',
    onBrandChange,
    priceRange = [0, 1000],
    onPriceChange,
    inStockOnly = false,
    onStockChange
}) {
    const [localPriceRange, setLocalPriceRange] = useState(priceRange);

    const allCategories = [
        { id: 'all', label: 'All Products' },
        ...categories.map(c => ({ id: c.slug, label: c.name }))
    ];

    const handlePriceChange = (index, value) => {
        const newRange = [...localPriceRange];
        newRange[index] = parseInt(value);
        setLocalPriceRange(newRange);
    };

    const applyPriceFilter = () => {
        if (onPriceChange) {
            onPriceChange(localPriceRange);
        }
    };

    return (
        <div className={styles.filters}>
            <h3 className={styles.title}>Filters</h3>

            {/* Categories */}
            <div className={styles.section}>
                <h4 className={styles.subtitle}>Categories</h4>
                <ul className={styles.list}>
                    {allCategories.map((cat) => (
                        <li key={cat.id}>
                            <button
                                className={`${styles.button} ${activeCategory === cat.id ? styles.active : ''}`}
                                onClick={() => onCategoryChange(cat.id)}
                            >
                                {cat.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price Range */}
            {onPriceChange && (
                <div className={styles.section}>
                    <h4 className={styles.subtitle}>Price Range</h4>
                    <div className={styles.priceInputs}>
                        <div className={styles.inputGroup}>
                            <label>Min</label>
                            <input
                                type="number"
                                value={localPriceRange[0]}
                                onChange={(e) => handlePriceChange(0, e.target.value)}
                                className={styles.priceInput}
                                min="0"
                            />
                        </div>
                        <span className={styles.separator}>-</span>
                        <div className={styles.inputGroup}>
                            <label>Max</label>
                            <input
                                type="number"
                                value={localPriceRange[1]}
                                onChange={(e) => handlePriceChange(1, e.target.value)}
                                className={styles.priceInput}
                                min="0"
                            />
                        </div>
                    </div>
                    <div className={styles.priceSlider}>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={localPriceRange[0]}
                            onChange={(e) => handlePriceChange(0, e.target.value)}
                            className={styles.slider}
                        />
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={localPriceRange[1]}
                            onChange={(e) => handlePriceChange(1, e.target.value)}
                            className={styles.slider}
                        />
                    </div>
                    <button onClick={applyPriceFilter} className={styles.applyBtn}>
                        Apply Price Filter
                    </button>
                </div>
            )}

            {/* Stock Filter */}
            {onStockChange && (
                <div className={styles.section}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={inStockOnly}
                            onChange={(e) => onStockChange(e.target.checked)}
                            className={styles.checkbox}
                        />
                        <span>In Stock Only</span>
                    </label>
                </div>
            )}

            {/* Brand Filter */}
            {brandOptions.length > 0 && onBrandChange && (
                <div className={styles.section}>
                    <h4 className={styles.subtitle}>Brands</h4>
                    <ul className={styles.brandList}>
                        <li>
                            <button
                                className={`${styles.button} ${activeBrand === 'all' ? styles.active : ''}`}
                                onClick={() => onBrandChange('all')}
                            >
                                All Brands
                            </button>
                        </li>
                        {brandOptions.map((brand) => (
                            <li key={brand}>
                                <button
                                    className={`${styles.button} ${activeBrand === brand ? styles.active : ''}`}
                                    onClick={() => onBrandChange(brand)}
                                >
                                    {brand}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
