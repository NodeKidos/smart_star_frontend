'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Users,
    Megaphone,
    LayoutDashboard,
    ArrowLeft,
    Image as ImageIcon,
    GraduationCap,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import Header from './Header';
import styles from './AdminLayout.module.css';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
        if (!token && pathname !== '/admin/login') {
            router.push('/admin/login');
        } else {
            setIsAuthorized(true);
        }
    }, [pathname, router]);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        router.push('/admin/login');
    };

    const navItems = [
        {
            label: 'Admissions',
            icon: Users,
            href: '/admin/admissions',
            active: pathname === '/admin/admissions'
        },
        {
            label: 'Announcements',
            icon: Megaphone,
            href: '/admin/announcements',
            active: pathname === '/admin/announcements'
        },
        {
            label: 'Gallery',
            icon: ImageIcon,
            href: '/admin/gallery',
            active: pathname === '/admin/gallery'
        },
        {
            label: 'Users',
            icon: Users,
            href: '/admin/users',
            active: pathname === '/admin/users'
        }
    ];

    if (!isAuthorized && pathname !== '/admin/login') {
        return <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1B2A4A',
            color: 'white',
            fontFamily: 'Inter, sans-serif'
        }}>
            Initializing secure session...
        </div>;
    }

    return (
        <div className={styles.adminContainer}>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className={styles.sidebarOverlay}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <GraduationCap size={28} className={styles.logoIcon} />
                        <div className={styles.logoText}>
                            <span className={styles.brandName}>Smart Star</span>
                            <span className={styles.adminLabel}>Admin Panel</span>
                        </div>
                    </div>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item, index) => (
                        <Link
                            key={item.href || index}
                            href={item.href}
                            className={`${styles.navLink} ${item.active ? styles.active : ''}`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                    <Link href="/" className={styles.backLink}>
                        <ArrowLeft size={18} />
                        <span>Back to Site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Announcement Ticker in Admin */}
                <Header isAdmin={true} />

                <header className={styles.topBar}>
                    <button
                        className={styles.hamburgerBtn}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle sidebar"
                    >
                        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                    <div className={styles.breadcrumb}>
                        <LayoutDashboard size={18} />
                        <span>/ Dashboard / {pathname.split('/').pop()?.charAt(0).toUpperCase()}{pathname.split('/').pop()?.slice(1)}</span>
                    </div>
                </header>
                <div className={styles.pageBody}>
                    {children}
                </div>
            </main>
        </div>
    );
}
