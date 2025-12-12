"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, List, Package, ShoppingCart, FileText, Settings } from 'lucide-react';
import styles from './AdminNav.module.css';

export default function AdminNav() {
    const pathname = usePathname();

    const links = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/categories', label: 'Categories', icon: List },
        // { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
        { href: '/admin/content', label: 'Content', icon: FileText },
    ];

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                VapeFlow <span className={styles.adminBadge}>Admin</span>
            </div>
            <ul className={styles.links}>
                {links.map(link => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <li key={link.href}>
                            <Link href={link.href} className={`${styles.link} ${isActive ? styles.active : ''}`}>
                                <Icon size={20} />
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
