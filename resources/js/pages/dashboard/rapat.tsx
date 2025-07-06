import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    Clock,
    Copy,
    Edit,
    Eye,
    FileText,
    MapPin,
    Plus,
    QrCode,
    Trash2,
    User,
    UserCheck,
    Users,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Rapat',
        href: '/rapat',
    },
];

export default function Rapat({ rapatData, users }: any) {
    const [selectedRapat, setSelectedRapat] = useState<any>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isPresensiOpen, setIsPresensiOpen] = useState(false);
    const [presensiCode, setPresensiCode] = useState('');
    const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editingRapat, setEditingRapat] = useState<any>(null)
    const { data, setData, post, put, delete:destroy, reset, processing, errors } = useForm({
        judul: '',
        tanggal: '',
        waktu: '',
        lokasi: '',
        agenda: '',
        status: 'berlangsung',
    });

    console.log(rapatData)

    const getUserDetail = (userId: number) => {
        const user = users.find((u: any) => u.id === userId);
        return user;
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'berlangsung':
                return (
                    <Badge className="bg-blue-100 text-blue-800">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Berlangsung
                    </Badge>
                );
            case 'selesai':
                return (
                    <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Selesai
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getPresensiStatusBadge = (status: string) => {
        switch (status) {
            case 'hadir':
                return (
                    <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Hadir
                    </Badge>
                );
            case 'tidak_hadir':
                return (
                    <Badge className="bg-red-100 text-red-800">
                        <XCircle className="mr-1 h-3 w-3" />
                        Tidak Hadir
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const handleViewDetail = (rapat: any) => {
        setSelectedRapat(rapat);
        setCurrentView('detail');
    };

    const handleViewPresensi = (rapat: any) => {
        setSelectedRapat(rapat);
        setIsDetailOpen(true);
    };

    const handleCreateRapat = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('dashboard.rapat.store'), {
            onSuccess: () => {
                toast.success(`Rapat "${data.judul}" berhasil dibuat!`);
                reset();
                setIsCreateOpen(false);
            },
            onError: (errors: any) => {
                toast.error('Gagal membuat rapat. Cek kembali inputan.');
                console.error(errors);
            },
        });
    };

    const handleEditRapat = () => {
        if (editingRapat) {
            put(route('dashboard.rapat.update', { id: editingRapat.id }), {
                onSuccess: () => {
                    toast.success(`Rapat "${data.judul}" berhasil diperbarui!`);
                    setIsEditOpen(false);
                    setEditingRapat(null);
                },
                onError: (errors: any) => {
                    toast.error('Gagal memperbarui rapat. Cek kembali inputan.');
                    console.error(errors);
                },
            });
        }
    }

    const handleDeleteRapat = (id: any) => {
        destroy(route('dashboard.rapat.destroy', { id }), {
            onSuccess: () => {
                toast.success('Rapat berhasil dihapus!');
            },
            onError: (errors: any) => {
                toast.error('Gagal menghapus rapat. Coba lagi nanti.');
                console.error(errors);
            },
        });
    }

    const openEditDialog = (rapat: any) => {
        setEditingRapat(rapat);
        setData({
            judul: rapat.judul,
            tanggal: rapat.tanggal,
            waktu: rapat.waktu,
            lokasi: rapat.lokasi,
            agenda: rapat.agenda,
            status: rapat.status,
        });
        setIsEditOpen(true);
    }

    const handlePresensi = () => {
        if (presensiCode.length === 6) {
            post(route('dashboard.rapat.presensi', { kode_presensi: presensiCode }), {
                onSuccess: () => {
                    toast.success('Presensi berhasil dilakukan!');
                    setPresensiCode('');
                    setIsPresensiOpen(false);
                },
                onError: (errors: any) => {
                    toast.error('Gagal melakukan presensi. Pastikan kode benar.');
                    console.error(errors);
                },
            });
        } else {
            toast.error('Kode presensi harus terdiri dari 6 karakter!');
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Kode presensi berhasil disalin ke clipboard!');
    };

    const formatTanggal = (tanggal: string) => {
        return new Date(tanggal).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatWaktu = (waktu: string) => {
        const [jam, menit] = waktu.split(':');
        return `${jam.padStart(2, '0')}:${menit.padStart(2, '0')} WIB`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {currentView === 'list' && (
                    <>
                        {/* Header dengan statistik */}
                        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Rapat</CardTitle>
                                    <Calendar className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{rapatData.length || 0}</div>
                                    <p className="text-muted-foreground text-xs">+1 dari bulan lalu</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Rapat Aktif</CardTitle>
                                    <AlertCircle className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {rapatData?.filter((r: any) => r.status === 'berlangsung' || r.status === 'akan_datang').length || '-'}
                                    </div>
                                    <p className="text-muted-foreground text-xs">Berlangsung & akan datang</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Rata-rata Kehadiran</CardTitle>
                                    <UserCheck className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {Math.round(
                                            (rapatData?.reduce((sum: any, r: any) => sum + r.hadir, 0) /
                                                rapatData?.reduce((sum: any, r: any) => sum + r.total_anggota, 0)) *
                                                100,
                                        ) || 0}
                                        %
                                    </div>
                                    <p className="text-muted-foreground text-xs">Dari total anggota</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Rapat Selesai</CardTitle>
                                    <CheckCircle className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{rapatData?.filter((r: any) => r.status === 'selesai').length || 0}</div>
                                    <p className="text-muted-foreground text-xs">Rapat terlaksana</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-rose-600 hover:bg-rose-700">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Buat Rapat
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>Buat Rapat Baru</DialogTitle>
                                        <DialogDescription>Buat rapat baru dengan kode presensi otomatis</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="judul">Judul Rapat</Label>
                                            <Input
                                                id="judul"
                                                placeholder="Masukkan judul rapat"
                                                value={data.judul}
                                                onChange={(e) => setData('judul', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="tanggal">Tanggal</Label>
                                                <Input
                                                    id="tanggal"
                                                    type="date"
                                                    value={data.tanggal}
                                                    onChange={(e) => setData('tanggal', e.target.value)}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="waktu">Waktu</Label>
                                                <Input id="waktu" type="time" value={data.waktu} onChange={(e) => setData('waktu', e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="lokasi">Lokasi</Label>
                                            <Input
                                                id="lokasi"
                                                placeholder="Lokasi rapat"
                                                value={data.lokasi}
                                                onChange={(e) => setData('lokasi', e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="agenda">Agenda Rapat</Label>
                                            <Textarea
                                                id="agenda"
                                                placeholder="Deskripsi agenda rapat..."
                                                value={data.agenda}
                                                onChange={(e) => setData('agenda', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            type="submit"
                                            className="bg-rose-600 hover:bg-rose-700"
                                            onClick={handleCreateRapat}
                                            disabled={!data.judul || !data.tanggal || !data.waktu || !data.lokasi}
                                        >
                                            Buat Rapat
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            {/* Edit Rapat Dialog */}
                            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit Rapat</DialogTitle>
                                        <DialogDescription>Edit informasi rapat dan kelola status</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-judul">Judul Rapat</Label>
                                        <Input
                                        id="edit-judul"
                                        placeholder="Masukkan judul rapat"
                                        value={data.judul}
                                        onChange={(e) => setData("judul", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                        <Label htmlFor="edit-tanggal">Tanggal</Label>
                                        <Input
                                            id="edit-tanggal"
                                            type="date"
                                            value={data.tanggal}
                                            onChange={(e) => setData("tanggal", e.target.value)}
                                        />
                                        </div>
                                        <div className="grid gap-2">
                                        <Label htmlFor="edit-waktu">Waktu</Label>
                                        <Input
                                            id="edit-waktu"
                                            type="time"
                                            value={data.waktu}
                                            onChange={(e) => setData("waktu", e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-lokasi">Lokasi</Label>
                                        <Input
                                        id="edit-lokasi"
                                        placeholder="Lokasi rapat"
                                        value={data.lokasi}
                                        onChange={(e) => setData("lokasi", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-agenda">Agenda Rapat</Label>
                                        <Textarea
                                        id="edit-agenda"
                                        placeholder="Deskripsi agenda rapat..."
                                        value={data.agenda}
                                        onChange={(e) => setData("agenda", e.target.value)}
                                        />
                                    </div>
                                    {editingRapat && (
                                        <div className="grid gap-2">
                                        <Label>Status Rapat Saat Ini</Label>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(editingRapat.status)}
                                            <span className="text-sm text-muted-foreground">
                                            Kode Presensi:{" "}
                                            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                                {editingRapat.kode_presensi}
                                            </code>
                                            </span>
                                        </div>
                                        </div>
                                    )}
                                    {editingRapat && editingRapat.status !== "selesai" && (
                                        <div className="grid gap-2">
                                        <Label htmlFor="edit-status">Ubah Status Rapat</Label>
                                        <Select
                                            value={data.status}
                                            onValueChange={(value) => setData("status", value)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Pilih status rapat" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="berlangsung">Berlangsung</SelectItem>
                                                <SelectItem value="selesai">Selesai</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        </div>
                                    )}
                                    </div>
                                    <DialogFooter className="flex gap-2">
                                    <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                                        Batal
                                    </Button>
                                    <Button
                                        className="bg-rose-600 hover:bg-rose-700"
                                        onClick={handleEditRapat}
                                        disabled={!data.judul || !data.tanggal || !data.waktu || !data.lokasi}
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Update Rapat
                                    </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Dialog open={isPresensiOpen} onOpenChange={setIsPresensiOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <QrCode className="mr-2 h-4 w-4" />
                                        Presensi Rapat
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[400px]">
                                    <DialogHeader>
                                        <DialogTitle>Presensi Rapat</DialogTitle>
                                        <DialogDescription>Masukkan kode presensi untuk menghadiri rapat</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="kode">Kode Presensi</Label>
                                            <Input
                                                id="kode"
                                                placeholder="Masukkan 6 karakter kode"
                                                value={presensiCode}
                                                onChange={(e) => setPresensiCode(e.target.value)}
                                                maxLength={6}
                                                className="text-center font-mono text-lg tracking-widest"
                                            />
                                            <p className="text-muted-foreground text-center text-xs">
                                                Kode terdiri dari 6 karakter (huruf dan angka)
                                            </p>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            type="submit"
                                            className="w-full bg-green-600 hover:bg-green-700"
                                            onClick={handlePresensi}
                                            disabled={presensiCode.length !== 6}
                                        >
                                            <UserCheck className="mr-2 h-4 w-4" />
                                            Konfirmasi Presensi
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Tabel Rapat */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Daftar Rapat</CardTitle>
                                        <CardDescription>Kelola semua rapat organisasi</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Rapat</TableHead>
                                            <TableHead>Tanggal & Waktu</TableHead>
                                            <TableHead>Lokasi</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Kode</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rapatData?.map((rapat: any) => (
                                            <TableRow key={rapat.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{rapat.judul}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col text-xs">
                                                        <span className="flex items-center">
                                                            <Calendar className="mr-1 h-3 w-3" />
                                                            {new Date(rapat.tanggal).toLocaleDateString('id-ID', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            })}
                                                        </span>
                                                        <span className="text-muted-foreground flex items-center text-xs">
                                                            <Clock className="mr-1 h-3 w-3" />
                                                            {formatWaktu(rapat.waktu)}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <MapPin className="mr-1 h-3 w-3" />
                                                        {rapat.lokasi}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{getStatusBadge(rapat.status)}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">{rapat.kode_presensi || '-'}</code>
                                                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(rapat.kode_presensi)}>
                                                            <Copy className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => handleViewDetail(rapat)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={() => handleViewPresensi(rapat)}>
                                                            <Users className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(rapat)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="ghost" size="sm" className="text-red-600">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Hapus Pengumuman</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Apakah Anda yakin ingin menghapus rapat "{rapat.judul}"? Tindakan ini tidak dapat dibatalkan.
                                                                        <br />
                                                                        Semua data terkait rapat ini akan dihapus.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDeleteRapat(rapat.id)} className='bg-red-600 hover:bg-red-700 text-white'>
                                                                        Ya, Hapus
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Detail Rapat View */}
                {currentView === 'detail' && selectedRapat && (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedRapat.judul}</h2>
                                <p className="text-muted-foreground">
                                    {formatTanggal(selectedRapat.tanggal)} • {formatWaktu(selectedRapat.waktu)}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setCurrentView('list')}>
                                    Kembali ke Daftar
                                </Button>
                                <Button className="bg-rose-600 hover:bg-rose-700">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Rapat
                                </Button>
                            </div>
                        </div>

                        {/* Info Rapat */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informasi Rapat</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Status</Label>
                                        {getStatusBadge(selectedRapat.status)}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Lokasi</Label>
                                        <p className="flex items-center">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            {selectedRapat.lokasi}
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Kode Presensi</Label>
                                        <div className="flex items-center gap-2">
                                            <code className="rounded bg-gray-100 px-3 py-2 font-mono text-lg tracking-widest">
                                                {selectedRapat.kode_presensi}
                                            </code>
                                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(selectedRapat.kode_presensi)}>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Statistik Kehadiran</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Total Anggota</Label>
                                        <p className="text-2xl font-bold">{selectedRapat.presensi.length || 0}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label className="font-semibold text-green-600">Hadir</Label>
                                            <p className="text-xl font-bold text-green-600">{selectedRapat.presensi.filter((p: any) => p.status === 'hadir').length}</p>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label className="font-semibold text-red-600">Tidak Hadir</Label>
                                            <p className="text-xl font-bold text-red-600">
                                                {selectedRapat.presensi.filter((p: any) => p.status === 'tidak_hadir').length}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Persentase Kehadiran</Label>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 flex-1 rounded-full bg-gray-200">
                                                <div
                                                    className="h-2 rounded-full bg-green-600"
                                                    style={{
                                                        width: `${(selectedRapat.presensi.filter((p: any) => p.status === 'hadir').length / selectedRapat.presensi.length) * 100}%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-medium">
                                                {Math.round((selectedRapat.presensi.filter((p: any) => p.status === 'hadir').length / selectedRapat.presensi.length) * 100) || 0}%
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Agenda */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Agenda Rapat</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="leading-relaxed text-gray-700">{selectedRapat.agenda}</p>
                            </CardContent>
                        </Card>

                        {/* Daftar Presensi */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Daftar Presensi</CardTitle>
                                <CardDescription>
                                    {selectedRapat.presensi.length} dari {selectedRapat.total_anggota} anggota
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>No</TableHead>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>Jabatan</TableHead>
                                            <TableHead>Waktu Presensi</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedRapat.presensi.map((presensi: any, index: number) => (
                                            <TableRow key={presensi.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell className="font-medium">{getUserDetail(presensi.user_id)?.nama || 'Tidak Diketahui'}</TableCell>
                                                <TableCell>{getUserDetail(presensi.user_id)?.jabatan?.nama_jabatan || '-'}</TableCell>
                                                <TableCell>
                                                    {presensi.waktu_presensi ? (
                                                        <span className="flex items-center">
                                                            <Clock className="mr-1 h-3 w-3" />
                                                            {formatWaktu(presensi.waktu_presensi)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>{getPresensiStatusBadge(presensi.status)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Dialog Detail Presensi */}
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Detail Presensi Rapat</DialogTitle>
                            <DialogDescription>Informasi kehadiran anggota dalam rapat</DialogDescription>
                        </DialogHeader>
                        {selectedRapat && (
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Rapat</Label>
                                    <p>{selectedRapat.judul}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Tanggal</Label>
                                        <p className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {formatTanggal(selectedRapat.tanggal)}
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Waktu</Label>
                                        <p className="flex items-center">
                                            <Clock className="mr-2 h-4 w-4" />
                                            {formatWaktu(selectedRapat.waktu)}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Statistik Kehadiran</Label>
                                    <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold">{selectedRapat.presensi.length || 0}</div>
                                            <div className="text-muted-foreground text-sm">Total</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">{selectedRapat.presensi.filter((p: any) => p.status === 'hadir').length || 0}</div>
                                            <div className="text-muted-foreground text-sm">Hadir</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-red-600">{selectedRapat.presensi.filter((p: any) => p.status === 'tidak_hadir').length || 0}</div>
                                            <div className="text-muted-foreground text-sm">Tidak Hadir</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Kode Presensi</Label>
                                    <div className="flex items-center gap-2">
                                        <code className="rounded bg-gray-100 px-3 py-2 font-mono text-lg tracking-widest">
                                            {selectedRapat.kode_presensi}
                                        </code>
                                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(selectedRapat.kode_presensi)}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                                Tutup
                            </Button>
                            <Button
                                className="bg-rose-600 hover:bg-rose-700"
                                onClick={() => {
                                    setIsDetailOpen(false);
                                    handleViewDetail(selectedRapat);
                                }}
                            >
                                Lihat Detail Lengkap
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
