"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import styles from './page.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { Trash2, Edit, Plus, Upload, TrendingUp, Package, DollarSign, AlertCircle } from 'lucide-react';
import { createProduct, updateProduct, deleteProduct } from '@/app/actions/products';
import { E_LIQUID_BRANDS } from '@/constants/eLiquidBrands';

export default function DashboardClient({ initialProducts, categories }) {
    const { isAdmin, logout } = useAdmin();
    const router = useRouter();
    const [products, setProducts] = useState(initialProducts);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: categories.length > 0 ? categories[0].slug : '',
        stock: '',
        image: null,
        description: '',
        brand: ''
    });

    useEffect(() => {
        if (!isAdmin) {
            router.push('/admin/login');
        }
    }, [isAdmin, router]);

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            brand: formData.category === 'e-liquids' ? formData.brand : null,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock) || 0,
        };

        let result;
        if (editingId) {
            result = await updateProduct(editingId, productData);
            if (result.success) {
                setProducts(prev => prev.map(p => p.id === editingId ? result.product : p));
            }
        } else {
            result = await createProduct(productData);
            if (result.success) {
                setProducts(prev => [result.product, ...prev]);
            }
        }

        if (result?.success) {
            setFormData({ name: '', price: '', category: categories.length > 0 ? categories[0].slug : '', stock: '', image: null, description: '', brand: '' });
            setImagePreview(null);
            setShowForm(false);
            setEditingId(null);
        } else {
            alert('Operation failed: ' + (result?.error || 'Unknown error'));
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            price: product.price.toString(),
            category: product.category?.slug || product.categoryId || 'portable',
            stock: product.stock?.toString() || '0',
            image: product.image,
            description: product.description || '',
            brand: product.brand || ''
        });
        setImagePreview(product.image);
        setEditingId(product.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            const result = await deleteProduct(id);
            if (result.success) {
                setProducts(prev => prev.filter(p => p.id !== id));
            } else {
                alert('Failed to delete product');
            }
        }
    };

    if (!isAdmin) {
        return null;
    }

    // Analytics calculations
    const totalProducts = products.length;
    const inStock = products.filter(p => (p.stock || 0) > 0).length;
    const outOfStock = products.filter(p => (p.stock || 0) === 0).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
    const lowStock = products.filter(p => (p.stock || 0) > 0 && (p.stock || 0) < 10);

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Admin <span className="text-primary">Dashboard</span></h1>
                <div className={styles.actions}>
                    <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </div>
            </div>

            {/* Analytics Dashboard */}
            <div className={styles.analytics}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)' }}>
                        <Package size={24} className="text-primary" />
                    </div>
                    <div>
                        <h3>Total Products</h3>
                        <p className={styles.statValue}>{totalProducts}</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <h3>In Stock</h3>
                        <p className={styles.statValue} style={{ color: '#22c55e' }}>{inStock}</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <h3>Out of Stock</h3>
                        <p className={styles.statValue} style={{ color: '#ef4444' }}>{outOfStock}</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                        <DollarSign size={24} className="text-secondary" />
                    </div>
                    <div>
                        <h3>Inventory Value</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-secondary)' }}>${totalValue.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            {/* Low Stock Alert */}
            {lowStock.length > 0 && (
                <div className={styles.alert}>
                    <AlertCircle size={20} />
                    <span><strong>Low Stock Alert:</strong> {lowStock.length} product(s) have less than 10 units in stock</span>
                </div>
            )}

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Product Management</h2>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingId(null);
                            setFormData({ name: '', price: '', category: categories.length > 0 ? categories[0].slug : '', stock: '', image: null, description: '', brand: '' });
                            setImagePreview(null);
                        }}
                    >
                        <Plus size={20} /> Add Product
                    </Button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGrid}>
                            <Input
                                label="Product Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter product name"
                                required
                            />
                            <Input
                                label="Price ($)"
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="0.00"
                                required
                            />
                            <Input
                                label="Stock Quantity"
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                placeholder="0"
                                required
                            />
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Category</label>
                                <select
                                    className={styles.select}
                                    value={formData.category}
                                    onChange={(e) => {
                                        const nextCategory = e.target.value;
                                        setFormData(prev => ({
                                            ...prev,
                                            category: nextCategory,
                                            brand: nextCategory === 'e-liquids' ? prev.brand : ''
                                        }));
                                    }}
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            {formData.category === 'e-liquids' && (
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>E-Liquid Brand</label>
                                    <select
                                        className={styles.select}
                                        value={formData.brand}
                                        required
                                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    >
                                        <option value="">Select a brand</option>
                                        {E_LIQUID_BRANDS.map(brand => (
                                            <option key={brand} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className={styles.imageUpload}>
                            <label className={styles.label}>Product Image</label>
                            <div className={styles.uploadArea}>
                                {imagePreview ? (
                                    <div className={styles.imagePreview}>
                                        <img src={imagePreview} alt="Preview" />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            type="button"
                                            onClick={() => {
                                                setImagePreview(null);
                                                setFormData({ ...formData, image: null });
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <label className={styles.uploadLabel}>
                                        <Upload size={32} />
                                        <span>Click to upload image</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className={styles.formActions}>
                            <Button variant="primary" type="submit">
                                {editingId ? 'Update Product' : 'Add Product'}
                            </Button>
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingId(null);
                                    setFormData({ name: '', price: '', category: categories.length > 0 ? categories[0].slug : '', stock: '', image: null, description: '' });
                                    setImagePreview(null);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                )}

                <div className={styles.productList}>
                    {products.map(product => {
                        const stock = product.stock || 0;
                        const isOutOfStock = stock === 0;
                        const isLowStock = stock > 0 && stock < 10;

                        return (
                            <div key={product.id} className={styles.productCard}>
                                {product.image && (
                                    <div className={styles.productImage}>
                                        <img src={product.image} alt={product.name} />
                                    </div>
                                )}
                                <div className={styles.productInfo}>
                                    <h3>{product.name}</h3>
                                    <p className={styles.productCategory}>{product.category?.name || product.categoryId}</p>
                                    <div className={styles.stockBadge}>
                                        {isOutOfStock ? (
                                            <span className={styles.outOfStock}>Out of Stock</span>
                                        ) : isLowStock ? (
                                            <span className={styles.lowStock}>Low Stock: {stock} units</span>
                                        ) : (
                                            <span className={styles.inStock}>In Stock: {stock} units</span>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.productPrice}>${product.price}</div>
                                <div className={styles.productActions}>
                                    <button
                                        className={styles.iconBtn}
                                        onClick={() => handleEdit(product)}
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        className={`${styles.iconBtn} ${styles.deleteBtn}`}
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
