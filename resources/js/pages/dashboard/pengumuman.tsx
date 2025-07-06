import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PengumumanProps } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Calendar, Edit, Eye, MapPin, Megaphone, Plus, Send, Trash2, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Pengumuman',
        href: '/dashboard/pengumuman',
    },
];

const Pengumuman = ({ pengumuman, anggota }: PengumumanProps) => {
    const [selectedPengumuman, setSelectedPengumuman] = useState<any>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [pengumumanData, setPengumumanData] = useState(pengumuman);

    const [currentView, setCurrentView] = useState<'list' | 'form'>('list');
    const [selectedAnggota, setSelectedAnggota] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    // Data anggota untuk pemilihan penerima pengumuman
    const anggotaList =  anggota.map((a) => ({
        id: a.id,
        nama: a.nama,
        status: a.status,
        telepon: a.telepon,
        jabatan: a.jabatan?.nama_jabatan || '—',
    }));

    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm<{
        judul: string;
        tanggal: string;
        lokasi: string;
        pembuat: string;
        waktu: string;
        isi: string;
        type: string;
        status: string;
        dikirim_wa: boolean;
        target: number[];
    }>({
        judul: '',
        tanggal: '',
        lokasi: '',
        pembuat: 'Admin',
        waktu: '',
        isi: '',
        type: 'pengumuman',
        status: 'draft',
        dikirim_wa: false,
        target: [],
    });

    console.log(pengumuman)

    const getNamaAnggota = (anggotaId: number) => {
        const anggota = anggotaList.find((a) => a.id === anggotaId);
        return anggota ? anggota.nama : 'Tidak diketahui';
    };

    const handleEdit = (pengumuman: any) => {
        setSelectedPengumuman(pengumuman);
        setData({
            judul: pengumuman.judul,
            tanggal: pengumuman.tanggal,
            lokasi: pengumuman.lokasi,
            pembuat: pengumuman.pembuat.nama,
            waktu: pengumuman.waktu,
            isi: pengumuman.isi,
            type: pengumuman.type,
            status: pengumuman.status,
            dikirim_wa: pengumuman.dikirim_wa || false,
            target: pengumuman.penerima ? pengumuman.penerima.map((p: any) => p.id) : [],
        });
        setIsCreateOpen(true);
        setCurrentView('form');
    }

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/dashboard/pengumuman/${selectedPengumuman.id}`, {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
                setPengumumanData((prev: any) =>
                    prev.map((p: any) => (p.id === selectedPengumuman.id ? { ...p, ...data } : p))
                );
                router.visit('/dashboard/pengumuman');
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    }

    const handleDelete = (pengumumanId: number) => {
        destroy(route('dashboard.pengumuman.destroy', pengumumanId));
    }

    const handleViewDetail = (pengumuman: any) => {
        setSelectedPengumuman(pengumuman);
        setIsDetailOpen(true);
    };

    const handleSendWhatsApp = (pengumuman: any) => {
        // Simulasi pengiriman WhatsApp
        alert(`Pengumuman "${pengumuman.judul}" akan dikirim via WhatsApp ke ${pengumuman.penerima.length || 'semua'} anggota`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dashboard/pengumuman', {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
                setPengumumanData((prev: any) => [...prev, data]);
                router.visit('/dashboard/pengumuman');
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const handleSelectAnggota = (anggotaId: number) => {
        setSelectedAnggota((prev) =>
        prev.includes(anggotaId) ? prev.filter((id) => id !== anggotaId) : [...prev, anggotaId],
        )
    }

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedAnggota([]);
        } else {
            setSelectedAnggota(anggotaList.filter((a) => a.status.toLowerCase() === 'aktif').map((a) => a.id));
        }
        setSelectAll(!selectAll);
    };

    console.log('Selected Anggota:', selectedAnggota);

    useEffect(() => {
        // set target dengan selectedAnggota
        setData((prev) => ({
            ...prev,
            target: selectedAnggota,
        }));
    }, [selectedAnggota]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            {currentView === 'list' ? (
                <>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        {/* Header dengan statistik */}
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Pengumuman</CardTitle>
                                    <Megaphone className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{pengumumanData.length}</div>
                                    <p className="text-muted-foreground text-xs">+1 dari minggu lalu</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pengumuman Aktif</CardTitle>
                                    <Calendar className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{pengumumanData.filter((p) => p.status === 'active').length}</div>
                                    <p className="text-muted-foreground text-xs">Sedang berlangsung</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Terkirim WhatsApp</CardTitle>
                                    <Send className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{pengumumanData.filter((p) => p.dikirim_wa).length}</div>
                                    <p className="text-muted-foreground text-xs">
                                        Total {pengumumanData.reduce((sum, p) => sum + (p.dikirim_wa && Array.isArray(p.penerima) ? p.penerima.length : 0), 0)} penerima
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Tabel Pengumuman */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Daftar Pengumuman</CardTitle>
                                        <CardDescription>Kelola semua pengumuman organisasi</CardDescription>
                                    </div>
                                    <Button className="bg-rose-600 hover:bg-rose-700" onClick={() => setCurrentView("form")}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Buat Pengumuman
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Judul</TableHead>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead>Lokasi</TableHead>
                                            <TableHead>Pembuat</TableHead>
                                            <TableHead>Penerima</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pengumumanData.map((pengumuman) => (
                                            <TableRow key={pengumuman.id}>
                                                <TableCell className="font-medium">{pengumuman.judul}</TableCell>
                                                <TableCell>{pengumuman.tanggal}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <MapPin className="mr-1 h-3 w-3" />
                                                        {pengumuman.lokasi}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{pengumuman.pembuat.nama}</TableCell>
                                                <TableCell>
                                                    {Array.isArray(pengumuman.penerima) ? pengumuman.penerima.length : 0}
                                                </TableCell>
                                                <TableCell>
                                                    {pengumuman.penerima ? (
                                                        <Badge className="bg-green-100 text-green-800">Terkirim ({Array.isArray(pengumuman.penerima) ? pengumuman.penerima.length : 0})</Badge>
                                                    ) : (
                                                        <Badge variant="secondary">Belum</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => handleViewDetail(pengumuman)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        {/* <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" onClick={() => handleEdit(pengumuman)} />
                                                        </Button> */}
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
                                                                        Apakah kamu yakin ingin menghapus pengumuman "{pengumuman.judul}"? Tindakan ini tidak dapat dibatalkan.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                    <AlertDialogAction className='bg-red-600 hover:bg-red-700 text-white' onClick={() => handleDelete(pengumuman.id_pengumuman)}>
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
                    </div>
                </>
            ) : (
                <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                    {/* Form Pengumuman Baru */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Buat Pengumuman Baru</h2>
                            <p className="text-muted-foreground">Pilih anggota dan buat pengumuman untuk dikirim</p>
                        </div>
                        <Button variant="outline" onClick={() => setCurrentView('list')}>
                            Kembali ke Daftar
                        </Button>
                    </div>

                    {/* Tabel Pemilihan Anggota */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Pilih Penerima Pengumuman</CardTitle>
                                    <CardDescription>Pilih anggota yang akan menerima pengumuman ({selectedAnggota.length} dipilih)</CardDescription>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="selectAll" checked={selectAll} onChange={handleSelectAll} className="rounded" />
                                    <Label htmlFor="selectAll">Pilih Semua Anggota Aktif</Label>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">Pilih</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Jabatan</TableHead>
                                        <TableHead>Telepon</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {anggotaList.map((anggota) => (
                                        <TableRow key={anggota.id}>
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAnggota.includes(anggota.id)}
                                                    onChange={() => handleSelectAnggota(anggota.id)}
                                                    disabled={anggota.status === 'Non-aktif'}
                                                    className="rounded"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{anggota.nama}</TableCell>
                                            <TableCell>{anggota.jabatan}</TableCell>
                                            <TableCell>{anggota.telepon}</TableCell>
                                            <TableCell>
                                                {anggota.status === 'Aktif' ? (
                                                    <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                                                ) : (
                                                    <Badge className="bg-gray-100 text-gray-800">Non-Aktif</Badge>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Form Pengumuman */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detail Pengumuman</CardTitle>
                            <CardDescription>Isi detail pengumuman yang akan dikirim</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="judul">Judul Pengumuman</Label>
                                    <Input
                                        id="judul"
                                        placeholder="Masukkan judul pengumuman"
                                        value={data.judul}
                                        onChange={(e) => setData({ ...data, judul: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="tanggal">Tanggal Kegiatan</Label>
                                        <Input
                                            id="tanggal"
                                            type="date"
                                            value={data.tanggal}
                                            onChange={(e) => setData({ ...data, tanggal: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="waktu">Waktu Kegiatan</Label>
                                        <Input
                                            id="waktu"
                                            type="time"
                                            value={data.waktu}
                                            onChange={(e) => setData({ ...data, waktu: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lokasi">Lokasi</Label>
                                    <Input
                                        id="lokasi"
                                        placeholder="Lokasi kegiatan"
                                        value={data.lokasi}
                                        onChange={(e) => setData({ ...data, lokasi: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="isi">Isi Pengumuman</Label>
                                    <Textarea
                                        id="isi"
                                        placeholder="Tulis isi pengumuman yang akan dikirim..."
                                        rows={6}
                                        value={data.isi}
                                        onChange={(e) => setData({ ...data, isi: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="dikirim_wa"
                                        checked={data.dikirim_wa}
                                        onChange={(e) => setData({ ...data, dikirim_wa: e.target.checked })}
                                        className="rounded"
                                    />
                                    <Label htmlFor="dikirim_wa">Kirim via WhatsApp</Label>
                                </div>

                                {/* Preview Penerima */}
                                {selectedAnggota.length > 0 && (
                                    <div className="rounded-lg bg-blue-50 p-4">
                                        <h4 className="mb-2 font-medium">Penerima Pengumuman:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {anggotaList
                                                .filter((a) => selectedAnggota.includes(a.id))
                                                .map((anggota) => (
                                                    <Badge key={anggota.id} variant="outline" className="border-blue-600 text-blue-600">
                                                        {anggota.nama}
                                                    </Badge>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {/* Preview Redaksi WhatsApp */}
                                {data.dikirim_wa && (data.judul || data.isi) && (
                                    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                        <h4 className="mb-3 flex items-center font-medium text-green-800">
                                            <Send className="mr-2 h-4 w-4" />
                                            Preview Pesan WhatsApp
                                        </h4>
                                        <div className="rounded-lg border border-green-300 bg-white p-4 font-mono text-sm">
                                            <div className="whitespace-pre-wrap">
                                                {`🔔 *PENGUMUMAN KARANG TARUNA CAKRA WIJAYA*

${data.judul ? `📢 *${data.judul.toUpperCase()}*` : '📢 *[JUDUL PENGUMUMAN]*'}

${data.isi || '[Isi pengumuman akan muncul di sini...]'}

${data.tanggal || data.lokasi ? `\n📅 *Detail Kegiatan:*` : ''}${data.tanggal ? `\n• Tanggal: ${new Date(data.tanggal).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` : ''}${data.waktu ? `\n• Waktu: ${data.waktu}` : ''}${data.lokasi ? `\n• Lokasi: ${data.lokasi}` : ''}

---
Terima kasih atas perhatiannya.

_Karang Taruna Cakra Wijaya_
_Kelurahan Cakra Wijaya_`}
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs text-green-600">
                                            ✓ Pesan ini akan dikirim ke {selectedAnggota.length} anggota yang dipilih
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-2 pt-4">
                                    <Button variant="outline" onClick={() => setCurrentView('list')} className="flex-1">
                                        Batal
                                    </Button>
                                    <Button
                                        className="flex-1 bg-rose-600 hover:bg-rose-700"
                                        onClick={handleSubmit}
                                        disabled={selectedAnggota.length === 0 || !data.judul || !data.isi}
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        Kirim Pengumuman ({selectedAnggota.length} penerima)
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
            {/* Dialog Detail Pengumuman */}
            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Detail Pengumuman</DialogTitle>
                        <DialogDescription>Informasi lengkap tentang pengumuman</DialogDescription>
                    </DialogHeader>
                    {selectedPengumuman && (
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label className="font-semibold">Judul</Label>
                                <p>{selectedPengumuman.judul}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Tanggal</Label>
                                    <p className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {selectedPengumuman.tanggal}
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Lokasi</Label>
                                    <p className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        {selectedPengumuman.lokasi}
                                    </p>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label className="font-semibold">Pembuat</Label>
                                <p className="flex items-center">
                                    <User className="mr-2 h-4 w-4" />
                                    {selectedPengumuman.pembuat.nama}
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label className="font-semibold">Penerima</Label>
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(selectedPengumuman.penerima) && selectedPengumuman.penerima.length > 0 ? (
                                        selectedPengumuman.penerima.map((penerima: any) => (
                                            <Badge key={penerima.id} variant="outline" className="border-blue-600 text-blue-600">
                                                {getNamaAnggota(penerima.id)}
                                            </Badge>
                                        ))
                                    ) : (
                                        <Badge variant="secondary">Tidak ada penerima</Badge>
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label className="font-semibold">Status WhatsApp</Label>
                                {selectedPengumuman.penerima ? (
                                    <Badge className="w-fit bg-green-100 text-green-800">Terkirim ke {selectedPengumuman.penerima.length} anggota</Badge>
                                ) : (
                                    <Badge variant="secondary" className="w-fit">
                                        Belum dikirim
                                    </Badge>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label className="font-semibold">Isi Pengumuman</Label>
                                <div className="rounded-md bg-gray-50 p-3">
                                    <p className="text-sm">{selectedPengumuman.isi}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
};

export default Pengumuman;
