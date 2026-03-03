export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Application {
    id: string;
    parentFullName: string;
    studentFirstName: string;
    studentSurname: string;
    studentDob: string;
    gender: string;
    schoolYear: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postcode: string;
    fee: number;
    examCenter: string;
    createdAt: string;
}

export interface Announcement {
    id: string;
    message: string;
    isActive: boolean;
    createdAt: string;
}

export interface User {
    id: string;
    username: string;
    createdAt: string;
}

export interface GalleryItem {
    id: string;
    title: string;
    imageUrls: string[];
    category: string;
    eventDate?: string;
    createdAt: string;
}

/* ── Auth Helper ── */

function getAuthHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
}

/* ── Public API ── */

export async function login(username: string, password: string): Promise<{ access_token: string; user: User }> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }

    const data = await response.json();
    if (typeof window !== 'undefined') {
        localStorage.setItem('admin_token', data.access_token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
    }
    return data;
}

export async function submitApplication(
    data: Omit<Application, 'id' | 'fee' | 'createdAt'>
): Promise<{ message: string; application: Application }> {
    const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit application');
    }

    return response.json();
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/announcements`, {
            next: { revalidate: 60 },
        });

        if (!response.ok) return [];
        return response.json();
    } catch {
        return [];
    }
}

export async function fetchGallery(): Promise<GalleryItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/gallery`, {
            next: { revalidate: 300 },
        });
        if (!response.ok) return [];
        return response.json();
    } catch {
        return [];
    }
}

/* ── Admin API Methods (Protected) ── */

export async function fetchAllApplications(): Promise<Application[]> {
    const response = await fetch(`${API_BASE_URL}/api/applications`, {
        headers: getAuthHeaders(),
        cache: 'no-store',
    });
    if (!response.ok) return [];
    return response.json();
}

export async function deleteApplication(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete application');
}

export async function fetchAllAnnouncements(): Promise<Announcement[]> {
    const response = await fetch(`${API_BASE_URL}/api/announcements/all`, {
        headers: getAuthHeaders(),
        cache: 'no-store',
    });
    if (!response.ok) return [];
    return response.json();
}

export async function createAnnouncement(message: string): Promise<Announcement> {
    const response = await fetch(`${API_BASE_URL}/api/announcements`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ message }),
    });
    if (!response.ok) throw new Error('Failed to create announcement');
    return response.json();
}

export async function updateAnnouncement(id: string, message: string): Promise<Announcement> {
    const res = await fetch(`${API_BASE_URL}/api/announcements/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error('Update failed');
    return res.json();
}

export async function toggleAnnouncement(id: string): Promise<Announcement> {
    const response = await fetch(`${API_BASE_URL}/api/announcements/${id}/toggle`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to toggle announcement');
    return response.json();
}

export async function deleteAnnouncement(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/announcements/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete announcement');
}

/* ── Gallery Admin ── */

export async function createGalleryItem(formData: FormData): Promise<GalleryItem> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const response = await fetch(`${API_BASE_URL}/api/gallery`, {
        method: 'POST',
        headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload image(s)');
    return response.json();
}

export async function updateGalleryItem(id: string, formData: FormData): Promise<GalleryItem> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: 'PATCH',
        headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: formData,
    });
    if (!res.ok) throw new Error('Update failed');
    return res.json();
}

export async function deleteGalleryItem(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete image');
}

export async function sendContactMessage(data: { name: string; email: string; subject: string; message: string }): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to send message');
}

/* ── Users Admin ── */

export async function fetchAllUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
        headers: getAuthHeaders(),
        cache: 'no-store',
    });
    if (!response.ok) return [];
    return response.json();
}

export async function createUser(username: string, password: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
}

export async function deleteUser(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete user');
}
