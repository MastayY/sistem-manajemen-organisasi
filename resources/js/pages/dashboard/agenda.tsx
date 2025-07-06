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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Calendar, Clock, Edit, Eye, MapPin, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Agenda',
        href: '/agenda',
    },
];

const Agenda = ({ kegiatan }: any) => {
    const [selectedAgenda, setSelectedAgenda] = useState<any>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [agendaData, setAgendaData] = useState(kegiatan);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingAgenda, setEditingAgenda] = useState<{
        id_kegiatan: string;
        nama_kegiatan: string;
        tanggal: string;
        waktu: string;
        lokasi: string;
        status: string;
    } | null>(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        nama_kegiatan: '',
        tanggal: '',
        waktu: '',
        lokasi: '',
        status: 'Perencanaan',
        image: null as File | null,
    });

    const {
        data: editData,
        setData: setEditData,
        put,
        processing: editProcessing,
        errors: editErrors,
        reset: resetEdit,
    } = useForm({
        id_kegiatan: '',
        nama_kegiatan: '',
        tanggal: '',
        waktu: '',
        lokasi: '',
        status: '',
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post('/dashboard/agenda', {
            onSuccess: () => {
                reset();
                setIsCreateOpen(false);
                router.visit('/dashboard/agenda');
            },
            onError: (errors: any) => {
                console.error('Error creating agenda:', errors);
            },
        });
    };

    const handleDelete = (id: any) => {
        router.delete(`/dashboard/agenda/${id}`);
    };

    const handleEditAgenda = (agenda: any) => {
        setEditingAgenda(agenda);
        setIsEditOpen(true);
    };

    const handleUpdateAgenda = (e: any) => {
        e.preventDefault();
        console.log('Submitting data:', editData); // Add this line
        put(`/dashboard/agenda/${editData?.id_kegiatan}`, {
            method: 'put',
            onSuccess: () => {
                setIsEditOpen(false);
                resetEdit();
                router.visit('/dashboard/agenda');
            },
            onError: (errors: any) => {
                console.error('Error updating agenda:', errors);
            },
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Perencanaan':
                return <Badge className="bg-blue-100 text-blue-800">Akan Datang</Badge>;
            case 'Selesai':
                return <Badge className="bg-green-100 text-green-800">Selesai</Badge>;
            case 'Dibatalkan':
                return <Badge className="bg-red-100 text-red-800">Dibatalkan</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const handleViewDetail = (agenda: any) => {
        setSelectedAgenda(agenda);
        setIsDetailOpen(true);
    };

    useEffect(() => {
        if (editingAgenda) {
            console.log('Raw editingAgenda:', editingAgenda); // Add this
            setEditData({
                id_kegiatan: editingAgenda.id_kegiatan,
                nama_kegiatan: editingAgenda.nama_kegiatan,
                tanggal: editingAgenda.tanggal,
                waktu: editingAgenda.waktu,
                lokasi: editingAgenda.lokasi,
                status: editingAgenda.status,
            });

            console.log('Editing Agenda Data:', editData);
            console.log('Editing Agenda:', editingAgenda);
        }
    }, [editingAgenda]);

    useEffect(() => {
        console.log('editData terbaru:', editData);
    }, [editData]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* Header dengan statistik */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Agenda</CardTitle>
                            <Calendar className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{agendaData.length}</div>
                            {/* +num agenda dari bulan lalu */}
                            <p className="text-muted-foreground text-xs">
                                {agendaData.filter((a: any) => new Date(a.tanggal) > new Date(new Date().setMonth(new Date().getMonth() - 1))).length}{' '}
                                agenda baru bulan ini
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Agenda Mendatang</CardTitle>
                            <Clock className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{agendaData.filter((a: any) => a.status === 'Perencanaan').length}</div>
                            <p className="text-muted-foreground text-xs">Dalam 30 hari ke depan</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabel Agenda */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Daftar Agenda</CardTitle>
                                <CardDescription>Kelola semua agenda kegiatan Karang Taruna</CardDescription>
                            </div>
                            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-rose-600 hover:bg-rose-700">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Agenda
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Tambah Agenda Baru</DialogTitle>
                                        <DialogDescription>Buat agenda kegiatan baru untuk organisasi</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="nama">Nama Agenda</Label>
                                            <Input
                                                id="nama"
                                                value={data.nama_kegiatan}
                                                onChange={(e) => setData('nama_kegiatan', e.target.value)}
                                                placeholder="Masukkan nama agenda"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="tanggal">Tanggal</Label>
                                                <Input
                                                    id="tanggal"
                                                    value={data.tanggal}
                                                    onChange={(e) => setData('tanggal', e.target.value)}
                                                    type="date"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="waktu">Waktu</Label>
                                                <Input id="waktu" value={data.waktu} onChange={(e) => setData('waktu', e.target.value)} type="time" />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="lokasi">Lokasi</Label>
                                            <Input
                                                id="lokasi"
                                                value={data.lokasi}
                                                onChange={(e) => setData('lokasi', e.target.value)}
                                                placeholder="Masukkan lokasi kegiatan"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="status">Status</Label>
                                            <select
                                                id="status"
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="w-full rounded border p-2"
                                            >
                                                <option value="Perencanaan">Perencanaan</option>
                                                <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                                                <option value="Selesai">Selesai</option>
                                                <option value="Dibatalkan">Dibatalkan</option>
                                            </select>
                                        </div>
                                        {/* image input with preview */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="image">Gambar Agenda</Label>
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        setData('image', e.target.files[0]);
                                                    }
                                                }}
                                            />
                                            {data.image && (
                                                <img
                                                    src={URL.createObjectURL(data.image)}
                                                    alt="Preview"
                                                    className="mt-2 h-32 w-full rounded object-cover"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleSubmit} disabled={processing} className="bg-rose-600 hover:bg-rose-700">
                                            Simpan Agenda
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
                                    <TableHead>Gambar</TableHead>
                                    <TableHead>Nama Agenda</TableHead>
                                    <TableHead>Tanggal & Waktu</TableHead>
                                    <TableHead>Lokasi</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agendaData.map((agenda: any) => (
                                    <TableRow key={agenda.id}>
                                        <TableCell>
                                            {agenda.image ? (
                                                <img
                                                    src={'/storage/' + agenda.image}
                                                    alt={agenda.nama_kegiatan}
                                                    className="h-30 w-30 rounded object-contain"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded bg-gray-200"></div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{agenda.nama_kegiatan}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{agenda.tanggal}</span>
                                                <span className="text-muted-foreground text-sm">{agenda.waktu}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <MapPin className="mr-1 h-3 w-3" />
                                                {agenda.lokasi}
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(agenda.status)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => handleViewDetail(agenda)}>
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleEditAgenda(agenda)}>
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
                                                            <AlertDialogTitle>Hapus Agenda?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Apakah kamu yakin ingin menghapus agenda <strong>{agenda.nama}</strong>? Tindakan ini
                                                                tidak bisa dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction className='bg-red-600 hover:bg-red-700 text-white' onClick={() => handleDelete(agenda.id_kegiatan)}>
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

                {/* Dialog Detail Agenda */}
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Detail Agenda</DialogTitle>
                            <DialogDescription>Informasi lengkap tentang agenda kegiatan</DialogDescription>
                        </DialogHeader>
                        {selectedAgenda && (
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Gambar</Label>
                                    {selectedAgenda.image ? (
                                        <img
                                            src={'/storage/' + selectedAgenda.image}
                                            alt={selectedAgenda.nama_kegiatan}
                                            className="h-32 w-full rounded object-cover"
                                        />
                                    ) : (
                                        <div className="h-32 w-full rounded bg-gray-200"></div>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Nama Agenda</Label>
                                    <p>{selectedAgenda.nama_kegiatan}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Tanggal</Label>
                                        <p className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {selectedAgenda.tanggal}
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Waktu</Label>
                                        <p className="flex items-center">
                                            <Clock className="mr-2 h-4 w-4" />
                                            {selectedAgenda.waktu}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Lokasi</Label>
                                    <p className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        {selectedAgenda.lokasi}
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Status</Label>
                                    {getStatusBadge(selectedAgenda.status)}
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                                Tutup
                            </Button>
                            <Button className="bg-rose-600 hover:bg-rose-700">Edit Agenda</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* DIalog edit */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Agenda</DialogTitle>
                            <DialogDescription>Ubah data agenda kegiatan</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-nama">Nama Agenda</Label>
                                <Input
                                    id="edit-nama"
                                    name="nama_kegiatan"
                                    value={editData.nama_kegiatan}
                                    onChange={(e) => setEditData('nama_kegiatan', e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-mulai">Tanggal</Label>
                                    <Input
                                        id="edit-mulai"
                                        name="tanggal"
                                        type="date"
                                        value={editData.tanggal}
                                        onChange={(e) => setEditData('tanggal', e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-waktu">Waktu</Label>
                                    <Input
                                        id="edit-waktu"
                                        name="waktu"
                                        type="time"
                                        value={editData.waktu}
                                        onChange={(e) => setEditData('waktu', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-lokasi">Lokasi</Label>
                                <Input
                                    id="edit-lokasi"
                                    name="lokasi"
                                    value={editData.lokasi}
                                    onChange={(e) => setEditData('lokasi', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-status">Status</Label>
                                <select
                                    id="edit-status"
                                    name="status"
                                    value={editData.status}
                                    onChange={(e) => setEditData('status', e.target.value)}
                                    className="w-full rounded-md border p-2"
                                >
                                    <option value="Perencanaan">Perencanaan</option>
                                    <option value="Berlangsung">Berlangsung</option>
                                    <option value="Selesai">Selesai</option>
                                </select>
                            </div>
                            {/* <div className="grid gap-2">
                                <Label htmlFor="edit-image">Gambar Agenda</Label>
                                <Input
                                    id="edit-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setEditData('image', e.target.files[0]);
                                        }
                                    }}
                                />
                                {editData.image && (
                                    <img
                                        src={typeof editData.image === 'string' ? '/storage/' + editData.image : URL.createObjectURL(editData.image)}
                                        alt="Preview"
                                        className="mt-2 h-32 w-full rounded object-cover"
                                    />
                                )}
                            </div> */}
                        </div>
                        <DialogFooter>
                            <Button onClick={handleUpdateAgenda} disabled={editProcessing} className="bg-rose-600 hover:bg-rose-700">
                                Simpan Perubahan
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
};

export default Agenda;
