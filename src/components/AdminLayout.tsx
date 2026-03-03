import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Users,
    Megaphone,
    LayoutDashboard,
    ArrowLeft,
    LogOut,
    GraduationCap
} from 'lucide-react';
import styles from './AdminLayout.module.css';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();

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
        }
    ];

    return (
        <div className={styles.adminContainer}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
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
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navLink} ${item.active ? styles.active : ''}`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <Link href="/" className={styles.backLink}>
                        <ArrowLeft size={18} />
                        <span>Back to Site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <header className={styles.topBar}>
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
