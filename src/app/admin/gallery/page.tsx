'use client';

import React, { useState, useEffect } from 'react';
import { ImageIcon, Plus, Trash2, Edit2, X, Upload } from 'lucide-react';
import { fetchGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem, GalleryItem, API_BASE_URL } from '@/lib/api';
import AdminLayout from '@/components/AdminLayout';
import styles from './page.module.css';

export default function AdminGalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Campus');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
    const [dragActive, setDragActive] = useState(false);

    // For editing: track which images to keep/remove
    const [editingImages, setEditingImages] = useState<string[]>([]);

    const getImageUrl = (url: string | undefined) => {
        if (!url) return '';
        if (url.startsWith('/uploads')) {
            return `${API_BASE_URL}${url}`;
        }
        return url;
    };

    // Helper to safely get imageUrls from an item (handles legacy data)
    const getItemImages = (item: GalleryItem): string[] => {
        if (item.imageUrls && Array.isArray(item.imageUrls) && item.imageUrls.length > 0) {
            // Filter out empty strings from simple-array default
            return item.imageUrls.filter(u => u && u.trim() !== '');
        }
        // Fallback for legacy items with single imageUrl
        if ('imageUrl' in item && (item as GalleryItem & { imageUrl?: string }).imageUrl) {
            return [(item as GalleryItem & { imageUrl?: string }).imageUrl as string];
        }
        return [];
    };

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
        setCategory('Campus');
        setEventDate(new Date().toISOString().split('T')[0]);
        setSelectedFiles([]);
        setIsAdding(false);
        setEditingId(null);
        setEditingImages([]);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleRemoveEditImage = (urlToRemove: string) => {
        setEditingImages(prev => prev.filter(u => u !== urlToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        try {
            if (editingId) {
                // Update meta + images + optional new files
                const formData = new FormData();
                formData.append('title', title);
                formData.append('category', category);
                formData.append('eventDate', eventDate);
                formData.append('imageUrls', JSON.stringify(editingImages));
                selectedFiles.forEach(file => {
                    formData.append('files', file);
                });
                await updateGalleryItem(editingId, formData);
            } else {
                // Upload new images
                const formData = new FormData();
                formData.append('title', title);
                formData.append('category', category);
                formData.append('date', eventDate);
                selectedFiles.forEach(file => {
                    formData.append('files', file);
                });

                await createGalleryItem(formData);
            }
            resetForm();
            loadGallery();
        } catch {
            alert('Operation failed');
        } finally {
            setUploading(false);
        }
    };

    const startEditing = (item: GalleryItem) => {
        setEditingId(item.id);
        setTitle(item.title);
        setCategory(item.category);
        setEditingImages(getItemImages(item));
        if (item.eventDate) {
            setEventDate(item.eventDate.split('T')[0]);
        }
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (confirm('Delete this album? This will also remove all files from the server.')) {
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
                            <p>Upload and manage images stored on the server</p>
                        </div>
                    </div>
                    <button
                        className={styles.addBtn}
                        onClick={() => {
                            if (isAdding) resetForm();
                            else setIsAdding(true);
                        }}
                    >
                        {isAdding ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Images</>}
                    </button>
                </div>

                {isAdding && (
                    <div className={styles.addForm}>
                        <h2>{editingId ? 'Edit Album' : 'Upload New Images'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGrid}>
                                <div className={styles.inputGroup}>
                                    <label>Album Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g. Science Lab"
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Photo Date</label>
                                    <input
                                        type="date"
                                        value={eventDate}
                                        onChange={(e) => setEventDate(e.target.value)}
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
                                <button type="submit" className={styles.submitBtn} disabled={uploading}>
                                    {uploading ? 'Processing...' : (editingId ? 'Save Changes' : 'Upload Batch')}
                                </button>
                            </div>

                            {/* Show current images when editing - allow removal */}
                            {editingId && editingImages.length > 0 && (
                                <div className={styles.editImagesSection}>
                                    <label className={styles.fieldLabel}>Current Images (click × to remove)</label>
                                    <div className={styles.editImageGrid}>
                                        {editingImages.map((url, i) => (
                                            <div key={i} className={styles.editImageThumb}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={getImageUrl(url)} alt={`Image ${i + 1}`} />
                                                <button
                                                    type="button"
                                                    className={styles.removeImageBtn}
                                                    onClick={() => handleRemoveEditImage(url)}
                                                    title="Remove this image"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(
                                <div className={styles.uploadSection}>
                                    <label className={styles.fieldLabel}>{editingId ? 'Add More Images' : 'Select or Drag Images'}</label>
                                    <div
                                        className={`${styles.dragDropZone} ${dragActive ? styles.dragActive : ''}`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        onClick={() => document.getElementById('file-upload')?.click()}
                                    >
                                        <Upload className={styles.dropIcon} size={40} />
                                        <p>Drag & drop images here or <strong>browse computer</strong></p>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />

                                        {selectedFiles.length > 0 && (
                                            <div className={styles.fileList}>
                                                {selectedFiles.map((f, i) => (
                                                    <span key={i} className={styles.fileBadge}>
                                                        <ImageIcon size={12} /> {f.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                )}

                <div className={styles.galleryGrid}>
                    {items.length === 0 ? (
                        <div className={styles.empty}>
                            <ImageIcon size={48} />
                            <p>No images in gallery yet. Click &quot;Add Images&quot; to upload your first album.</p>
                        </div>
                    ) : (
                        items.map((item) => {
                            const images = getItemImages(item);
                            const coverUrl = images.length > 0 ? images[0] : '';
                            return (
                                <div key={item.id} className={styles.itemCard}>
                                    <div className={styles.imgWrapper}>
                                        {coverUrl ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={getImageUrl(coverUrl)} alt={item.title} />
                                        ) : (
                                            <div className={styles.noImagePlaceholder}>
                                                <ImageIcon size={40} />
                                                <span>No images</span>
                                            </div>
                                        )}
                                        <div className={styles.categoryBadge}>{item.category}</div>
                                        <div className={styles.countBadge}>{images.length} {images.length === 1 ? 'Photo' : 'Photos'}</div>
                                    </div>
                                    <div className={styles.cardFooter}>
                                        <div className={styles.itemInfo}>
                                            <h3>{item.title}</h3>
                                            <span>{item.eventDate ? new Date(item.eventDate).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString()}</span>
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
                            );
                        })
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
