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
import { Head, router, useForm } from '@inertiajs/react';
import { AlertTriangle, Calendar, CheckCircle, Edit, Eye, Package, Plus, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Inventaris',
        href: '/dashboard/inventaris',
    },
];

const Inventaris = ({ inventarisData }: any) => {
    const [selectedInventaris, setSelectedInventaris] = useState<any>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        nama: '',
        kategori: '',
        jumlah: 1,
        kondisi: '',
        lokasi: '',
        tanggal_beli: '',
        harga: 0,
        keterangan: '',
    });

    const getKondisiBadge = (kondisi: string) => {
        switch (kondisi) {
            case 'baik':
                return (
                    <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Baik
                    </Badge>
                );
            case 'perlu_perbaikan':
                return (
                    <Badge className="bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Perlu Perbaikan
                    </Badge>
                );
            case 'rusak':
                return (
                    <Badge className="bg-red-100 text-red-800">
                        <XCircle className="mr-1 h-3 w-3" />
                        Rusak
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{kondisi}</Badge>;
        }
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dashboard.inventaris.store'), {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
            },
            onError: () => {
                console.error(errors);
            },
        });
    }

    const handleDelete = (id: number) => {
        destroy(route('dashboard.inventaris.destroy', id), {
            onSuccess: () => {
                reset();
            },
            onError: () => {
                console.error(errors);
            },
        });
    }

    const handleEdit = (item: any) => {
        setData(item); // populate form
        setIsCreateOpen(true); // buka modal yang sama
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('dashboard.inventaris.update', selectedInventaris.id), {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
            },
            onError: () => {
                console.error(errors);
            },
        });
    }


    const handleViewDetail = (inventaris: any) => {
        setSelectedInventaris(inventaris);
        setIsDetailOpen(true);
    };

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const totalNilai = inventarisData.reduce((sum: any, item: any) => sum + item.harga, 0);
    const itemBaik = inventarisData.filter((item: any) => item.kondisi === 'baik').length;
    const itemPerluPerbaikan = inventarisData.filter((item: any) => item.kondisi === 'perlu_perbaikan').length;
    const itemRusak = inventarisData.filter((item: any) => item.kondisi === 'rusak').length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* Header dengan statistik */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Item</CardTitle>
                            <Package className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{inventarisData.reduce((sum: any, item: any) => sum + item.jumlah, 0)}</div>
                            <p className="text-muted-foreground text-xs">{inventarisData.length} jenis barang</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kondisi Baik</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{itemBaik}</div>
                            <p className="text-muted-foreground text-xs">{Math.round((itemBaik / inventarisData.length) * 100)}% dari total</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Perlu Perbaikan</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{itemPerluPerbaikan}</div>
                            <p className="text-muted-foreground text-xs">Memerlukan perhatian</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Perlu Penggantian</CardTitle>
                            <XCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{itemRusak}</div>
                            <p className="text-muted-foreground text-xs">Perlu diganti</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabel Inventaris */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Daftar Inventaris</CardTitle>
                                <CardDescription>Kelola semua inventaris organisasi</CardDescription>
                            </div>
                            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-rose-600 hover:bg-rose-700">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Item
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>{selectedInventaris ? 'Edit Item Inventaris' : 'Tambah Item Inventaris'}</DialogTitle>
                                        <DialogDescription>{selectedInventaris ? 'Perbarui informasi item inventaris' : 'Isi detail item inventaris baru'}</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="nama">Nama Item</Label>
                                            <Input id="nama" placeholder="Masukkan nama item" value={data.nama} onChange={(e) => setData('nama', e.target.value)} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="kategori">Kategori</Label>
                                                <Select onValueChange={(value) => setData('kategori', value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih kategori" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="elektronik">Elektronik</SelectItem>
                                                        <SelectItem value="furniture">Furniture</SelectItem>
                                                        <SelectItem value="perlengkapan">Perlengkapan</SelectItem>
                                                        <SelectItem value="kendaraan">Kendaraan</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="jumlah">Jumlah</Label>
                                                <Input id="jumlah" type="number" placeholder="0" value={data.jumlah} onChange={(e) => setData('jumlah', parseInt(e.target.value, 10))} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="kondisi">Kondisi</Label>
                                                <Select onValueChange={(value) => setData('kondisi', value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih kondisi" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="baik">Baik</SelectItem>
                                                        <SelectItem value="perlu_perbaikan">Perlu Perbaikan</SelectItem>
                                                        <SelectItem value="rusak">Rusak</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="harga">Harga (Rp)</Label>
                                                <Input id="harga" type="number" placeholder="0" value={data.harga} onChange={(e) => setData('harga', parseInt(e.target.value, 10))} />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="lokasi">Lokasi</Label>
                                            <Input id="lokasi" placeholder="Lokasi penyimpanan" value={data.lokasi} onChange={(e) => setData('lokasi', e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="tanggal_beli">Tanggal Pembelian</Label>
                                            <Input id="tanggal_beli" type="date" value={data.tanggal_beli} onChange={(e) => setData('tanggal_beli', e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="keterangan">Keterangan</Label>
                                            <Textarea id="keterangan" placeholder="Keterangan tambahan..." value={data.keterangan} onChange={(e) => setData('keterangan', e.target.value)} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" className="bg-rose-600 hover:bg-rose-700" onClick={selectedInventaris ? handleUpdate : handleCreate} disabled={processing}>
                                            {selectedInventaris ? 'Perbarui Item' : 'Tambah Item'}
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
                                    <TableHead>Nama Item</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Jumlah</TableHead>
                                    <TableHead>Kondisi</TableHead>
                                    <TableHead>Lokasi</TableHead>
                                    <TableHead>Nilai</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inventarisData.map((item: any) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.nama}</TableCell>
                                        <TableCell>{item.kategori}</TableCell>
                                        <TableCell>{item.jumlah}</TableCell>
                                        <TableCell>{getKondisiBadge(item.kondisi)}</TableCell>
                                        <TableCell>{item.lokasi}</TableCell>
                                        <TableCell>{formatRupiah(item.harga)}</TableCell>
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
                                                            <AlertDialogTitle>Hapus Item</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Apakah kamu yakin ingin menghapus item "{item.nama}"? Tindakan ini tidak dapat dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction className='bg-red-600 hover:bg-red-700 text-white' onClick={() => handleDelete(item.id)}>
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

                {/* Dialog Detail Inventaris */}
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Detail Inventaris</DialogTitle>
                            <DialogDescription>Informasi lengkap tentang item inventaris</DialogDescription>
                        </DialogHeader>
                        {selectedInventaris && (
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Nama Item</Label>
                                    <p>{selectedInventaris.nama}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Kategori</Label>
                                        <p>{selectedInventaris.kategori}</p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Jumlah</Label>
                                        <p>{selectedInventaris.jumlah}</p>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Kondisi</Label>
                                    {getKondisiBadge(selectedInventaris.kondisi)}
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Lokasi</Label>
                                    <p>{selectedInventaris.lokasi}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Tanggal Pembelian</Label>
                                        <p className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {selectedInventaris.tanggal_beli}
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Nilai</Label>
                                        <p>{formatRupiah(selectedInventaris.harga)}</p>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Keterangan</Label>
                                    <p className="text-muted-foreground text-sm">{selectedInventaris.keterangan}</p>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                                Tutup
                            </Button>
                            <Button className="bg-rose-600 hover:bg-rose-700">Edit Item</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
};

export default Inventaris;
