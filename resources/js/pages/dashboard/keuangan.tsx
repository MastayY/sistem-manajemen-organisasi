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
import { ArrowDownCircle, ArrowUpCircle, Calendar, DollarSign, Edit, Eye, Plus, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Keuangan',
        href: '/dashboard/keuangan',
    },
];

const Keuangan = ({ keuanganData }: any) => {
    const [selectedKeuangan, setSelectedKeuangan] = useState<any>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
        errors,
    } = useForm({
        tanggal: '',
        jenis: '',
        kategori: '',
        jumlah: 0,
        keterangan: '',
    });

    const getJenisBadge = (jenis: string) => {
        switch (jenis) {
            case 'pemasukan':
                return (
                    <Badge className="bg-green-100 text-green-800">
                        <ArrowUpCircle className="mr-1 h-3 w-3" />
                        Pemasukan
                    </Badge>
                );
            case 'pengeluaran':
                return (
                    <Badge className="bg-red-100 text-red-800">
                        <ArrowDownCircle className="mr-1 h-3 w-3" />
                        Pengeluaran
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{jenis}</Badge>;
        }
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dashboard.keuangan.store'), {
            onSuccess: () => {
                toast.success('Transaksi berhasil ditambahkan!');
                setIsCreateOpen(false);
                reset();
            },
            onError: (errors: any) => {
                console.error(errors);
            }
        });
    };

    const handleViewDetail = (keuangan: any) => {
        setSelectedKeuangan(keuangan);
        setIsDetailOpen(true);
    };

    const handleDelete = (id: number) => {
        destroy(route('dashboard.keuangan.destroy', id));
    };

    const handleEdit = (item: any) => {
        setData({
            tanggal: item.tanggal,
            jenis: item.jenis,
            kategori: item.kategori,
            jumlah: item.jumlah,
            keterangan: item.keterangan,
        });
        setSelectedKeuangan(item);
        setIsCreateOpen(true);
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('dashboard.keuangan.update', selectedKeuangan.id), {
            onSuccess: () => {
                toast.success('Transaksi berhasil diperbarui!');
                setIsCreateOpen(false);
                reset();
            },
            onError: (errors: any) => {
                console.error(errors);
            }
        });
    };

    const formatKategori = (kategori: string) => {
        switch (kategori) {
            case 'iuran-anggota':
                return 'Iuran Anggota';
            case 'donasi':
                return 'Donasi';
            case 'bantuan-pemerintah':
                return 'Bantuan Pemerintah';
            case 'konsumsi':
                return 'Konsumsi';
            case 'perlengkapan':
                return 'Perlengkapan';
            case 'transport':
                return 'Transport';
            case 'operasional':
                return 'Operasional';
            case 'lainnya':
                return 'Lainnya';
            default:
                return kategori;
        }
    }

    const formatRupiah = (amount: number) => {
        if (amount === null || amount === undefined || isNaN(amount)) {
            return 'Rp 0';
        }

        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const totalPemasukan = keuanganData?.filter((item: any) => item.jenis === 'pemasukan').reduce((sum: any, item: any) => sum + item.jumlah, 0);
    const totalPengeluaran = keuanganData?.filter((item: any) => item.jenis === 'pengeluaran').reduce((sum: any, item: any) => sum + item.jumlah, 0);
    const saldoKas = totalPemasukan - totalPengeluaran;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* Header dengan statistik */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Saldo Kas</CardTitle>
                            <DollarSign className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${saldoKas >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatRupiah(saldoKas)}</div>
                            <p className="text-muted-foreground text-xs">Saldo saat ini</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{formatRupiah(totalPemasukan)}</div>
                            <p className="text-muted-foreground text-xs">Bulan ini</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
                            <TrendingDown className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{formatRupiah(totalPengeluaran)}</div>
                            <p className="text-muted-foreground text-xs">Bulan ini</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Transaksi</CardTitle>
                            <Calendar className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{keuanganData?.length || '0'}</div>
                            <p className="text-muted-foreground text-xs">Total transaksi</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabel Keuangan */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Catatan Keuangan</CardTitle>
                                <CardDescription>Kelola semua transaksi keuangan organisasi</CardDescription>
                            </div>
                            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-rose-600 hover:bg-rose-700">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Transaksi
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>{selectedKeuangan ? 'Edit Transaksi' : 'Tambah Transaksi'}</DialogTitle>
                                        <DialogDescription>{selectedKeuangan ? 'Ubah detail transaksi keuangan' : 'Isi detail transaksi baru'}</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="tanggal">Tanggal</Label>
                                                <Input id="tanggal" type="date" value={data.tanggal} onChange={(e) => setData('tanggal', e.target.value)} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="jenis">Jenis Transaksi</Label>
                                                <Select value={data.jenis} onValueChange={(value) => setData('jenis', value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih jenis" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pemasukan">Pemasukan</SelectItem>
                                                        <SelectItem value="pengeluaran">Pengeluaran</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="kategori">Kategori</Label>
                                            <Select value={data.kategori} onValueChange={(value) => setData('kategori', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih kategori" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="iuran-anggota">Iuran Anggota</SelectItem>
                                                    <SelectItem value="donasi">Donasi</SelectItem>
                                                    <SelectItem value="bantuan-pemerintah">Bantuan Pemerintah</SelectItem>
                                                    <SelectItem value="konsumsi">Konsumsi</SelectItem>
                                                    <SelectItem value="perlengkapan">Perlengkapan</SelectItem>
                                                    <SelectItem value="transport">Transport</SelectItem>
                                                    <SelectItem value="operasional">Operasional</SelectItem>
                                                    <SelectItem value="lainnya">Lainnya</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="jumlah">Jumlah (Rp)</Label>
                                            <Input id="jumlah" type="number" placeholder="0" value={data.jumlah} onChange={(e) => setData('jumlah', parseFloat(e.target.value))} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="keterangan">Keterangan</Label>
                                            <Textarea id="keterangan" placeholder="Keterangan transaksi..." value={data.keterangan} onChange={(e) => setData('keterangan', e.target.value)} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" className="bg-rose-600 hover:bg-rose-700" onClick={selectedKeuangan ? handleUpdate : handleCreate}>
                                            {selectedKeuangan ? 'Update Transaksi' : 'Tambah Transaksi'}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Jenis</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Jumlah</TableHead>
                                    <TableHead>Penanggung Jawab</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {keuanganData?.map((item: any) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.tanggal}</TableCell>
                                        <TableCell>{getJenisBadge(item.jenis)}</TableCell>
                                        <TableCell>{formatKategori(item.kategori)}</TableCell>
                                        <TableCell className={item.jenis === 'pemasukan' ? 'font-medium text-green-600' : 'font-medium text-red-600'}>
                                            {item.jenis === 'pemasukan' ? '+' : '-'}
                                            {formatRupiah(item.jumlah)}
                                        </TableCell>
                                        <TableCell>{item.penanggung_jawab?.nama ?? '-'}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => handleViewDetail(item)}>
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
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
                                                            <AlertDialogTitle>Hapus Transaksi</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Apakah kamu yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(item.id)}>
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

                {/* Dialog Detail Keuangan */}
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Detail Transaksi</DialogTitle>
                            <DialogDescription>Informasi lengkap tentang transaksi keuangan</DialogDescription>
                        </DialogHeader>
                        {selectedKeuangan && (
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Tanggal</Label>
                                    <p className="flex items-center text-sm">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {selectedKeuangan.tanggal}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Jenis Transaksi</Label>
                                        {getJenisBadge(selectedKeuangan.jenis)}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Kategori</Label>
                                        <p>{formatKategori(selectedKeuangan.kategori)}</p>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Jumlah</Label>
                                    <p className={`text-lg font-bold ${selectedKeuangan.jenis === 'pemasukan' ? 'text-green-600' : 'text-red-600'}`}>
                                        {selectedKeuangan.jenis === 'pemasukan' ? '+' : '-'}
                                        {formatRupiah(selectedKeuangan.jumlah)}
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Penanggung Jawab</Label>
                                    <p>{selectedKeuangan.penanggung_jawab.nama}</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Keterangan</Label>
                                    <p className="text-muted-foreground text-sm">{selectedKeuangan.keterangan}</p>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                                Tutup
                            </Button>
                            <Button className="bg-rose-600 hover:bg-rose-700" onClick={handleEdit.bind(null, selectedKeuangan)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Transaksi
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
};

export default Keuangan;
