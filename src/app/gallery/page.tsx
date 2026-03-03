'use client';

import React, { useState, useEffect } from 'react';
import { fetchGallery, GalleryItem, API_BASE_URL } from '@/lib/api';
import { ImageIcon, Calendar, Tag } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import styles from './Gallery.module.css';

export default function GalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    const [heroRef, heroVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2 });
    const [filtersRef, filtersVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
    const [gridRef, gridVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });

    const getImageUrl = (url: string | undefined) => {
        if (!url) return '';
        if (url.startsWith('/uploads')) {
            return `${API_BASE_URL}${url}`;
        }
        return url;
    };

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

    // Flatten images so each one appears in the grid, safely handling legacy data
    const displayItems = filteredItems.flatMap(item => {
        const urls = (item.imageUrls && Array.isArray(item.imageUrls))
            ? item.imageUrls.filter(u => u && u.trim() !== '')
            : ((item as any).imageUrl ? [(item as any).imageUrl] : []);

        if (urls.length === 0) return [];

        return urls.map((url: string, idx: number) => ({
            ...item,
            id: `${item.id}-${idx}`,
            displayUrl: url
        }));
    });

    return (
        <div className={styles.galleryPage}>
            <section
                className={`${styles.hero} ${heroVisible ? styles.heroVisible : ''}`}
                ref={heroRef}
            >
                <div className={styles.container}>
                    <h1>Life at Smart Star</h1>
                    <p>Capturing moments of growth, celebration, and achievement</p>
                </div>
            </section>

            <section className={styles.content}>
                <div className={styles.container}>
                    {/* Filters */}
                    <div
                        className={`${styles.filters} ${filtersVisible ? styles.filtersVisible : ''}`}
                        ref={filtersRef}
                    >
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
                    ) : displayItems.length > 0 ? (
                        <div
                            className={`${styles.grid} ${gridVisible ? styles.gridVisible : ''}`}
                            ref={gridRef}
                        >
                            {displayItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={styles.card}
                                    style={{ animationDelay: `${index * 60}ms` }}
                                >
                                    <div className={styles.imageArea}>
                                        <img src={getImageUrl(item.displayUrl)} alt={item.title} loading="lazy" />
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
                                            <span>{item.eventDate ? new Date(item.eventDate).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
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
