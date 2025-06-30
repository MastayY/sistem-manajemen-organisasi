import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: Array<{
        items: any;
        title: string;
        url: string;
        icon: React.ComponentType;
    }>;
}

export interface NavItem {
    title: string;
    url: string; // Changed from `href` to `url` to match the provided structure
    icon?: LucideIcon;
    [key: string]: unknown; // This allows for additional properties...
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    nama: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface NavbarProps {
    active: string;
}

export interface NavlinkProps {
    isActive: boolean;
    href: string;
    title: string;
}

export interface NavbodyProps {
    children: React.ReactNode;
    isOpen: boolean;
}

export interface NavbtnProps {
    isOpen: boolean;
    onClick: () => void;
}

export interface KepengurusanHeaderProps {
    title: string;
    description: string;
}

export interface KepengurusanCardProps {
    name: string;
    position: string;
    image: string;
    href: string;
    username: string;
}
export interface PengumumanProps {
    pengumuman: {
        id: number;
        judul: string;
        tanggal: string;
        lokasi: string;
        pembuat: {
            alamat: string;
            created_at: string;
            email: string;
            email_verified_at: string | null;
            id: number;
            id_jabatan: number;
            id_seksi: number | null;
            jenis_kelamin: string;
            koordinator: boolean;
            nama: string;
            role: string;
            status: 'Aktif' | 'Non-aktif';
            telepon: string;
            updated_at: string;
        };
        isi: string;
        status: 'active' | 'archived' | 'draft';
        dikirim_wa: boolean;
        penerima: number;
    }[];
    anggota: {
        id: number;
        nama: string;
        alamat: string;
        telepon: string;
        email: string;
        jenis_kelamin: string;
        status: string;
        role: string;
        jabatan: any;
    }[];
}
