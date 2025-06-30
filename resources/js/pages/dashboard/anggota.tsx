import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Crown, Edit, Eye, Mail, MapPin, Phone, Plus, Settings, Shield, Trash2, User, UserPlus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Anggota',
        href: '/dashboard/anggota',
    },
];

const seksiList = ['Kelistrikan', 'Bekakas', 'Perikanan', 'Kehutanan', 'Sinoman'];

const Anggota = ({ anggota, seksi, jabatan }: any) => {
    const [selectedAnggota, setSelectedAnggota] = useState<any>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [currentView, setCurrentView] = useState<'list' | 'structure'>('list');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingAnggota, setEditingAnggota] = useState<any>(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        nama: '',
        email: '',
        telepon: '',
        alamat: '',
        jenis_kelamin: '',
        id_jabatan: 0,
        id_seksi: 0,
    });

    const {
        data: editData,
        setData: setEditData,
        put,
        processing: editProcessing,
        errors: editErrors,
        reset: resetEdit,
    } = useForm({
        id: 0,
        nama: '',
        email: '',
        telepon: '',
        alamat: '',
        jenis_kelamin: '',
        id_jabatan: 0,
        id_seksi: 0,
        status: 'Aktif',
    });

    const getSeksiById = (id: number) => {
        const result = seksi.find((s: any) => s.id_seksi === id);
        return result ? result.nama_seksi : 'Tidak diketahui';
    };

    const getJabatanById = (id: number) => {
        const result = jabatan.find((j: any) => j.id_jabatan === id);
        return result ? result.nama_jabatan : 'Tidak diketahui';
    };

    // Organizational structure data based on actual members
    const getStrukturOrganisasi = () => {
        const struktur = {
            ketua: anggota.find((a: any) => getJabatanById(a.id_jabatan) === 'Ketua'),
            wakil_ketua: anggota.find((a: any) => getJabatanById(a.id_jabatan) === 'Wakil Ketua'),
            sekretaris_1: anggota.find((a: any) => getJabatanById(a.id_jabatan) === 'Sekretaris I'),
            sekretaris_2: anggota.find((a: any) => getJabatanById(a.id_jabatan) === 'Sekretaris II'),
            bendahara_1: anggota.find((a: any) => getJabatanById(a.id_jabatan) === 'Bendahara I'),
            bendahara_2: anggota.find((a: any) => getJabatanById(a.id_jabatan) === 'Bendahara II'),
            seksi: seksi.map((s: any) => {
                const koordinator = anggota.find(
                    (a: any) =>
                        getJabatanById(a.id_jabatan) === 'Koordinator Seksi' && a.id_seksi !== null && getSeksiById(a.id_seksi) === s.nama_seksi,
                );
                const ang = anggota.filter(
                    (a: any) => getJabatanById(a.id_jabatan) === 'Anggota Seksi' && a.id_seksi !== null && getSeksiById(a.id_seksi) === s.nama_seksi,
                );
                return {
                    nama_seksi: s.nama_seksi,
                    koordinator: koordinator,
                    anggota: ang,
                };
            }),
        };
        console.log('Struktur Organisasi:', struktur);
        return struktur;
    };

    const getGenderBadge = (jenis_kelamin: string) => {
        switch (jenis_kelamin.toLowerCase()) {
            case 'laki-laki':
                return <Badge className="bg-blue-100 text-xs text-blue-800">L</Badge>;
            case 'perempuan':
                return <Badge className="bg-pink-100 text-xs text-pink-800">P</Badge>;
            default:
                return <Badge variant="secondary">?</Badge>;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'aktif':
                return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
            case 'non-aktif':
                return <Badge className="bg-red-100 text-red-800">Non-Aktif</Badge>;
            case 'cuti':
                return <Badge className="bg-yellow-100 text-yellow-800">Cuti</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getJabatanIcon = (jabatan: string) => {
        switch (jabatan?.toLowerCase()) {
            case 'ketua':
                return <Crown className="h-4 w-4 text-yellow-600" />;
            case 'wakil ketua':
                return <Crown className="h-4 w-4 text-orange-600" />;
            case 'sekretaris i':
            case 'sekretaris ii':
            case 'bendahara i':
            case 'bendahara ii':
                return <Shield className="h-4 w-4 text-blue-600" />;
            case 'Koordinator Seksi':
                return <Settings className="h-4 w-4 text-purple-600" />;
            default:
                return <User className="h-4 w-4 text-gray-600" />;
        }
    };

    const handleEditAnggota = (anggota: any) => {
        setEditingAnggota(anggota);
        setIsEditOpen(true);
    };

    const handleUpdateAnggota = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/dashboard/anggota/${editingAnggota.id}`, {
            method: 'put',
            onSuccess: () => {
                setIsEditOpen(false);
                resetEdit();
                router.visit('/dashboard/anggota');
                toast('Berhasil memperbarui anggota', {
                    description: `Anggota "${editData.nama}" berhasil diperbarui`,
                });
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const handleViewDetail = (anggota: any) => {
        setSelectedAnggota(anggota);
        setIsDetailOpen(true);
    };

    const handleJabatanChange = (id_jabatan: number) => {
        setData({ ...data, id_jabatan, id_seksi: 0 });
    };

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        post('/dashboard/anggota', {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
                router.visit('/dashboard/anggota');
                toast('Berhasil menambah anggota', {
                    description: `Anggota baru "${data.nama}" berhasil ditambahkan dengan jabatan "${getJabatanById(data.id_jabatan)}"${data.id_seksi ? ` di ${getSeksiById(data.id_seksi)}` : ''}`,
                });
            },
            onError: (errors) => {
                console.error(errors);
            },
        });

        setIsCreateOpen(false);
    };

    const isJabatanRequiresSeksi = (id_jabatan: number) => {
        return id_jabatan == 7 || id_jabatan == 8;
    };

    const struktur = getStrukturOrganisasi();

    useEffect(() => {
        if (editingAnggota) {
            console.log('Raw editingAnggota:', editingAnggota); // Add this
            setEditData({
                id: editingAnggota.id,
                nama: editingAnggota.nama,
                email: editingAnggota.email,
                telepon: editingAnggota.telepon,
                alamat: editingAnggota.alamat,
                jenis_kelamin: editingAnggota.jenis_kelamin,
                id_jabatan: editingAnggota.id_jabatan,
                id_seksi: editingAnggota.id_seksi || 0, // Ensure id_seksi is set to 0 if not present
                status: editingAnggota.status || 'Aktif', // Default to 'Aktif' if status is not present
            });

            console.log('Editing Agenda Data:', editData);
            console.log('Editing Agenda:', editingAnggota);
        }
    }, [editingAnggota]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* Header dengan statistik dan toggle view */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex gap-2">
                        <Button
                            variant={currentView === 'list' ? 'default' : 'outline'}
                            onClick={() => setCurrentView('list')}
                            className={currentView === 'list' ? 'bg-rose-600 hover:bg-rose-700' : ''}
                        >
                            <Users className="mr-2 h-4 w-4" />
                            Daftar Anggota
                        </Button>
                        <Button
                            variant={currentView === 'structure' ? 'default' : 'outline'}
                            onClick={() => setCurrentView('structure')}
                            className={currentView === 'structure' ? 'bg-rose-600 hover:bg-rose-700' : ''}
                        >
                            <Shield className="mr-2 h-4 w-4" />
                            Struktur Organisasi
                        </Button>
                    </div>
                </div>

                {currentView === 'list' && (
                    <div className="mb-4 grid auto-rows-min gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Anggota</CardTitle>
                                <Users className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{anggota.length}</div>
                                <p className="text-muted-foreground text-xs">+2 dari bulan lalu</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pengurus Inti</CardTitle>
                                <Crown className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {
                                        anggota?.filter((a: any) => a.jabatan?.nama_jabatan === 'Ketua' || a.jabatan?.nama_jabatan === 'Wakil Ketua')
                                            .length
                                    }
                                </div>
                                <p className="text-muted-foreground text-xs">Pengurus utama</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Koordinator Seksi</CardTitle>
                                <Settings className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {anggota?.filter((a: any) => a.jabatan?.nama_jabatan === 'Koordinator Seksi').length}
                                </div>
                                <p className="text-muted-foreground text-xs">Kepala seksi</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Anggota Aktif</CardTitle>
                                <UserPlus className="text-muted-foreground h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{anggota?.filter((a: any) => a.status === 'Aktif').length}</div>
                                <p className="text-muted-foreground text-xs">
                                    {Math.round((anggota?.filter((a: any) => a.status === 'Aktif').length / anggota.length) * 100)}% dari total
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Organizational Structure View */}
                {currentView === 'structure' && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center text-xl">STRUKTUR ORGANISASI KARANG TARUNA CAKRA WIJAYA</CardTitle>
                            <CardDescription className="text-center">Kelurahan Cakra Wijaya, Kecamatan Merdeka - Periode 2024-2029</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center space-y-6 p-6">
                                {/* Ketua */}
                                <div className="text-center">
                                    <div className="rounded border-2 border-black bg-yellow-400 p-4">
                                        <div className="text-sm font-bold">KETUA</div>
                                        <div className="text-xs font-semibold">{struktur.ketua ? struktur.ketua.nama : 'Belum diisi'}</div>
                                    </div>
                                </div>

                                {/* Connection Line */}
                                <div className="h-8 w-px bg-black"></div>

                                {/* Wakil Ketua */}
                                <div className="text-center">
                                    <div className="rounded border-2 border-black bg-yellow-400 p-3">
                                        <div className="text-sm font-bold">WAKIL KETUA</div>
                                        <div className="text-xs font-semibold">
                                            {struktur.wakil_ketua ? struktur.wakil_ketua.nama : 'Belum diisi'}
                                        </div>
                                    </div>
                                </div>

                                {/* Connection Line */}
                                <div className="h-8 w-px bg-black"></div>

                                {/* Sekretaris and Bendahara */}
                                <div className="flex items-center justify-center space-x-8">
                                    <div className="space-y-2 text-center">
                                        <div className="rounded border-2 border-black bg-yellow-400 p-3">
                                            <div className="text-sm font-bold">SEKRETARIS I</div>
                                            <div className="text-xs font-semibold">
                                                {struktur.sekretaris_1 ? struktur.sekretaris_1.nama : 'Belum diisi'}
                                            </div>
                                        </div>
                                        <div className="rounded border-2 border-black bg-yellow-400 p-3">
                                            <div className="text-sm font-bold">SEKRETARIS II</div>
                                            <div className="text-xs font-semibold">
                                                {struktur.sekretaris_2 ? struktur.sekretaris_2.nama : 'Belum diisi'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-center">
                                        <div className="rounded border-2 border-black bg-yellow-400 p-3">
                                            <div className="text-sm font-bold">BENDAHARA I</div>
                                            <div className="text-xs font-semibold">
                                                {struktur.bendahara_1 ? struktur.bendahara_1.nama : 'Belum diisi'}
                                            </div>
                                        </div>
                                        <div className="rounded border-2 border-black bg-yellow-400 p-3">
                                            <div className="text-sm font-bold">BENDAHARA II</div>
                                            <div className="text-xs font-semibold">
                                                {struktur.bendahara_2 ? struktur.bendahara_2.nama : 'Belum diisi'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Connection Line */}
                                <div className="h-12 w-px bg-black"></div>

                                {/* Seksi-seksi */}
                                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                                    {struktur.seksi.map((seksi: any, index: any) => (
                                        <div key={index} className="text-center">
                                            {/* Koordinator Seksi */}
                                            <div className="mb-2 rounded border-2 border-black bg-yellow-400 p-2">
                                                <div className="text-xs font-bold">{seksi.nama_seksi.toUpperCase()}</div>
                                                <div className="text-xs font-semibold">
                                                    {seksi.koordinator ? seksi.koordinator.nama : 'Belum diisi'}
                                                </div>
                                            </div>

                                            {/* Anggota Seksi */}
                                            <div className="rounded border-2 border-black bg-yellow-400 p-2">
                                                <div className="mb-1 text-xs font-bold">ANGGOTA</div>
                                                {seksi.anggota.length > 0 ? (
                                                    seksi.anggota.map((anggota: any, idx: any) => (
                                                        <div key={idx} className="text-xs">
                                                            {idx + 1}. {anggota.nama}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-xs text-gray-600">Belum ada anggota</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Tabel Anggota - only show in list view */}
                {currentView === 'list' && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Daftar Anggota</CardTitle>
                                    <CardDescription>Kelola semua anggota organisasi Karang Taruna</CardDescription>
                                </div>
                                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="bg-rose-600 hover:bg-rose-700">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Tambah Anggota
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                        <DialogHeader>
                                            <DialogTitle>Tambah Anggota Baru</DialogTitle>
                                            <DialogDescription>Daftarkan anggota baru ke organisasi</DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="nama">Nama Lengkap</Label>
                                                <Input
                                                    id="nama"
                                                    placeholder="Masukkan nama lengkap"
                                                    value={data.nama}
                                                    onChange={(e) => setData({ ...data, nama: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                                                <Select
                                                    value={data.jenis_kelamin}
                                                    onValueChange={(value) => setData({ ...data, jenis_kelamin: value })}
                                                >
                                                    <SelectTrigger>{data.jenis_kelamin || 'Pilih jenis kelamin'}</SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="email@example.com"
                                                        value={data.email}
                                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="telepon">Telepon</Label>
                                                    <Input
                                                        id="telepon"
                                                        placeholder="081234567890"
                                                        value={data.telepon}
                                                        onChange={(e) => setData({ ...data, telepon: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="alamat">Alamat</Label>
                                                <Input
                                                    id="alamat"
                                                    placeholder="Alamat lengkap"
                                                    value={data.alamat}
                                                    onChange={(e) => setData({ ...data, alamat: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="jabatan">Jabatan</Label>
                                                <Select
                                                    value={data.id_jabatan.toString()}
                                                    onValueChange={(value) => handleJabatanChange(parseInt(value))}
                                                >
                                                    <SelectTrigger>
                                                        {jabatan.find((j: any) => j.id_jabatan === data.id_jabatan)?.nama_jabatan ?? 'Pilih jabatan'}
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {jabatan.map((j: any) => (
                                                            <SelectItem key={j.id_jabatan} value={j.id_jabatan.toString()}>
                                                                {j.nama_jabatan}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            {isJabatanRequiresSeksi(data.id_jabatan) && (
                                                <div className="grid gap-2">
                                                    <Label htmlFor="seksi">Seksi</Label>
                                                    <Select
                                                        value={data.id_seksi.toString()}
                                                        onValueChange={(value) => setData({ ...data, id_seksi: Number(value) })}
                                                    >
                                                        <SelectTrigger>
                                                            {seksi.find((s: any) => s.id_seksi === data.id_seksi)?.nama_seksi ?? 'Pilih seksi'}
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {seksi.map((s: any) => (
                                                                <SelectItem key={s.id_seksi} value={s.id_seksi.toString()}>
                                                                    {s.nama_seksi}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )}
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type="submit"
                                                className="bg-rose-600 hover:bg-rose-700"
                                                onClick={handleSubmitForm}
                                                disabled={
                                                    !data.nama || !data.id_jabatan || (isJabatanRequiresSeksi(data.id_jabatan) && !data.id_seksi)
                                                }
                                            >
                                                Tambah Anggota
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
                                        <TableHead>Anggota</TableHead>
                                        <TableHead>Kontak</TableHead>
                                        <TableHead>Jabatan</TableHead>
                                        <TableHead>Seksi</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Bergabung</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {anggota.map((a: any) => (
                                        <TableRow key={a.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={a.foto || '/placeholder.svg'} alt={a.nama} />
                                                        <AvatarFallback>
                                                            {a.nama
                                                                .split(' ')
                                                                .map((n: any) => n[0])
                                                                .join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="flex items-center space-x-2">
                                                            <div className="font-medium">{a.nama}</div>
                                                            {getGenderBadge(a.jenis_kelamin)}
                                                        </div>
                                                        <div className="text-muted-foreground flex items-center text-sm">
                                                            <MapPin className="mr-1 h-3 w-3" />
                                                            {a.alamat.split(',')[0]}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm">
                                                        <Mail className="mr-1 h-3 w-3" />
                                                        {a.email}
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <Phone className="mr-1 h-3 w-3" />
                                                        {a.telepon}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    {getJabatanIcon(a?.jabatan?.nama_jabatan)}
                                                    <span className="ml-2">{a?.jabatan?.nama_jabatan}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {a.seksi ? (
                                                    <Badge variant="outline" className="border-purple-600 text-purple-600">
                                                        {a.seksi.nama_seksi}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>{getStatusBadge(a.status)}</TableCell>
                                            <TableCell>{new Date(a.created_at).toLocaleDateString('id-ID')}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="sm" onClick={() => handleViewDetail(a)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={() => handleEditAnggota(a)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="text-red-600">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
                {/* Dialog Detail Anggota */}

                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Detail Anggota</DialogTitle>
                            <DialogDescription>Informasi lengkap tentang anggota</DialogDescription>
                        </DialogHeader>
                        {selectedAnggota && (
                            <div className="grid gap-4 py-4">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src={selectedAnggota.foto || '/placeholder.svg'} alt={selectedAnggota.nama} />
                                        <AvatarFallback className="text-lg">
                                            {selectedAnggota.nama
                                                .split(' ')
                                                .map((n: string) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <h3 className="text-lg font-semibold">{selectedAnggota.nama}</h3>
                                            {getGenderBadge(selectedAnggota.jenis_kelamin)}
                                        </div>
                                        <div className="flex items-center">
                                            {getJabatanIcon(getJabatanById(selectedAnggota.id_jabatan))}
                                            <span className="text-muted-foreground ml-2 text-sm">{getJabatanById(selectedAnggota.id_jabatan)}</span>
                                        </div>
                                        {getSeksiById(selectedAnggota.id_seksi) && (
                                            <Badge variant="outline" className="mt-1 border-purple-600 text-purple-600">
                                                {getSeksiById(selectedAnggota.id_seksi)}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    <div className="grid gap-1">
                                        <Label className="font-semibold">Email</Label>
                                        <p className="flex items-center text-sm">
                                            <Mail className="mr-2 h-4 w-4" />
                                            {selectedAnggota.email}
                                        </p>
                                    </div>
                                    <div className="grid gap-1">
                                        <Label className="font-semibold">Telepon</Label>
                                        <p className="flex items-center text-sm">
                                            <Phone className="mr-2 h-4 w-4" />
                                            {selectedAnggota.telepon}
                                        </p>
                                    </div>
                                    <div className="grid gap-1">
                                        <Label className="font-semibold">Alamat</Label>
                                        <p className="flex items-center text-sm">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            {selectedAnggota.alamat}
                                        </p>
                                    </div>
                                    <div className="grid gap-1">
                                        <Label className="font-semibold">Status</Label>
                                        {getStatusBadge(selectedAnggota.status)}
                                    </div>
                                    <div className="grid gap-1">
                                        <Label className="font-semibold">Tanggal Bergabung</Label>
                                        <p className='text-sm'>{new Date(selectedAnggota.created_at).toLocaleDateString('id-ID')}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                                Tutup
                            </Button>
                            <Button className="bg-rose-600 hover:bg-rose-700">Edit Anggota</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Anggota Modal */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Edit Anggota</DialogTitle>
                            <DialogDescription>Perbarui informasi anggota organisasi</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="edit-nama">Nama Lengkap</Label>
                                <Input
                                    id="edit-nama"
                                    placeholder="Masukkan nama lengkap"
                                    value={editingAnggota?.nama}
                                    onChange={(e) => setEditingAnggota({ ...editingAnggota, nama: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-email">Email</Label>
                                    <Input
                                        id="edit-email"
                                        type="email"
                                        placeholder="email@example.com"
                                        value={editingAnggota?.email}
                                        onChange={(e) => setEditingAnggota({ ...editingAnggota, email: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-telepon">Telepon</Label>
                                    <Input
                                        id="edit-telepon"
                                        placeholder="081234567890"
                                        value={editingAnggota?.telepon}
                                        onChange={(e) => setEditingAnggota({ ...editingAnggota, telepon: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="edit-alamat">Alamat</Label>
                                <Input
                                    id="edit-alamat"
                                    placeholder="Alamat lengkap"
                                    value={editingAnggota?.alamat}
                                    onChange={(e) => setEditingAnggota({ ...editingAnggota, alamat: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                                    <Select
                                        value={editingAnggota?.jenis_kelamin}
                                        onValueChange={(value) => setEditingAnggota({ ...editingAnggota, jenis_kelamin: value })}
                                    >
                                        <SelectTrigger>{editingAnggota?.jenis_kelamin || 'Pilih jenis kelamin'}</SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="jabatan">Jabatan</Label>
                                    <Select
                                        value={editingAnggota?.id_jabatan?.toString()}
                                        onValueChange={(value) => {
                                            const idJabatan = parseInt(value);
                                            setEditingAnggota({ ...editingAnggota, id_jabatan: idJabatan });
                                        }}
                                    >
                                        <SelectTrigger>
                                            {jabatan.find((j: any) => j.id_jabatan === editingAnggota?.id_jabatan)?.nama_jabatan ?? 'Pilih jabatan'}
                                        </SelectTrigger>
                                        <SelectContent>
                                            {jabatan.map((j: any) => (
                                                <SelectItem key={j.id_jabatan} value={j.id_jabatan.toString()}>
                                                    {j.nama_jabatan}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className={`grid ${isJabatanRequiresSeksi(editingAnggota?.id_jabatan) ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                                {isJabatanRequiresSeksi(editingAnggota?.id_jabatan) && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="seksi">Seksi</Label>
                                        <Select
                                            value={editingAnggota?.id_seksi}
                                            onValueChange={(value) => setEditingAnggota({ ...editingAnggota, id_seksi: Number(value) })}
                                        >
                                            <SelectTrigger>
                                                {seksi.find((s: any) => s.id_seksi === editingAnggota.id_seksi)?.nama_seksi ?? 'Pilih seksi'}
                                            </SelectTrigger>
                                            <SelectContent>
                                                {seksi.map((s: any) => (
                                                    <SelectItem key={s.id_seksi} value={s.id_seksi.toString()}>
                                                        {s.nama_seksi}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {/* Status Toggle */}
                                <div className="grid gap-2">
                                    <Label>Status Anggota</Label>
                                    <div className="flex items-center space-x-3 rounded-lg border px-3 py-1.5">
                                        <div className="flex-1">
                                            <div className="font-medium">{editingAnggota?.status === 'Aktif' ? 'Aktif' : 'Non-Aktif'}</div>
                                        </div>
                                        <Switch
                                            checked={editingAnggota?.status === 'Aktif'}
                                            onCheckedChange={(checked) =>
                                                setEditingAnggota({ ...editingAnggota, status: checked ? 'Aktif' : 'Non-aktif' })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                className="bg-rose-600 hover:bg-rose-700"
                                onClick={handleUpdateAnggota}
                                disabled={
                                    !editingAnggota?.nama ||
                                    !editingAnggota?.jabatan ||
                                    (isJabatanRequiresSeksi(editingAnggota?.jabatan) && !editingAnggota?.seksi)
                                }
                            >
                                Update Anggota
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
};

export default Anggota;
