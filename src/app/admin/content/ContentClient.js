"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../dashboard/page.module.css'; // Reuse dashboard styles
import Button from '@/components/Button';
import Input from '@/components/Input';
import { updateContent } from '@/app/actions/content';

export default function ContentClient({ initialContent }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        hero_title: initialContent.hero_title || '',
        hero_subtitle: initialContent.hero_subtitle || '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await updateContent('hero', formData);
        setLoading(false);

        if (result.success) {
            alert('Content updated successfully!');
            router.refresh();
        } else {
            alert('Failed to update content');
        }
    };

    return (
        <div className={`container ${styles.page}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>Site <span className="text-primary">Content</span></h1>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Hero Section</h2>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                        <Input
                            label="Hero Title"
                            value={formData.hero_title}
                            onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                            placeholder="Elevate Your Experience"
                        />
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Hero Subtitle</label>
                            <textarea
                                className={styles.select} // Reusing select style for textarea
                                style={{ height: '100px', resize: 'vertical' }}
                                value={formData.hero_subtitle}
                                onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
                                placeholder="Premium vaporizers and accessories..."
                            />
                        </div>
                    </div>
                    <div className={styles.formActions}>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
