import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { Calendar, DollarSign, FileText, LayoutGrid, Megaphone, Newspaper, Package, Settings, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems = [
    {
        title: 'Manajemen',
        items: [
            {
                title: 'Dashboard',
                url: '/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Agenda',
                url: '/dashboard/agenda',
                icon: Calendar,
            },
            {
                title: 'Pengumuman',
                url: '/dashboard/pengumuman',
                icon: Megaphone,
            },
            {
                title: 'Dokumen',
                url: '/dashboard/dokumen',
                icon: FileText,
            },
            {
                title: 'Artikel & Berita',
                url: '/dashboard/aktivitas',
                icon: Newspaper,
            },
            {
                title: 'Manajemen Anggota',
                url: '/dashboard/anggota',
                icon: Users,
            },
        ],
    },
    {
        title: 'Operasional',
        items: [
            {
                title: 'Inventaris',
                url: '/dashboard/inventaris',
                icon: Package,
            },
            {
                title: 'Keuangan',
                url: '/dashboard/keuangan',
                icon: DollarSign,
            },
        ],
    },
    {
        title: 'Pengaturan',
        items: [
            {
                title: 'Profile Setting',
                url: '/settings',
                icon: Settings,
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
