'use client';

import React, { useState, useEffect } from 'react';
import { fetchGallery, GalleryItem, API_BASE_URL } from '@/lib/api';
import { ImageIcon, Calendar, Tag, Video, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import styles from './Gallery.module.css';

const isVideoUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    const cleanUrl = url.split('?')[0].split('#')[0].toLowerCase();
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.qt'];
    return videoExtensions.some(ext => cleanUrl.endsWith(ext));
};

export default function GalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    
    // Lightbox scoped to active album/batch
    const [activeAlbum, setActiveAlbum] = useState<GalleryItem | null>(null);
    const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);

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

    const getItemImages = (item: GalleryItem): string[] => {
        if (item.imageUrls && Array.isArray(item.imageUrls) && item.imageUrls.length > 0) {
            return item.imageUrls.filter(u => u && u.trim() !== '');
        }
        if ('imageUrl' in item && (item as GalleryItem & { imageUrl?: string }).imageUrl) {
            return [(item as GalleryItem & { imageUrl?: string }).imageUrl as string];
        }
        return [];
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

    // Group filtered items by category
    const groupedItems: { [category: string]: GalleryItem[] } = {};
    filteredItems.forEach(item => {
        const displayCategory = item.category === 'Exams' && item.examCenter 
            ? `Exams - ${item.examCenter}` 
            : item.category;

        if (!groupedItems[displayCategory]) {
            groupedItems[displayCategory] = [];
        }
        groupedItems[displayCategory].push(item);
    });

    const openLightbox = (album: GalleryItem, index: number) => {
        setActiveAlbum(album);
        setActiveMediaIndex(index);
    };

    const closeLightbox = () => {
        setActiveAlbum(null);
        setActiveMediaIndex(0);
    };

    const nextMedia = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }
        if (activeAlbum) {
            const images = getItemImages(activeAlbum);
            if (images.length > 0) {
                setActiveMediaIndex((activeMediaIndex + 1) % images.length);
            }
        }
    };

    const prevMedia = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }
        if (activeAlbum) {
            const images = getItemImages(activeAlbum);
            if (images.length > 0) {
                setActiveMediaIndex((activeMediaIndex - 1 + images.length) % images.length);
            }
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!activeAlbum) return;
            if (e.key === 'ArrowRight') nextMedia();
            if (e.key === 'ArrowLeft') prevMedia();
            if (e.key === 'Escape') closeLightbox();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeAlbum, activeMediaIndex]);

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
                    ) : Object.keys(groupedItems).length > 0 ? (
                        Object.entries(groupedItems).map(([catName, catItems]) => (
                            <div key={catName} className={styles.categorySection}>
                                <div className={styles.categoryHeaderWrapper}>
                                    <h2 className={styles.categoryHeader}>{catName}</h2>
                                    <div className={styles.categoryLine}></div>
                                </div>
                                
                                <div
                                    className={`${styles.grid} ${gridVisible ? styles.gridVisible : ''}`}
                                    ref={gridRef}
                                >
                                    {catItems.map((item, index) => {
                                        const images = getItemImages(item);
                                        const coverUrl = images.length > 0 ? images[0] : '';
                                        const containsVideo = images.some(url => isVideoUrl(url));
                                        return (
                                            <div
                                                key={item.id}
                                                className={styles.card}
                                                style={{ animationDelay: `${index * 60}ms` }}
                                                onClick={() => openLightbox(item, 0)}
                                            >
                                                <div className={styles.imageArea}>
                                                    {coverUrl ? (
                                                        isVideoUrl(coverUrl) ? (
                                                            <div className={styles.videoWrapper}>
                                                                <video
                                                                    src={getImageUrl(coverUrl)}
                                                                    muted
                                                                    loop
                                                                    playsInline
                                                                    autoPlay
                                                                    className={styles.gridVideo}
                                                                />
                                                                <div className={styles.videoBadge}>
                                                                    <Video size={12} />
                                                                    <span>VIDEO</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            /* eslint-disable-next-line @next/next/no-img-element */
                                                            <img src={getImageUrl(coverUrl)} alt={item.title} loading="lazy" />
                                                        )
                                                    ) : (
                                                        <div className={styles.noImagePlaceholder}>
                                                            <ImageIcon size={40} />
                                                            <span>No media</span>
                                                        </div>
                                                    )}
                                                    <div className={styles.overlay}>
                                                        <div className={styles.overlayContent}>
                                                            <Tag size={16} />
                                                            <span>{item.category === 'Exams' && item.examCenter ? `Exams - ${item.examCenter}` : item.category}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.info}>
                                                    <h3>{item.title}</h3>
                                                    <div className={styles.metaWrapper}>
                                                        <div className={styles.meta}>
                                                            <Calendar size={14} />
                                                            <span>{item.eventDate ? new Date(item.eventDate).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className={styles.mediaCountBadge}>
                                                            {images.length} {containsVideo ? (images.length === 1 ? 'Video' : 'Media Items') : (images.length === 1 ? 'Photo' : 'Photos')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.empty}>
                            <ImageIcon size={48} />
                            <p>Our gallery is currently being curated. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            {activeAlbum && (
                (() => {
                    const albumImages = getItemImages(activeAlbum);
                    const activeUrl = albumImages[activeMediaIndex];
                    return (
                        <div className={styles.lightbox} onClick={closeLightbox}>
                            <button className={styles.closeBtn} onClick={closeLightbox} aria-label="Close lightbox">
                                <X size={28} />
                            </button>
                            
                            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                                <div className={styles.mediaContainer}>
                                    {albumImages.length > 1 && (
                                        <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevMedia} aria-label="Previous media">
                                            <ChevronLeft size={36} />
                                        </button>
                                    )}

                                    {isVideoUrl(activeUrl) ? (
                                        <video
                                            src={getImageUrl(activeUrl)}
                                            controls
                                            autoPlay
                                            className={styles.lightboxVideo}
                                        />
                                    ) : (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={getImageUrl(activeUrl)}
                                            alt={activeAlbum.title}
                                            className={styles.lightboxImg}
                                        />
                                    )}

                                    {albumImages.length > 1 && (
                                        <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextMedia} aria-label="Next media">
                                            <ChevronRight size={36} />
                                        </button>
                                    )}
                                </div>
                                
                                <div className={styles.lightboxMeta}>
                                    <div className={styles.lightboxText}>
                                        <h2>{activeAlbum.title}</h2>
                                        <div className={styles.lightboxInfo}>
                                            <span className={styles.lightboxCategory}>
                                                <Tag size={14} /> {activeAlbum.category === 'Exams' && activeAlbum.examCenter ? `Exams - ${activeAlbum.examCenter}` : activeAlbum.category}
                                            </span>
                                            <span className={styles.lightboxDate}>
                                                <Calendar size={14} /> {activeAlbum.eventDate ? new Date(activeAlbum.eventDate).toLocaleDateString() : new Date(activeAlbum.createdAt).toLocaleDateString()}
                                            </span>
                                            {albumImages.length > 1 && (
                                                <span className={styles.lightboxCount}>
                                                    {activeMediaIndex + 1} / {albumImages.length}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()
            )}
        </div>
    );
}
