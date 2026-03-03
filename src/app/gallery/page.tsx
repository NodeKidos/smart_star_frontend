'use client';

import React, { useState, useEffect } from 'react';
import { fetchGallery, GalleryItem } from '@/lib/api';
import { ImageIcon, Calendar, Tag } from 'lucide-react';
import styles from './Gallery.module.css';

export default function GalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        async function load() {
            const data = await fetchGallery();
            setItems(data);
            setLoading(false);
        }
        load();
    }, []);

    const categories = ['All', ...new Set(items.map(i => i.category))];
    const filteredItems = filter === 'All' ? items : items.filter(i => i.category === filter);

    return (
        <div className={styles.galleryPage}>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1>Life at Smart Star</h1>
                    <p>Capturing moments of growth, celebration, and achievement</p>
                </div>
            </section>

            <section className={styles.content}>
                <div className={styles.container}>
                    {/* Filters */}
                    <div className={styles.filters}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.filterBtn} ${filter === cat ? styles.activeFilter : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className={styles.loader}>Exploring our archives...</div>
                    ) : (
                        <div className={styles.grid}>
                            {filteredItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={styles.card}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className={styles.imageArea}>
                                        <img src={item.imageUrl} alt={item.title} loading="lazy" />
                                        <div className={styles.overlay}>
                                            <div className={styles.overlayContent}>
                                                <Tag size={16} />
                                                <span>{item.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.info}>
                                        <h3>{item.title}</h3>
                                        <div className={styles.meta}>
                                            <Calendar size={14} />
                                            <span>{new Date(item.createdAt).getFullYear()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredItems.length === 0 && (
                        <div className={styles.empty}>
                            <ImageIcon size={48} />
                            <p>Our gallery is currently being curated. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
