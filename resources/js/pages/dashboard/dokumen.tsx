import { DokumenPreview } from '@/components/fragments/DokumenPreview';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Calendar, Download, Edit, Eye, FileDown, FileText, Plus, Trash2, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface KeluargaBerduka {
    id: number;
    nama: string;
    hubungan: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Dokumen',
        href: '/dashboard/dokumen',
    },
];

const Dokumen = ({ dokumenData }: any) => {
    const [currentView, setCurrentView] = useState<'list' | 'form'>('list');
    const [selectedJenis, setSelectedJenis] = useState<string>('');
    const [selectedDokumen, setSelectedDokumen] = useState<any>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingDokumen, setEditingDokumen] = useState<any>(null);
    const [showPreview, setShowPreview] = useState(false);

    // Form data untuk notulensi
    const [notulensiData, setNotulensiData] = useState({
        judul: '',
        tanggal: '',
        waktu: '',
        tempat: '',
        pimpinan_rapat: '',
        notulis: '',
        peserta: '',
        agenda: '',
        pembahasan: '',
        keputusan: '',
        tindak_lanjut: '',
    });

    // Form data untuk lelayu
    const [lelayuData, setLelayuData] = useState({
        nama_almarhum: '',
        usia: '',
        alamat: '',
        hari_meninggal: '',
        tanggal_meninggal: '',
        waktu_meninggal: '',
        tempat_meninggal: '',
        hari_pemakaman: '',
        tanggal_pemakaman: '',
        waktu_pemakaman: '',
        tempat_pemakaman: '',
        lokasi_berita: '',
        tanggal_berita: '',
        gelar: '',
    });

    const [keluargaBerduka, setKeluargaBerduka] = useState<KeluargaBerduka[]>([]);
    const [newKeluarga, setNewKeluarga] = useState({ nama: '', hubungan: '' });
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({});

    const getJenisBadge = (jenis: string) => {
        switch (jenis) {
            case 'notulensi':
                return <Badge className="bg-blue-100 text-blue-800">Notulensi</Badge>;
            case 'lelayu':
                return <Badge className="bg-purple-100 text-purple-800">Lelayu</Badge>;
            case 'lainnya':
                return <Badge className="bg-gray-100 text-gray-800">Lainnya</Badge>;
            default:
                return <Badge variant="secondary">{jenis}</Badge>;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'selesai':
                return <Badge className="bg-green-100 text-green-800">Selesai</Badge>;
            case 'draft':
                return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const handleViewDetail = (dokumen: any) => {
        setSelectedDokumen(dokumen);
        setIsDetailOpen(true);
    };

    const handleDownload = (dokumen: any) => {
        window.open(`/dashboard/dokumen/${dokumen.id_dokumen}/download`, '_blank');
    };

    const handleTambahDokumen = () => {
        setCurrentView('form');
        setSelectedJenis('');
    };

    const handleJenisChange = (jenis: string, editData?: any) => {
        setSelectedJenis(jenis);

        if (editData) {
            // Mode edit - populate form dengan data existing
            if (jenis === 'notulensi') {
                setData({
                    judul: editData.judul || '',
                    tanggal: editData.tanggal || '',
                    waktu: editData.waktu || '',
                    tempat: editData.tempat || '',
                    pimpinan_rapat: editData.pimpinan_rapat || '',
                    notulis: editData.notulis || '',
                    peserta: editData.peserta || '',
                    agenda: editData.agenda || '',
                    pembahasan: editData.pembahasan || '',
                    keputusan: editData.keputusan || '',
                    tindak_lanjut: editData.tindak_lanjut || '',
                });
            } else if (jenis === 'lelayu') {
                setData({
                    nama_almarhum: editData.nama_almarhum || '',
                    usia: editData.usia || '',
                    alamat: editData.alamat || '',
                    hari_meninggal: editData.hari_meninggal || '',
                    tanggal_meninggal: editData.tanggal_meninggal || '',
                    waktu_meninggal: editData.waktu_meninggal || '',
                    tempat_meninggal: editData.tempat_meninggal || '',
                    hari_pemakaman: editData.hari_pemakaman || '',
                    tanggal_pemakaman: editData.tanggal_pemakaman || '',
                    waktu_pemakaman: editData.waktu_pemakaman || '',
                    tempat_pemakaman: editData.tempat_pemakaman || '',
                    lokasi_berita: editData.lokasi_berita || '',
                    tanggal_berita: editData.tanggal_berita || '',
                    gelar: editData.gelar || '',
                });
            }
        } else {
            // Mode create - reset form
            setData({
                judul: '',
                tanggal: '',
                waktu: '',
                tempat: '',
                pimpinan_rapat: '',
                notulis: '',
                peserta: '',
                agenda: '',
                pembahasan: '',
                keputusan: '',
                tindak_lanjut: '',
            });
            setData({
                nama_almarhum: '',
                usia: '',
                alamat: '',
                hari_meninggal: '',
                tanggal_meninggal: '',
                waktu_meninggal: '',
                tempat_meninggal: '',
                hari_pemakaman: '',
                tanggal_pemakaman: '',
                waktu_pemakaman: '',
                tempat_pemakaman: '',
                lokasi_berita: '',
                tanggal_berita: '',
                gelar: '',
            });
            setKeluargaBerduka([]);
        }
    };

    const handleTambahKeluarga = () => {
        if (newKeluarga.nama && newKeluarga.hubungan) {
            setKeluargaBerduka([
                ...keluargaBerduka,
                {
                    id: Date.now(),
                    nama: newKeluarga.nama,
                    hubungan: newKeluarga.hubungan,
                },
            ]);
            setNewKeluarga({ nama: '', hubungan: '' });
        }
    };

    const handleHapusKeluarga = (id: number) => {
        setKeluargaBerduka(keluargaBerduka.filter((k) => k.id !== id));
    };

    const handleEditDokumen = (dokumen: any) => {
        setIsEditMode(true);
        setEditingDokumen(dokumen);
        setCurrentView('form');

        setKeluargaBerduka([]);

        const editData = getEditData(dokumen);

        setData({
            ...editData,
            jenis: dokumen.jenis,
        });

        // Langsung set keluarga berduka di form, bukan di useEffect
        if (dokumen.jenis === 'lelayu' && dokumen.keluarga_berduka) {
            dokumen.keluarga_berduka.forEach((k) => {
                setKeluargaBerduka((prev) => {
                    // Cek apakah keluarga sudah ada
                    if (!prev.some((item) => item.id === k.id)) {
                        return [...prev, { id: k.id, nama: k.nama, hubungan: k.hubungan }];
                    }
                    return prev;
                });
            });

            console.log('Keluarga berduka:', keluargaBerduka);

            setData({
                ...editData,
                jenis: dokumen.jenis,
                keluarga_berduka: keluargaBerduka,
            });
        } else {
            setKeluargaBerduka([]);
            setData({
                ...editData,
                jenis: dokumen.jenis,
                keluarga_berduka: [],
            });
        }

        handleJenisChange(dokumen.jenis, editData);
    };

    const getEditData = (dokumen: any) => {
        if (dokumen.jenis === 'notulensi') {
            return {
                judul: dokumen.judul,
                tanggal: dokumen.tanggal,
                waktu: dokumen.waktu,
                tempat: dokumen.tempat,
                pimpinan_rapat: dokumen.pimpinan_rapat,
                notulis: dokumen.notulis,
                peserta: dokumen.peserta,
                agenda: dokumen.agenda,
                pembahasan: dokumen.pembahasan,
                keputusan: dokumen.keputusan,
                tindak_lanjut: dokumen.tindak_lanjut,
            };
        } else if (dokumen.jenis === 'lelayu') {
            return {
                nama_almarhum: dokumen.nama_almarhum,
                usia: dokumen.usia,
                alamat: dokumen.alamat,
                hari_meninggal: dokumen.hari_meninggal,
                tanggal_meninggal: dokumen.tanggal_meninggal,
                waktu_meninggal: dokumen.waktu_meninggal,
                tempat_meninggal: dokumen.tempat_meninggal,
                hari_pemakaman: dokumen.hari_pemakaman,
                tanggal_pemakaman: dokumen.tanggal_pemakaman,
                waktu_pemakaman: dokumen.waktu_pemakaman,
                tempat_pemakaman: dokumen.tempat_pemakaman,
                lokasi_berita: dokumen.lokasi_berita,
                tanggal_berita: dokumen.tanggal_berita,
                gelar: dokumen.gelar || '',
            };
        }
        return {};
    };

    const handleSimpanDokumen = () => {
        console.log('Data yang akan disimpan:', data);

        if (isEditMode && editingDokumen) {
            put(`/dashboard/dokumen/${editingDokumen.id_dokumen}`, {
                onSuccess: () => {
                    toast.success('Artikel berhasil diupdate!');
                    setCurrentView('list');
                    resetForm();
                },
                onError: () => {
                    toast.error('Gagal mengupdate dokumen');
                    console.error('Error updating dokumen:', errors);
                },
            });
        } else {
            post(`/dashboard/dokumen`, {
                onSuccess: () => {
                    toast.success('Dokumen berhasil disimpan!');
                    setCurrentView('list');
                    resetForm();
                },
                onError: (errors) => {
                    toast.error('Gagal menyimpan dokumen');
                    console.error('Error saving dokumen:', errors);
                },
            });
        }
    };

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            jenis: selectedJenis,
        }));
    }, [selectedJenis]);

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            keluarga_berduka: keluargaBerduka,
        }));
    }, [keluargaBerduka]);

    const handleDeleteDokumen = (dokumenId: number) => {
        destroy(`/dashboard/dokumen/${dokumenId}`, {
            onSuccess: () => {
                toast.success('Dokumen berhasil dihapus');
            },
        });
    };

    const resetForm = () => {
        setCurrentView('list');
        setSelectedJenis('');
        setIsEditMode(false);
        setEditingDokumen(null);
        reset();
    };

    const handlePreview = () => {
        setShowPreview(true);
    };

    const handleBackFromPreview = () => {
        setShowPreview(false);
    };

    const handleEditFromPreview = () => {
        setShowPreview(false);
    };

    const handleSaveFromPreview = () => {
        handleSimpanDokumen();
        setShowPreview(false);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {currentView === 'list' ? (
                    <>
                        {/* Header dengan statistik */}
                        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Dokumen</CardTitle>
                                    <FileText className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{dokumenData.length}</div>
                                    <p className="text-muted-foreground text-xs">+2 dari bulan lalu</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Notulensi</CardTitle>
                                    <FileText className="h-4 w-4 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{dokumenData.filter((d) => d.jenis === 'notulensi').length}</div>
                                    <p className="text-muted-foreground text-xs">Dokumen rapat</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Berita Lelayu</CardTitle>
                                    <FileText className="h-4 w-4 text-purple-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{dokumenData.filter((d) => d.jenis === 'lelayu').length}</div>
                                    <p className="text-muted-foreground text-xs">Dokumen duka cita</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Dokumen Selesai</CardTitle>
                                    <Download className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{dokumenData.filter((d) => d.status === 'selesai').length}</div>
                                    <p className="text-muted-foreground text-xs">Siap diunduh</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Tabel Dokumen */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Daftar Dokumen</CardTitle>
                                        <CardDescription>Kelola semua dokumen organisasi</CardDescription>
                                    </div>
                                    <Button className="bg-rose-600 hover:bg-rose-700" onClick={handleTambahDokumen}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Dokumen
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nama Dokumen</TableHead>
                                            <TableHead>Jenis</TableHead>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead>Pembuat</TableHead>
                                            <TableHead>Format</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {dokumenData.map((dokumen) => (
                                            <TableRow key={dokumen.id}>
                                                <TableCell className="font-medium">
                                                    <div>
                                                        <div className="max-w-xs truncate">
                                                            {dokumen.jenis === 'notulensi'
                                                                ? `Notulensi ${dokumen?.judul}`
                                                                : `Lelayu ${dokumen?.nama_almarhum}`}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{getJenisBadge(dokumen.jenis)}</TableCell>
                                                <TableCell>{dokumen.tanggal || dokumen.tanggal_berita}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <User className="mr-1 h-3 w-3" />
                                                        {dokumen.pembuat.nama}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{dokumen.format}</Badge>
                                                </TableCell>
                                                <TableCell>{getStatusBadge(dokumen.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => handleViewDetail(dokumen)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        {dokumen.status === 'selesai' && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-green-600"
                                                                onClick={() => handleDownload(dokumen)}
                                                            >
                                                                <Download className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        <Button variant="ghost" size="sm" onClick={() => handleEditDokumen(dokumen)}>
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
                                                                    <AlertDialogTitle>Hapus Dokumen</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Apakah kamu yakin ingin menghapus dokumen{' '}
                                                                        <strong>
                                                                            {dokumen.jenis === 'notulensi'
                                                                                ? `Notulensi ${dokumen?.judul}`
                                                                                : `Lelayu ${dokumen?.nama_almarhum}`}
                                                                        </strong>
                                                                        ? Tindakan ini tidak dapat dibatalkan.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDeleteDokumen(dokumen.id_dokumen)}>
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
                ) : (
                    <>
                        {/* Form Tambah Dokumen */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {isEditMode
                                        ? `Edit Dokumen: ${editingDokumen?.jenis === 'notulensi' ? `Notulensi ${editingDokumen?.judul}` : `Lelayu ${editingDokumen?.nama_almarhum}`}`
                                        : 'Buat Dokumen Baru'}
                                </h2>
                                <p className="text-muted-foreground">
                                    {isEditMode ? 'Perbarui informasi dokumen' : 'Pilih jenis dokumen dan isi formulir'}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setCurrentView('list');
                                    setIsEditMode(false);
                                    setEditingDokumen(null);
                                }}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Daftar
                            </Button>
                        </div>

                        {/* Pilih Jenis Dokumen */}
                        {currentView === 'form' && !showPreview && !selectedJenis && !isEditMode && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pilih Jenis Dokumen</CardTitle>
                                    <CardDescription>Pilih jenis dokumen yang akan dibuat</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <Card
                                            className="cursor-pointer border-2 hover:border-blue-200 hover:bg-blue-50"
                                            onClick={() => handleJenisChange('notulensi')}
                                        >
                                            <CardContent className="p-6 text-center">
                                                <FileText className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                                                <h3 className="font-semibold text-blue-800">Notulensi</h3>
                                                <p className="text-muted-foreground mt-2 text-sm">Dokumen hasil rapat atau pertemuan</p>
                                                <Badge className="mt-3 bg-blue-100 text-blue-800">Format: DOCX</Badge>
                                            </CardContent>
                                        </Card>
                                        <Card
                                            className="cursor-pointer border-2 hover:border-purple-200 hover:bg-purple-50"
                                            onClick={() => handleJenisChange('lelayu')}
                                        >
                                            <CardContent className="p-6 text-center">
                                                <FileText className="mx-auto mb-4 h-12 w-12 text-purple-600" />
                                                <h3 className="font-semibold text-purple-800">Berita Lelayu</h3>
                                                <p className="text-muted-foreground mt-2 text-sm">Dokumen berita duka cita</p>
                                                <Badge className="mt-3 bg-purple-100 text-purple-800">Format: PDF</Badge>
                                            </CardContent>
                                        </Card>
                                        <Card
                                            className="cursor-pointer border-2 hover:border-gray-200 hover:bg-gray-50"
                                            onClick={() => handleJenisChange('lainnya')}
                                        >
                                            <CardContent className="p-6 text-center">
                                                <FileText className="mx-auto mb-4 h-12 w-12 text-gray-600" />
                                                <h3 className="font-semibold text-gray-800">Lainnya</h3>
                                                <p className="text-muted-foreground mt-2 text-sm">Dokumen umum lainnya</p>
                                                <Badge className="mt-3 bg-gray-100 text-gray-800">Format: PDF</Badge>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Form Notulensi */}
                        {currentView === 'form' && !showPreview && selectedJenis === 'notulensi' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                        Form Notulensi Rapat
                                    </CardTitle>
                                    <CardDescription>Isi detail notulensi rapat yang akan dibuat</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="judul">Judul Rapat</Label>
                                            <Input
                                                id="judul"
                                                placeholder="Contoh: Rapat Koordinasi Bulanan Januari 2024"
                                                value={data.judul}
                                                onChange={(e) => setData({ ...data, judul: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="tanggal">Tanggal</Label>
                                                <Input
                                                    id="tanggal"
                                                    type="date"
                                                    value={data.tanggal}
                                                    onChange={(e) => setData({ ...data, tanggal: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="waktu">Waktu</Label>
                                                <Input
                                                    id="waktu"
                                                    type="time"
                                                    value={data.waktu}
                                                    onChange={(e) => setData({ ...data, waktu: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="tempat">Tempat</Label>
                                                <Input
                                                    id="tempat"
                                                    placeholder="Balai Desa"
                                                    value={data.tempat}
                                                    onChange={(e) => setData({ ...data, tempat: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="pimpinan_rapat">Pimpinan Rapat</Label>
                                                <Input
                                                    id="pimpinan_rapat"
                                                    placeholder="Nama pimpinan rapat"
                                                    value={data.pimpinan_rapat}
                                                    onChange={(e) => setData({ ...data, pimpinan_rapat: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="notulis">Notulis</Label>
                                                <Input
                                                    id="notulis"
                                                    placeholder="Nama notulis"
                                                    value={data.notulis}
                                                    onChange={(e) => setData({ ...data, notulis: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="peserta">Peserta Rapat</Label>
                                            <Textarea
                                                id="peserta"
                                                placeholder="Daftar peserta rapat (pisahkan dengan enter)"
                                                rows={3}
                                                value={data.peserta}
                                                onChange={(e) => setData({ ...data, peserta: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="agenda">Agenda Rapat</Label>
                                            <Textarea
                                                id="agenda"
                                                placeholder="Daftar agenda yang dibahas"
                                                rows={3}
                                                value={data.agenda}
                                                onChange={(e) => setData({ ...data, agenda: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="pembahasan">Pembahasan</Label>
                                            <Textarea
                                                id="pembahasan"
                                                placeholder="Detail pembahasan dalam rapat"
                                                rows={4}
                                                value={data.pembahasan}
                                                onChange={(e) => setData({ ...data, pembahasan: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="keputusan">Keputusan</Label>
                                            <Textarea
                                                id="keputusan"
                                                placeholder="Keputusan yang diambil dalam rapat"
                                                rows={3}
                                                value={data.keputusan}
                                                onChange={(e) => setData({ ...data, keputusan: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="tindak_lanjut">Tindak Lanjut</Label>
                                            <Textarea
                                                id="tindak_lanjut"
                                                placeholder="Tindak lanjut yang akan dilakukan"
                                                rows={3}
                                                value={data.tindak_lanjut}
                                                onChange={(e) => setData({ ...data, tindak_lanjut: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex gap-2 pt-4">
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setCurrentView('list');
                                                    setIsEditMode(false);
                                                    setEditingDokumen(null);
                                                }}
                                                className="flex-1"
                                            >
                                                Kembali
                                            </Button>
                                            <Button variant="outline" onClick={handlePreview} className="flex-1">
                                                <Eye className="mr-2 h-4 w-4" />
                                                Preview
                                            </Button>
                                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSimpanDokumen}>
                                                <FileDown className="mr-2 h-4 w-4" />
                                                {isEditMode ? 'Update Dokumen Word' : 'Generate Dokumen Word'}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Form Lelayu */}
                        {currentView === 'form' && !showPreview && selectedJenis === 'lelayu' && (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-purple-600" />
                                            Form Berita Lelayu
                                        </CardTitle>
                                        <CardDescription>Isi detail berita lelayu yang akan dibuat</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4">
                                            {/* Info Lokasi dan Tanggal Berita */}
                                            <div className="rounded-lg bg-purple-50 p-4">
                                                <h4 className="mb-3 font-medium">Informasi Berita</h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="lokasi_berita">Lokasi Berita</Label>
                                                        <Input
                                                            id="lokasi_berita"
                                                            placeholder="Contoh: Pajangan"
                                                            value={data.lokasi_berita}
                                                            onChange={(e) => setData({ ...data, lokasi_berita: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="tanggal_berita">Tanggal Berita</Label>
                                                        <Input
                                                            id="tanggal_berita"
                                                            type="date"
                                                            value={data.tanggal_berita}
                                                            onChange={(e) => setData({ ...data, tanggal_berita: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Info Almarhum */}
                                            <div className="rounded-lg bg-gray-50 p-4">
                                                <h4 className="mb-3 font-medium">Informasi Almarhum/Almarhumah</h4>
                                                <div className="grid gap-4">
                                                    {/* gelar almarhum/almarhumah */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="nama_almarhum">Nama Lengkap</Label>
                                                            <Input
                                                                id="nama_almarhum"
                                                                placeholder="Contoh: IBU YOHANA RUSINAH"
                                                                value={data.nama_almarhum}
                                                                onChange={(e) => setData({ ...data, nama_almarhum: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="gelar">Sebutan</Label>
                                                            <Select value={data.gelar} onValueChange={(value) => setData({ ...data, gelar: value })}>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Pilih Sebutan" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="ALM.">Almarhum</SelectItem>
                                                                    <SelectItem value="ALMH.">Almarhumah</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="usia">Usia</Label>
                                                            <Input
                                                                id="usia"
                                                                placeholder="78 tahun"
                                                                value={data.usia}
                                                                onChange={(e) => setData({ ...data, usia: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="alamat">Alamat</Label>
                                                            <Input
                                                                id="alamat"
                                                                placeholder="Jaten RT 01 Sendangsari Pajangan Bantul"
                                                                value={data.alamat}
                                                                onChange={(e) => setData({ ...data, alamat: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Info Meninggal Dunia */}
                                            <div className="rounded-lg bg-red-50 p-4">
                                                <h4 className="mb-3 font-medium">Detail Meninggal Dunia</h4>
                                                <div className="grid gap-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="hari_meninggal">Hari</Label>
                                                            <Input
                                                                id="hari_meninggal"
                                                                value={data.hari_meninggal}
                                                                readOnly
                                                                placeholder="Hari akan otomatis terisi"
                                                            />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="tanggal_meninggal">Tanggal</Label>
                                                            <Input
                                                                id="tanggal_meninggal"
                                                                type="date"
                                                                value={data.tanggal_meninggal}
                                                                onChange={(e) => {
                                                                    const tanggal = e.target.value;
                                                                    const hari = new Date(tanggal).toLocaleDateString('id-ID', { weekday: 'long' });
                                                                    setData({ ...data, tanggal_meninggal: tanggal, hari_meninggal: hari });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="waktu_meninggal">Waktu</Label>
                                                            <Input
                                                                id="waktu_meninggal"
                                                                type="time"
                                                                value={data.waktu_meninggal}
                                                                onChange={(e) => setData({ ...data, waktu_meninggal: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="tempat_meninggal">Tempat</Label>
                                                            <Input
                                                                id="tempat_meninggal"
                                                                placeholder="RS Panembahan Senopati"
                                                                value={data.tempat_meninggal}
                                                                onChange={(e) => setData({ ...data, tempat_meninggal: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Info Pemakaman */}
                                            <div className="rounded-lg bg-green-50 p-4">
                                                <h4 className="mb-3 font-medium">Detail Pemakaman</h4>
                                                <div className="grid gap-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="hari_pemakaman">Hari</Label>
                                                            <Input
                                                                id="hari_pemakaman"
                                                                value={data.hari_pemakaman}
                                                                readOnly
                                                                placeholder="Hari akan otomatis terisi"
                                                            />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="tanggal_pemakaman">Tanggal</Label>
                                                            <Input
                                                                id="tanggal_pemakaman"
                                                                type="date"
                                                                value={data.tanggal_pemakaman}
                                                                onChange={(e) => {
                                                                    const tanggal = e.target.value;
                                                                    const hari = new Date(tanggal).toLocaleDateString('id-ID', { weekday: 'long' });
                                                                    setData({ ...data, tanggal_pemakaman: tanggal, hari_pemakaman: hari });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="waktu_pemakaman">Waktu</Label>
                                                            <Input
                                                                id="waktu_pemakaman"
                                                                type="time"
                                                                placeholder="08:00"
                                                                value={data.waktu_pemakaman}
                                                                onChange={(e) => setData({ ...data, waktu_pemakaman: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="tempat_pemakaman">Tempat</Label>
                                                            <Input
                                                                id="tempat_pemakaman"
                                                                placeholder="Makam Jati Ngarang Jaten"
                                                                value={data.tempat_pemakaman}
                                                                onChange={(e) => setData({ ...data, tempat_pemakaman: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Keluarga yang Berduka */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Keluarga yang Berduka</CardTitle>
                                        <CardDescription>Tambahkan daftar keluarga yang berduka beserta hubungannya</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4">
                                            {/* Form Tambah Keluarga */}
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Nama keluarga"
                                                    value={newKeluarga.nama}
                                                    onChange={(e) => setNewKeluarga({ ...newKeluarga, nama: e.target.value })}
                                                    className="flex-1"
                                                />
                                                <Select
                                                    value={newKeluarga.hubungan}
                                                    onValueChange={(value) => setNewKeluarga({ ...newKeluarga, hubungan: value })}
                                                >
                                                    <SelectTrigger className="w-48">
                                                        <SelectValue placeholder="Hubungan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="anak/mantu">anak/mantu</SelectItem>
                                                        <SelectItem value="anak">anak</SelectItem>
                                                        <SelectItem value="mantu">mantu</SelectItem>
                                                        <SelectItem value="cucu">cucu</SelectItem>
                                                        <SelectItem value="buyut">buyut</SelectItem>
                                                        <SelectItem value="saudara">saudara</SelectItem>
                                                        <SelectItem value="keponakan">keponakan</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Button onClick={handleTambahKeluarga} disabled={!newKeluarga.nama || !newKeluarga.hubungan}>
                                                    <Plus className="h-4 w-4 text-white" />
                                                </Button>
                                            </div>

                                            {/* Daftar Keluarga */}
                                            {keluargaBerduka.length > 0 && (
                                                <div className="rounded-lg border">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>No</TableHead>
                                                                <TableHead>Nama</TableHead>
                                                                <TableHead>Hubungan</TableHead>
                                                                <TableHead className="w-12"></TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {keluargaBerduka.map((keluarga, index) => (
                                                                <TableRow key={keluarga.id}>
                                                                    <TableCell>{index + 1}</TableCell>
                                                                    <TableCell>{keluarga.nama}</TableCell>
                                                                    <TableCell>({keluarga.hubungan})</TableCell>
                                                                    <TableCell>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={() => handleHapusKeluarga(keluarga.id)}
                                                                            className="text-red-600"
                                                                        >
                                                                            <X className="h-4 w-4" />
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            )}

                                            <div className="flex gap-2 pt-4">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setCurrentView('list');
                                                        setIsEditMode(false);
                                                        setEditingDokumen(null);
                                                    }}
                                                    className="flex-1"
                                                >
                                                    Kembali
                                                </Button>
                                                <Button variant="outline" onClick={handlePreview} className="flex-1">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Preview
                                                </Button>
                                                <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={handleSimpanDokumen}>
                                                    <FileDown className="mr-2 h-4 w-4" />
                                                    {isEditMode ? 'Update Berita Lelayu PDF' : 'Generate Berita Lelayu PDF'}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {/* Form Lainnya */}
                        {currentView === 'form' && !showPreview && selectedJenis === 'lainnya' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-gray-600" />
                                        Form Dokumen Lainnya
                                    </CardTitle>
                                    <CardDescription>Buat dokumen umum lainnya</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="judul_lainnya">Judul Dokumen</Label>
                                            <Input id="judul_lainnya" placeholder="Masukkan judul dokumen" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="konten_lainnya">Konten Dokumen</Label>
                                            <Textarea id="konten_lainnya" placeholder="Tulis konten dokumen..." rows={10} />
                                        </div>
                                        <div className="flex gap-2 pt-4">
                                            <Button variant="outline" onClick={() => setSelectedJenis('')} className="flex-1">
                                                Kembali
                                            </Button>
                                            <Button className="flex-1 bg-gray-600 hover:bg-gray-700" onClick={handleSimpanDokumen}>
                                                <FileDown className="mr-2 h-4 w-4" />
                                                Generate Dokumen PDF
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </>
                )}

                {showPreview && (
                    <DokumenPreview
                        jenis={selectedJenis}
                        notulensiData={selectedJenis === 'notulensi' ? notulensiData : undefined}
                        lelayuData={selectedJenis === 'lelayu' ? lelayuData : undefined}
                        keluargaBerduka={selectedJenis === 'lelayu' ? keluargaBerduka : undefined}
                        isEditMode={isEditMode}
                        onBack={handleBackFromPreview}
                        onEdit={handleEditFromPreview}
                        onSave={handleSaveFromPreview}
                    />
                )}

                {/* Dialog Detail Dokumen */}
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Detail Dokumen</DialogTitle>
                            <DialogDescription>Informasi lengkap tentang dokumen</DialogDescription>
                        </DialogHeader>
                        {selectedDokumen && (
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Nama Dokumen</Label>
                                    <p>
                                        {selectedDokumen.jenis === 'notulensi'
                                            ? `Notulensi ${selectedDokumen?.judul}`
                                            : `Lelayu ${selectedDokumen?.nama_almarhum}`}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Jenis</Label>
                                        {getJenisBadge(selectedDokumen.jenis)}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Format</Label>
                                        <Badge variant="outline">{selectedDokumen.format}</Badge>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Tanggal</Label>
                                        <p className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {selectedDokumen.tanggal || selectedDokumen.tanggal_berita}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Pembuat</Label>
                                    <p className="flex items-center">
                                        <User className="mr-2 h-4 w-4" />
                                        {selectedDokumen.pembuat.nama}
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Status</Label>
                                    {getStatusBadge(selectedDokumen.status)}
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                                Tutup
                            </Button>
                            {selectedDokumen && selectedDokumen.status === 'selesai' && (
                                <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleDownload(selectedDokumen)}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Button>
                            )}
                            <Button
                                className="bg-rose-600 hover:bg-rose-700"
                                onClick={() => {
                                    setIsDetailOpen(false);
                                    handleEditDokumen(selectedDokumen);
                                }}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Dokumen
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
};

export default Dokumen;
