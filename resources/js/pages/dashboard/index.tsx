import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, DollarSign, Megaphone, Newspaper, Package, Plus, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Index({ dashboardData }: any) {
    console.log(dashboardData.keuangan);

    // Data untuk chart rapat
    const rapatData = [
        { bulan: 'Sep', total: 4, hadir: 85 },
        { bulan: 'Okt', total: 3, hadir: 78 },
        { bulan: 'Nov', total: 5, hadir: 92 },
        { bulan: 'Des', total: 2, hadir: 88 },
        { bulan: 'Jan', total: 3, hadir: 90 },
    ];

    const kehadiranData = [
        { name: 'Hadir', value: 85, color: '#10b981' },
        { name: 'Tidak Hadir', value: 15, color: '#ef4444' },
    ];

    const trendKehadiranData = [
        { bulan: 'Sep', persentase: 85 },
        { bulan: 'Okt', persentase: 78 },
        { bulan: 'Nov', persentase: 92 },
        { bulan: 'Des', persentase: 88 },
        { bulan: 'Jan', persentase: 90 },
    ];

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
                                    <div className="rounded-lg bg-blue-50 p-2">
                                        <Users className="h-4 w-4 text-blue-600" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{dashboardData.stats.anggota.total}</div>
                                    <div className="text-muted-foreground flex items-center text-xs">
                                        {dashboardData.stats.anggota.trend === 'up' ? (
                                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                        ) : (
                                            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                                        )}
                                        <span className={dashboardData.stats.anggota.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                                            +{dashboardData.stats.anggota.change}
                                        </span>
                                        <span className="ml-1">dari bulan lalu</span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Agenda Bulan Ini</CardTitle>
                                    <div className="rounded-lg bg-green-50 p-2">
                                        <Calendar className="h-4 w-4 text-green-600" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{dashboardData.stats.agenda.total}</div>
                                    <div className="text-muted-foreground flex items-center text-xs">
                                        {dashboardData.stats.agenda.trend === 'up' ? (
                                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                        ) : (
                                            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                                        )}
                                        <span className={dashboardData.stats.agenda.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                                            +{dashboardData.stats.agenda.change}
                                        </span>
                                        <span className="ml-1">dari bulan lalu</span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pengumuman Aktif</CardTitle>
                                    <div className="rounded-lg bg-orange-50 p-2">
                                        <Megaphone className="h-4 w-4 text-orange-600" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{dashboardData.stats.pengumuman.total}</div>
                                    <div className="text-muted-foreground flex items-center text-xs">
                                        {dashboardData.stats.pengumuman.trend === 'up' ? (
                                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                        ) : (
                                            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                                        )}
                                        <span className={dashboardData.stats.pengumuman.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                                            +{dashboardData.stats.pengumuman.change}
                                        </span>
                                        <span className="ml-1">dari bulan lalu</span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Artikel Terpublikasi</CardTitle>
                                    <div className="rounded-lg bg-purple-50 p-2">
                                        <Newspaper className="h-4 w-4 text-purple-600" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{dashboardData.stats.artikel.total}</div>
                                    <div className="text-muted-foreground flex items-center text-xs">
                                        {dashboardData.stats.artikel.trend === 'up' ? (
                                            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                                        ) : (
                                            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                                        )}
                                        <span className={dashboardData.stats.artikel.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                                            +{dashboardData.stats.artikel.change}
                                        </span>
                                        <span className="ml-1">dari bulan lalu</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <Card className="col-span-4">
                            <CardContent className="text-center">
                                <p className="text-lg font-semibold">Data tidak tersedia</p>
                                <p className="text-muted-foreground text-sm">Silakan coba lagi nanti.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Analytics Rapat Section */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Analytics Rapat</CardTitle>
                                    <CardDescription>Statistik rapat dan kehadiran anggota</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="">
                                {/* Line Chart - Trend Kehadiran */}
                                <div>
                                    <h4 className="mb-3 text-sm font-medium">Trend Kehadiran (%)</h4>
                                    <ChartContainer
                                        config={{
                                            persentase: {
                                                label: 'Kehadiran',
                                                color: 'hsl(var(--chart-2))',
                                            },
                                        }}
                                        className="h-[200px]"
                                    >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={trendKehadiranData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="bulan" />
                                                <YAxis domain={[0, 100]} />
                                                <ChartTooltip content={<ChartTooltipContent />} />
                                                <Line
                                                    type="monotone"
                                                    dataKey="persentase"
                                                    stroke="#10b981"
                                                    strokeWidth={3}
                                                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </ChartContainer>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pie Chart - Kehadiran */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Kehadiran Rapat</CardTitle>
                            <CardDescription>Rata-rata kehadiran bulan ini</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    hadir: {
                                        label: 'Hadir',
                                        color: '#10b981',
                                    },
                                    tidak_hadir: {
                                        label: 'Tidak Hadir',
                                        color: '#ef4444',
                                    },
                                }}
                                className="h-[200px]"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={kehadiranData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {kehadiranData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                            <div className="mt-4 flex justify-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    <span className="text-sm">Hadir (90%)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                    <span className="text-sm">Tidak Hadir (10%)</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
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
                                            <div className="mt-2 h-2 w-2 rounded-full bg-rose-500"></div>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="truncate text-sm font-medium text-gray-900">{activity.title}</p>
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
                                        <div className="min-w-0 flex-1">
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
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                                            dashboardData.keuangan.pemasukan,
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Pengeluaran Bulan Ini</span>
                                    <span className="text-sm font-medium text-red-600">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                                            dashboardData.keuangan.pengeluaran,
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Selisih</span>
                                    <span className="text-sm font-medium text-green-600">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                                            dashboardData.keuangan.selisih,
                                        )}
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
