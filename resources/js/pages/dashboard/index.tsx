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

export default function Index({ dashboardData }: any) {
    console.log(dashboardData.keuangan)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {dashboardData ? (
                        <>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Anggota</CardTitle>
                                <div className="p-2 rounded-lg bg-blue-50">
                                    <Users className="h-4 w-4 text-blue-600" />
                                </div>
                                </CardHeader>
                                <CardContent>
                                <div className="text-2xl font-bold">{dashboardData.stats.anggota.total}</div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                    {dashboardData.stats.anggota.trend === "up" ? (
                                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                    ) : (
                                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                                    )}
                                    <span className={dashboardData.stats.anggota.trend === "up" ? "text-green-500" : "text-red-500"}>+{dashboardData.stats.anggota.change}</span>
                                    <span className="ml-1">dari bulan lalu</span>
                                </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Agenda Bulan Ini</CardTitle>
                                <div className="p-2 rounded-lg bg-green-50">
                                    <Calendar className="h-4 w-4 text-green-600" />
                                </div>
                                </CardHeader>
                                <CardContent>
                                <div className="text-2xl font-bold">{dashboardData.stats.agenda.total}</div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                    {dashboardData.stats.agenda.trend === "up" ? (
                                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                    ) : (
                                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                                    )}
                                    <span className={dashboardData.stats.agenda.trend === "up" ? "text-green-500" : "text-red-500"}>+{dashboardData.stats.agenda.change}</span>
                                    <span className="ml-1">dari bulan lalu</span>
                                </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pengumuman Aktif</CardTitle>
                                <div className="p-2 rounded-lg bg-orange-50">
                                    <Megaphone className="h-4 w-4 text-orange-600" />
                                </div>
                                </CardHeader>
                                <CardContent>
                                <div className="text-2xl font-bold">{dashboardData.stats.pengumuman.total}</div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                    {dashboardData.stats.pengumuman.trend === "up" ? (
                                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                    ) : (
                                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                                    )}
                                    <span className={dashboardData.stats.pengumuman.trend === "up" ? "text-green-500" : "text-red-500"}>+{dashboardData.stats.pengumuman.change}</span>
                                    <span className="ml-1">dari bulan lalu</span>
                                </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Artikel Terpublikasi</CardTitle>
                                <div className="p-2 rounded-lg bg-purple-50">
                                    <Newspaper className="h-4 w-4 text-purple-600" />
                                </div>
                                </CardHeader>
                                <CardContent>
                                <div className="text-2xl font-bold">{dashboardData.stats.artikel.total}</div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                    {dashboardData.stats.artikel.trend === "up" ? (
                                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                    ) : (
                                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                                    )}
                                    <span className={dashboardData.stats.artikel.trend === "up" ? "text-green-500" : "text-red-500"}>+{dashboardData.stats.artikel.change}</span>
                                    <span className="ml-1">dari bulan lalu</span>
                                </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                    <Card className="col-span-4">
                        <CardContent className="text-center">
                            <p className="text-lg font-semibold">Data tidak tersedia</p>
                            <p className="text-sm text-muted-foreground">Silakan coba lagi nanti.</p>
                        </CardContent>
                    </Card>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Aktivitas Terbaru</CardTitle>
                        <CardDescription>Ringkasan aktivitas terbaru dalam organisasi</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        {dashboardData.recentActivities.map((activity: any) => (
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
                                {/* human readable time */}
                                <p className="text-xs text-gray-400">
                                    {new Date(activity.time).toLocaleString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
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
                        {dashboardData.upcomingEvents.map((event: any, index: any) => (
                            <div key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <Calendar className="h-5 w-5 text-rose-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                <p className="text-xs text-gray-500">
                                {new Date(event.date + 'T' + event.time).toLocaleString('id-ID', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
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
                            <span className="text-sm font-medium">{dashboardData.inventaris.totalItem}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Kondisi Baik</span>
                            <span className="text-sm font-medium text-green-600">{dashboardData.inventaris.baik}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Perlu Perbaikan</span>
                            <span className="text-sm font-medium text-orange-600">{dashboardData.inventaris.perluPerbaikan}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm">Rusak</span>
                            <span className="text-sm font-medium text-red-600">{dashboardData.inventaris.rusak}</span>
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
                                <span className="text-sm font-medium">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(dashboardData.keuangan.saldo)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">Pemasukan Bulan Ini</span>
                                <span className="text-sm font-medium text-green-600">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(dashboardData.keuangan.pemasukan)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">Pengeluaran Bulan Ini</span>
                                <span className="text-sm font-medium text-red-600">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(dashboardData.keuangan.pengeluaran)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">Selisih</span>
                                <span className="text-sm font-medium text-green-600">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(dashboardData.keuangan.selisih)}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                    </Card>
                </div>
                </div>
        </AppLayout>
    );
}
