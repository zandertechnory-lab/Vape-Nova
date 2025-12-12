"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../dashboard/page.module.css'; // Reuse dashboard styles
import Button from '@/components/Button';
import Input from '@/components/Input';
import { Trash2, Plus } from 'lucide-react';
import { createCategory, deleteCategory } from '@/app/actions/categories';

export default function CategoriesClient({ initialCategories }) {
    const router = useRouter();
    const [categories, setCategories] = useState(initialCategories);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', slug: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await createCategory(formData);

        if (result.success) {
            setCategories(prev => [...prev, result.category]);
            setFormData({ name: '', slug: '' });
            setShowForm(false);
        } else {
            alert('Failed to create category');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this category?')) {
            const result = await deleteCategory(id);
            if (result.success) {
                setCategories(prev => prev.filter(c => c.id !== id));
            } else {
                alert('Failed to delete category');
            }
        }
    };

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Category <span className="text-primary">Management</span></h1>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>All Categories</h2>
                    <Button
                        variant="primary"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <Plus size={20} /> Add Category
                    </Button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGrid}>
                            <Input
                                label="Category Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Portable Vaporizers"
                                required
                            />
                            <Input
                                label="Slug (Optional)"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="e.g. portable-vaporizers"
                            />
                        </div>
                        <div className={styles.formActions}>
                            <Button variant="primary" type="submit">Save Category</Button>
                            <Button variant="outline" type="button" onClick={() => setShowForm(false)}>Cancel</Button>
                        </div>
                    </form>
                )}

                <div className={styles.productList}>
                    {categories.map(category => (
                        <div key={category.id} className={styles.productCard}>
                            <div className={styles.productInfo}>
                                <h3>{category.name}</h3>
                                <p className={styles.productCategory}>/{category.slug}</p>
                            </div>
                            <div className={styles.productActions}>
                                <button
                                    className={`${styles.iconBtn} ${styles.deleteBtn}`}
                                    onClick={() => handleDelete(category.id)}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
