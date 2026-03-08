'use client';

import React, { useState, useEffect } from 'react';
import {
    Search,
    Trash2,
    Eye,
    Calendar,
    Mail,
    Phone,
    MapPin,
    X,
    User,
    GraduationCap,
    School,
    Clock,
    UserCheck,
    AlertCircle,
    Download
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { fetchAllApplications, deleteApplication, Application } from '@/lib/api';
import styles from './page.module.css';

export default function AdmissionsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        setLoading(true);
        try {
            const data = await fetchAllApplications();
            setApplications(data);
        } catch (error) {
            console.error('Failed to load apps:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this application?')) return;

        try {
            await deleteApplication(id);
            setApplications(applications.filter(app => app.id !== id));
            if (selectedApp?.id === id) setSelectedApp(null);
        } catch (error) {
            alert('Failed to delete application');
        }
    };

    const handleExportCSV = () => {
        if (applications.length === 0) {
            alert('No data to export.');
            return;
        }

        const headers = [
            'Student First Name', 'Student Surname', 'Parent Full Name', 'DOB',
            'Gender', 'School Year', 'Email', 'Phone', 'Address', 'City',
            'Postcode', 'Exam Center', 'Fee', 'Date Applied'
        ];

        const csvRows = [headers.join(',')];

        applications.forEach(app => {
            const row = [
                `"${app.studentFirstName.replace(/"/g, '""')}"`,
                `"${app.studentSurname.replace(/"/g, '""')}"`,
                `"${app.parentFullName.replace(/"/g, '""')}"`,
                new Date(app.studentDob).toLocaleDateString(),
                `"${app.gender}"`,
                `"${app.schoolYear}"`,
                `"${app.email.replace(/"/g, '""')}"`,
                `"${app.phone}"`,
                `"${app.address.replace(/"/g, '""')}"`,
                `"${app.city.replace(/"/g, '""')}"`,
                `"${app.postcode}"`,
                `"${app.examCenter}"`,
                app.fee,
                new Date(app.createdAt).toISOString()
            ];
            csvRows.push(row.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        const dateString = new Date().toISOString().split('T')[0];
        link.download = `student_admissions_${dateString}.csv`;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const filteredApps = applications.filter(app =>
        `${app.studentFirstName} ${app.studentSurname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.parentFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Student Admissions</h1>
                    <div className={styles.headerActions}>
                        <div className={styles.searchBar}>
                            <Search size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search by student, parent or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>
                        <button
                            className={styles.exportBtn}
                            onClick={handleExportCSV}
                            title="Export to CSV"
                            disabled={applications.length === 0}
                        >
                            <Download size={18} />
                            <span>Export CSV</span>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className={styles.loader}>Loading applications...</div>
                ) : filteredApps.length === 0 ? (
                    <div className={styles.emptyState}>
                        <AlertCircle size={48} />
                        <p>No applications found.</p>
                    </div>
                ) : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Parent Name</th>
                                    <th>Year</th>
                                    <th>Gender</th>
                                    <th>Date Applied</th>
                                    <th className={styles.actionsHeader}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApps.map((app) => (
                                    <tr key={app.id}>
                                        <td className={styles.studentName}>
                                            <div className={styles.avatar}>
                                                {app.studentFirstName.charAt(0)}
                                            </div>
                                            {app.studentFirstName} {app.studentSurname}
                                        </td>
                                        <td>{app.parentFullName}</td>
                                        <td>
                                            <span className={styles.badge}>{app.schoolYear}</span>
                                        </td>
                                        <td>{app.gender}</td>
                                        <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                                        <td className={styles.actions}>
                                            <button
                                                className={styles.viewBtn}
                                                onClick={() => setSelectedApp(app)}
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                className={styles.deleteBtn}
                                                onClick={() => handleDelete(app.id)}
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Detail Modal */}
                {selectedApp && (
                    <div className={styles.modalOverlay} onClick={() => setSelectedApp(null)}>
                        <div className={styles.modal} onClick={e => e.stopPropagation()}>
                            <button className={styles.closeBtn} onClick={() => setSelectedApp(null)}>
                                <X size={24} />
                            </button>

                            <div className={styles.modalHeader}>
                                <div className={styles.modalAvatar}>
                                    {selectedApp.studentFirstName.charAt(0)}
                                </div>
                                <div className={styles.modalInfo}>
                                    <h2>{selectedApp.studentFirstName} {selectedApp.studentSurname}</h2>
                                    <span className={styles.modalSub}>Application Details</span>
                                </div>
                            </div>

                            <div className={styles.modalGrid}>
                                <section className={styles.modalSection}>
                                    <h3><User size={18} /> Parent Info</h3>
                                    <p><strong>Name:</strong> {selectedApp.parentFullName}</p>
                                    <p><strong><Mail size={14} /></strong> {selectedApp.email}</p>
                                    <p><strong><Phone size={14} /></strong> {selectedApp.phone}</p>
                                </section>

                                <section className={styles.modalSection}>
                                    <h3><GraduationCap size={18} /> Student Info</h3>
                                    <p><strong>DOB:</strong> {new Date(selectedApp.studentDob).toLocaleDateString()}</p>
                                    <p><strong>Gender:</strong> {selectedApp.gender}</p>
                                    <p><strong>School Year:</strong> {selectedApp.schoolYear}</p>
                                </section>

                                <section className={styles.modalSection}>
                                    <h3><MapPin size={18} /> Address</h3>
                                    <p>{selectedApp.address}</p>
                                    <p>{selectedApp.city}, {selectedApp.postcode}</p>
                                </section>

                                <section className={styles.modalSection}>
                                    <h3><School size={18} /> Exam Details</h3>
                                    <p><strong>Center:</strong> {selectedApp.examCenter}</p>
                                    <p><strong>Fee:</strong> £{selectedApp.fee}</p>
                                </section>
                            </div>

                            <div className={styles.modalFooter}>
                                <span className={styles.timestamp}>
                                    <Clock size={14} /> Applied on {new Date(selectedApp.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
