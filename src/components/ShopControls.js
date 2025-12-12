"use client";

import { Grid, List, SortAsc } from 'lucide-react';
import styles from './ShopControls.module.css';

export default function ShopControls({
    viewMode = 'grid',
    onViewChange,
    sortBy = 'featured',
    onSortChange,
    resultsCount = 0
}) {
    const sortOptions = [
        { value: 'featured', label: 'Featured' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A-Z' },
        { value: 'name-desc', label: 'Name: Z-A' },
        { value: 'newest', label: 'Newest First' }
    ];

    return (
        <div className={styles.controls}>
            <div className={styles.left}>
                <span className={styles.count}>{resultsCount} Products</span>
            </div>

            <div className={styles.right}>
                {/* Sort Dropdown */}
                <div className={styles.sortContainer}>
                    <SortAsc className={styles.sortIcon} size={18} />
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className={styles.sortSelect}
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* View Toggle */}
                <div className={styles.viewToggle}>
                    <button
                        className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                        onClick={() => onViewChange('grid')}
                        aria-label="Grid view"
                    >
                        <Grid size={20} />
                    </button>
                    <button
                        className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                        onClick={() => onViewChange('list')}
                        aria-label="List view"
                    >
                        <List size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
