'use client';

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Trash2,
    ToggleLeft,
    ToggleRight,
    Megaphone,
    AlertCircle,
    CheckCircle2,
    Send
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import {
    fetchAllAnnouncements,
    createAnnouncement,
    toggleAnnouncement,
    deleteAnnouncement,
    Announcement
} from '@/lib/api';
import styles from './page.module.css';

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadAnnouncements();
    }, []);

    const loadAnnouncements = async () => {
        setLoading(true);
        try {
            const data = await fetchAllAnnouncements();
            setAnnouncements(data);
        } catch (error) {
            console.error('Failed to load announcements:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setIsSubmitting(true);
        try {
            const created = await createAnnouncement(newMessage);
            setAnnouncements([created, ...announcements]);
            setNewMessage('');
        } catch (error) {
            alert('Failed to create announcement');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggle = async (id: string) => {
        try {
            await toggleAnnouncement(id);
            setAnnouncements(announcements.map(ann =>
                ann.id === id ? { ...ann, isActive: !ann.isActive } : ann
            ));
        } catch (error) {
            alert('Failed to toggle announcement');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this announcement?')) return;

        try {
            await deleteAnnouncement(id);
            setAnnouncements(announcements.filter(ann => ann.id !== id));
        } catch (error) {
            alert('Failed to delete announcement');
        }
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Manage Announcements</h1>
                </div>

                {/* Create Form */}
                <div className={styles.formCard}>
                    <form onSubmit={handleCreate} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <Megaphone size={20} className={styles.inputIcon} />
                            <input
                                type="text"
                                placeholder="Enter a new announcement message (e.g. 'Registration ends Friday!')"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className={styles.input}
                                disabled={isSubmitting}
                            />
                        </div>
                        <button
                            type="submit"
                            className={styles.addBtn}
                            disabled={isSubmitting || !newMessage.trim()}
                        >
                            {isSubmitting ? 'Adding...' : (
                                <>
                                    <Plus size={20} />
                                    <span>Add Announcement</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className={styles.list}>
                    {loading ? (
                        <div className={styles.loader}>Loading announcements...</div>
                    ) : announcements.length === 0 ? (
                        <div className={styles.empty}>
                            <AlertCircle size={40} />
                            <p>No announcements yet.</p>
                        </div>
                    ) : (
                        announcements.map((ann) => (
                            <div key={ann.id} className={`${styles.annCard} ${!ann.isActive ? styles.inactive : ''}`}>
                                <div className={styles.annContent}>
                                    <div className={styles.annIcon}>
                                        <Megaphone size={20} />
                                    </div>
                                    <div className={styles.annInfo}>
                                        <p className={styles.annMessage}>{ann.message}</p>
                                        <span className={styles.annDate}>
                                            Created on {new Date(ann.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.annActions}>
                                    <button
                                        className={`${styles.toggleBtn} ${ann.isActive ? styles.active : ''}`}
                                        onClick={() => handleToggle(ann.id)}
                                        title={ann.isActive ? "Deactivate" : "Activate"}
                                    >
                                        {ann.isActive ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                                        <span>{ann.isActive ? 'Active' : 'Inactive'}</span>
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(ann.id)}
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
