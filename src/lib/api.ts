const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
