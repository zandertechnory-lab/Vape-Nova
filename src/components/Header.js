"use client";

import Link from 'next/link';
import { ShoppingCart, Menu, X, Search, User, LogOut } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import Button from './Button';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';
import { useAuth } from '@/context/AuthContext';
import { E_LIQUID_BRANDS } from '@/constants/eLiquidBrands';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showELiquidsDropdown, setShowELiquidsDropdown] = useState(false);
    const { cart } = useCart();
    const { products, isLoading: productsLoading, error: productsError } = useProducts();
    const { user, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.toLowerCase();
        return (products || [])
            .filter(product => {
                const name = product.name?.toLowerCase() || '';
                const categoryName = typeof product.category === 'string'
                    ? product.category.toLowerCase()
                    : product.category?.name?.toLowerCase() || '';

                return name.includes(query) || categoryName.includes(query);
            })
            .slice(0, 5);
    }, [products, searchQuery]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setShowResults(false);
            setSearchQuery('');
        }
    };

    const handleSearchChange = (value) => {
        setSearchQuery(value);
        setShowResults(Boolean(value.trim()));
    };

    const handleProductClick = (productId) => {
        router.push(`/product/${productId}`);
        setShowResults(false);
        setSearchQuery('');
    };

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    VapeNova
                </Link>

                {/* Search Bar */}
                <div className={styles.searchWrapper}>
                    <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                        <Search size={20} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            onFocus={() => searchQuery && setShowResults(true)}
                            onBlur={() => setTimeout(() => setShowResults(false), 200)}
                            className={styles.searchInput}
                        />
                    </form>

                    {showResults && (
                        <div className={styles.searchResults}>
                            {productsLoading && (
                                <div className={styles.searchResultItem}>
                                    <p className={styles.resultName}>Searching products...</p>
                                </div>
                            )}
                            {!productsLoading && productsError && (
                                <div className={styles.searchResultItem}>
                                    <p className={styles.resultName}>Unable to load products.</p>
                                </div>
                            )}
                            {!productsLoading && !productsError && filteredResults.length === 0 && (
                                <div className={styles.searchResultItem}>
                                    <p className={styles.resultName}>No products found.</p>
                                </div>
                            )}
                            {!productsLoading && !productsError && filteredResults.map(product => (
                                <div
                                    key={product.id}
                                    className={styles.searchResultItem}
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    {product.image && (
                                        <img src={product.image} alt={product.name} className={styles.resultImage} />
                                    )}
                                    <div className={styles.resultInfo}>
                                        <p className={styles.resultName}>{product.name}</p>
                                        <p className={styles.resultCategory}>{product.category?.name || product.category}</p>
                                    </div>
                                    <p className={styles.resultPrice}>${product.price}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
                    <Link href="/" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link href="/shop" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>

                    {/* E-Liquids Dropdown */}
                    <div
                        className={styles.dropdownWrapper}
                        onMouseEnter={() => setShowELiquidsDropdown(true)}
                        onMouseLeave={() => setShowELiquidsDropdown(false)}
                    >
                        <Link href="/shop?category=e-liquids" className={styles.link}>E-Liquids</Link>
                        {showELiquidsDropdown && (
                            <div className={styles.dropdown}>
                                <div className={styles.dropdownHeader}>E-Liquids Brands</div>
                                {E_LIQUID_BRANDS.map((brand, index) => (
                                    <Link
                                        key={index}
                                        href={`/shop?category=e-liquids&brand=${encodeURIComponent(brand)}`}
                                        className={styles.dropdownItem}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {brand}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link href="/about" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    <Link href="/faq" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
                    <Link href="/shipping" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>Shipping</Link>
                    <Link href="/contact" className={styles.link} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                </nav>

                <div className={styles.actions}>
                    <ThemeToggle />
                    {user ? (
                        <div className={styles.userMenu}>
                            <button
                                className={styles.userBtn}
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <User size={20} />
                                <span>{user.firstName}</span>
                            </button>
                            {showUserMenu && (
                                <div className={styles.userDropdown}>
                                    <div className={styles.userInfo}>
                                        <p className={styles.userName}>{user.firstName} {user.lastName}</p>
                                        <p className={styles.userEmail}>{user.email}</p>
                                    </div>
                                    <button
                                        className={styles.signOutBtn}
                                        onClick={() => {
                                            signOut();
                                            setShowUserMenu(false);
                                            router.push('/');
                                        }}
                                    >
                                        <LogOut size={18} />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/auth/signin">
                            <Button variant="ghost">
                                <User size={20} />
                                Sign In
                            </Button>
                        </Link>
                    )}
                    <Link href="/checkout">
                        <Button variant="ghost" className={styles.cartBtn}>
                            <ShoppingCart size={24} />
                            {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
                        </Button>
                    </Link>
                    <button className={styles.menuBtn} onClick={toggleMenu}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </header>
    );
}

