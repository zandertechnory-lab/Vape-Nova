"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import styles from './Breadcrumbs.module.css';

export default function Breadcrumbs({ items = [] }) {
    if (items.length === 0) return null;

    return (
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <ol className={styles.list}>
                <li className={styles.item}>
                    <Link href="/" className={styles.link}>
                        <Home size={16} />
                        <span>Home</span>
                    </Link>
                    <ChevronRight size={16} className={styles.separator} />
                </li>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className={styles.item}>
                            {isLast ? (
                                <span className={styles.current}>{item.label}</span>
                            ) : (
                                <>
                                    <Link href={item.href} className={styles.link}>
                                        {item.label}
                                    </Link>
                                    <ChevronRight size={16} className={styles.separator} />
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
