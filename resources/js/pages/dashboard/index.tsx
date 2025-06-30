import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Megaphone, Newspaper, Package, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const stats = [
  {
    title: "Total Anggota",
    value: "156",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Agenda Bulan Ini",
    value: "8",
    change: "+2",
    trend: "up",
    icon: Calendar,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Pengumuman Aktif",
    value: "5",
    change: "-1",
    trend: "down",
    icon: Megaphone,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Artikel Terpublikasi",
    value: "23",
    change: "+5",
    trend: "up",
    icon: Newspaper,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "agenda",
    title: "Rapat Koordinasi Bulanan",
    description: "Agenda rapat koordinasi untuk membahas program kerja",
    time: "2 jam yang lalu",
    status: "upcoming",
  },
  {
    id: 2,
    type: "pengumuman",
    title: "Pengumuman Kegiatan Gotong Royong",
    description: "Pengumuman kegiatan gotong royong di lingkungan RT 05",
    time: "5 jam yang lalu",
    status: "active",
  },
  {
    id: 3,
    type: "artikel",
    title: "Laporan Kegiatan Bakti Sosial",
    description: "Artikel tentang kegiatan bakti sosial yang telah dilaksanakan",
    time: "1 hari yang lalu",
    status: "published",
  },
  {
    id: 4,
    type: "anggota",
    title: "Anggota Baru Bergabung",
    description: "3 anggota baru telah bergabung dengan organisasi",
    time: "2 hari yang lalu",
    status: "new",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Rapat Koordinasi Bulanan",
    date: "2024-01-15",
    time: "19:00",
    location: "Balai Desa",
    type: "meeting",
  },
  {
    id: 2,
    title: "Kegiatan Gotong Royong",
    date: "2024-01-18",
    time: "07:00",
    location: "RT 05 RW 02",
    type: "activity",
  },
  {
    id: 3,
    title: "Bakti Sosial",
    date: "2024-01-22",
    time: "08:00",
    location: "Panti Asuhan",
    type: "social",
  },
]

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </div>
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            {stat.trend === "up" ? (
                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            ) : (
                            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                            )}
                            <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                            <span className="ml-1">dari bulan lalu</span>
                        </div>
                        </CardContent>
                    </Card>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Aktivitas Terbaru</CardTitle>
                        <CardDescription>Ringkasan aktivitas terbaru dalam organisasi</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-2 h-2 bg-rose-500 rounded-full mt-2"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                                <Badge variant="secondary" className="ml-2">
                                    {activity.type}
                                </Badge>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                                <p className="text-xs text-gray-400">{activity.time}</p>
                            </div>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                    </Card>

                    <Card className="col-span-4 md:col-span-3">
                    <CardHeader>
                        <CardTitle>Agenda Mendatang</CardTitle>
                        <CardDescription>Daftar agenda yang akan datang</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <Calendar className="h-5 w-5 text-rose-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                <p className="text-xs text-gray-500">
                                {event.date} • {event.time}
                                </p>
                                <p className="text-xs text-gray-400">{event.location}</p>
                            </div>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-rose-500" />
                        Ringkasan Inventaris
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm">Total Item</span>
                            <span className="text-sm font-medium">45</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Kondisi Baik</span>
                            <span className="text-sm font-medium text-green-600">38</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Perlu Perbaikan</span>
                            <span className="text-sm font-medium text-orange-600">5</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Rusak</span>
                            <span className="text-sm font-medium text-red-600">2</span>
                        </div>
                        </div>
                    </CardContent>
                    </Card>

                    <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-rose-500" />
                        Ringkasan Keuangan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm">Saldo Kas</span>
                            <span className="text-sm font-medium">Rp 2.500.000</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Pemasukan Bulan Ini</span>
                            <span className="text-sm font-medium text-green-600">Rp 800.000</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Pengeluaran Bulan Ini</span>
                            <span className="text-sm font-medium text-red-600">Rp 450.000</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Selisih</span>
                            <span className="text-sm font-medium text-green-600">+Rp 350.000</span>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                </div>
                </div>
        </AppLayout>
    );
}
