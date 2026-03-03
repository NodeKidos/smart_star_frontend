'use client';

import React, { useState, useEffect } from 'react';
import { ImageIcon, Plus, Trash2, Filter, Edit2, X } from 'lucide-react';
import { fetchGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem, GalleryItem } from '@/lib/api';
import AdminLayout from '@/components/AdminLayout';
import styles from './page.module.css';

export default function AdminGalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('Campus');

    useEffect(() => {
        loadGallery();
    }, []);

    const loadGallery = async () => {
        const data = await fetchGallery();
        setItems(data);
        setLoading(false);
    };

    const resetForm = () => {
        setTitle('');
        setImageUrl('');
        setCategory('Campus');
        setIsAdding(false);
        setEditingId(null);
    };

    const startEditing = (item: GalleryItem) => {
        setEditingId(item.id);
        setTitle(item.title);
        setImageUrl(item.imageUrl);
        setCategory(item.category);
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateGalleryItem(editingId, { title, imageUrl, category });
            } else {
                await createGalleryItem({ title, imageUrl, category });
            }
            resetForm();
            loadGallery();
        } catch (err) {
            alert('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this image from gallery?')) {
            await deleteGalleryItem(id);
            loadGallery();
        }
    };

    if (loading) return <AdminLayout><div>Loading gallery...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className={styles.iconCircle}>
                            <ImageIcon size={24} />
                        </div>
                        <div>
                            <h1>Gallery Management</h1>
                            <p>Manage images displayed in the public gallery</p>
                        </div>
                    </div>
                    <button
                        className={styles.addBtn}
                        onClick={() => {
                            if (isAdding) resetForm();
                            else setIsAdding(true);
                        }}
                    >
                        {isAdding ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Image</>}
                    </button>
                </div>

                {isAdding && (
                    <div className={styles.addForm}>
                        <h2>{editingId ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h2>
                        <form onSubmit={handleSubmit} className={styles.formGrid}>
                            <div className={styles.inputGroup}>
                                <label>Image Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Graduation 2024"
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Image URL</label>
                                <input
                                    type="url"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="Campus">Campus</option>
                                    <option value="Events">Events</option>
                                    <option value="Students">Students</option>
                                    <option value="Awards">Awards</option>
                                </select>
                            </div>
                            <button type="submit" className={styles.submitBtn}>
                                {editingId ? 'Save Changes' : 'Upload to Gallery'}
                            </button>
                        </form>
                    </div>
                )}

                <div className={styles.galleryGrid}>
                    {items.length === 0 ? (
                        <div className={styles.empty}>No images in gallery yet.</div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className={styles.itemCard}>
                                <div className={styles.imgWrapper}>
                                    <img src={item.imageUrl} alt={item.title} />
                                    <div className={styles.categoryBadge}>{item.category}</div>
                                </div>
                                <div className={styles.cardFooter}>
                                    <div className={styles.itemInfo}>
                                        <h3>{item.title}</h3>
                                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className={styles.cardActions}>
                                        <button
                                            onClick={() => startEditing(item)}
                                            className={`${styles.actionBtn} ${styles.editBtn}`}
                                            title="Edit Item"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                            title="Delete Item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
