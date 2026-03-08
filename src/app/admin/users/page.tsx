'use client';

import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, Trash2, Plus } from 'lucide-react';
import { fetchAllUsers, createUser, deleteUser, User as UserType } from '@/lib/api';
import AdminLayout from '@/components/AdminLayout';
import styles from './page.module.css';

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const loadUsers = async () => {
        const data = await fetchAllUsers();
        setUsers(data);
        setLoading(false);
    };

    useEffect(() => {
        // eslint-disable-next-line
        loadUsers();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser(newUsername, newPassword);
            setNewUsername('');
            setNewPassword('');
            setMessage('User created successfully!');
            loadUsers();
            setTimeout(() => setMessage(''), 3000);
        } catch {
            setMessage('Failed to create user');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this admin?')) {
            await deleteUser(id);
            loadUsers();
        }
    };

    if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.titleInfo}>
                        <ShieldCheck size={32} className={styles.icon} />
                        <div>
                            <h1>User Management</h1>
                            <p>Manage administrative access to the platform</p>
                        </div>
                    </div>
                </div>

                <div className={styles.grid}>
                    {/* Create User Form */}
                    <div className={styles.card}>
                        <h2>Add New Administrator</h2>
                        <form onSubmit={handleCreate} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label>Username</label>
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    placeholder="e.g. manager_harrow"
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.addBtn}>
                                <Plus size={18} />
                                Create Admin
                            </button>
                            {message && <p className={styles.msg}>{message}</p>}
                        </form>
                    </div>

                    {/* Users List */}
                    <div className={styles.card}>
                        <h2>Current Administrators</h2>
                        <div className={styles.userList}>
                            {users.map((user) => (
                                <div key={user.id} className={styles.userItem}>
                                    <div className={styles.userInfo}>
                                        <div className={styles.avatar}>
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className={styles.username}>{user.username}</p>
                                            <p className={styles.date}>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className={styles.deleteBtn}
                                        title="Delete User"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
