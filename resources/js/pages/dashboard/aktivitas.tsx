import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Archive, ArrowLeft, Bold, Calendar, Edit, Eye, FileText, ImageIcon, Italic, List, ListOrdered, Newspaper, Plus, Quote, Save, Trash2, Type, Underline, Upload, User, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Aktivitas',
        href: '/dashboard/aktivitas',
    },
];

const Aktivitas = ({ aktivitasData }: any) => {
    const [selectedAktivitas, setSelectedAktivitas] = useState<any>(null);
    const [currentView, setCurrentView] = useState<'list' | 'create' | 'view' | 'edit'>('list');
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [formData, setFormData] = useState({
        judul: '',
        jenis: '',
        kategori: '',
        konten: '',
        tanggal: new Date().toISOString().split('T')[0], // format YYYY-MM-DD
        status: 'draft', // default status
        publish: false,
        cover_image: null as File | null,
    });
    const [coverImage, setCoverImage] = useState<string | null>(null);

    const defaultFormState = {
        judul: '',
        jenis: '',
        kategori: '',
        konten: '',
        tanggal: new Date().toISOString().split('T')[0], // format YYYY-MM-DD
        status: 'draft', // default status
        publish: false,
        cover_image: null as File | null,
    };

    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingArtikel, setEditingArtikel] = useState<any>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'published':
                return <Badge className="bg-green-100 text-green-800">Dipublikasi</Badge>;
            case 'draft':
                return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
            case 'archived':
                return <Badge className="bg-gray-100 text-gray-800">Diarsip</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getJenisBadge = (jenis: string) => {
        switch (jenis) {
            case 'artikel':
                return (
                    <Badge variant="outline" className="border-blue-600 text-blue-600">
                        Artikel
                    </Badge>
                );
            case 'berita':
                return (
                    <Badge variant="outline" className="border-purple-600 text-purple-600">
                        Berita
                    </Badge>
                );
            default:
                return <Badge variant="outline">{jenis}</Badge>;
        }
    };

    const handleViewDetail = (aktivitas: any) => {
        setSelectedAktivitas(aktivitas);
        setIsDetailOpen(true);
    };

    const handleViewArtikel = (aktivitas: any) => {
        setSelectedAktivitas(aktivitas);
        setCurrentView('view');
    };

    const handleCreateNew = () => {
        setFormData({
            judul: '',
            jenis: '',
            kategori: '',
            konten: '',
            tanggal: new Date().toISOString().split('T')[0], // format YYYY-MM-DD
            status: 'draft', // default status
            publish: false,
            cover_image: null,
        });
        setCoverImage(null);
        setCurrentView('create');
    };

    const handleEditArtikel = (artikel: any) => {
        setEditingArtikel(artikel);
        setFormData({
            judul: artikel.judul,
            jenis: artikel.jenis,
            kategori: artikel.kategori,
            konten: artikel.konten,
            tanggal: artikel.tanggal,
            status: artikel.status,
            publish: artikel.status === 'published',
            cover_image: null,
        });
        setCoverImage(`/storage/${artikel.cover_image}`); // preview image
        setCurrentView('edit');
    };


    const handleUpdateArtikel = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(formData);

        const payload = new FormData();
        payload.append('judul', formData.judul);
        payload.append('jenis', formData.jenis);
        payload.append('kategori', formData.kategori || '');
        payload.append('tanggal', formData.tanggal);
        payload.append('konten', formData.konten);
        payload.append('status', formData.status);

        if (formData.cover_image && formData.cover_image instanceof File) {
            payload.append('cover_image', formData.cover_image);
        }

        payload.append('_method', 'PUT'); // penting!

        router.post(`/dashboard/aktivitas/${editingArtikel.id}`, payload, {
            forceFormData: true,
            onSuccess: () => {
                toast.success("Artikel berhasil diupdate!");
                setIsEditOpen(false);
                setCoverImage(null);
                setFormData(defaultFormState);
                router.visit('/dashboard/aktivitas', {
                    preserveScroll: true,
                });
            },
            onError: (err) => {
                toast.error("Gagal mengupdate artikel!");
                console.error(err);
            }
        });
    };

    const handleDeleteArtikel = (id: number) => {
        router.delete(`/dashboard/aktivitas/${id}`, {
            onSuccess: () => toast.success('Artikel berhasil dihapus!'),
        });
    };

    const handleSubmitForm = () => {
        const status = formData.publish ? 'published' : 'draft';
        const payload = new FormData();

        payload.append('judul', formData.judul);
        payload.append('jenis', formData.jenis);
        payload.append('tanggal', new Date().toISOString().split('T')[0]);
        payload.append('penulis', 'Admin'); // atau ambil dari auth user
        payload.append('konten', formData.konten);
        payload.append('kategori', formData.kategori);
        payload.append('status', status);
        if (formData.cover_image) {
            payload.append('cover_image', formData.cover_image);
        }

        router.post('/dashboard/aktivitas', payload, {
            onSuccess: () => {
                setCurrentView('list');
                toast('Konten berhasil disimpan!');
            },
            onError: (err) => {
                toast.error('Gagal menyimpan konten!');
                console.error(err);
            },
        });
    };

    const formatTanggal = (tanggal: string) => {
        return new Date(tanggal).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Rich text formatting functions
    const insertFormatting = (before: string, after = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        const beforeText = textarea.value.substring(0, start);
        const afterText = textarea.value.substring(end);

        const newText = beforeText + before + selectedText + after + afterText;
        setFormData({ ...formData, konten: newText });

        // Set cursor position
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 0);
    };

    const insertText = (text: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const beforeText = textarea.value.substring(0, start);
        const afterText = textarea.value.substring(start);

        const newText = beforeText + text + afterText;
        setFormData({ ...formData, konten: newText });

        // Set cursor position
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + text.length, start + text.length);
        }, 0);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target?.result as string;
                setCoverImage(imageUrl);
                setFormData({ ...formData, cover_image: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeCoverImage = () => {
        setCoverImage(null);
    };

    const renderFormattedContent = (content: string) => {
        // Simple markdown-like rendering without image handling
        const lines = content.split('\n');

        return lines.map((line, index) => {
            // Handle other formatting
            const formatted = line
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/__(.*?)__/g, '<u>$1</u>');

            // Handle headings
            if (line.startsWith('#### ')) {
                return (
                    <h4 key={index} className="mt-2 mb-1 text-base font-semibold">
                        {line.substring(5)}
                    </h4>
                );
            }

            if (line.startsWith('### ')) {
                return (
                    <h3 key={index} className="mt-4 mb-2 text-lg font-semibold">
                        {line.substring(4)}
                    </h3>
                );
            }

            if (line.startsWith('## ')) {
                return (
                    <h2 key={index} className="mt-6 mb-3 text-xl font-bold">
                        {line.substring(3)}
                    </h2>
                );
            }
            if (line.startsWith('# ')) {
                return (
                    <h1 key={index} className="mt-8 mb-4 text-2xl font-bold">
                        {line.substring(2)}
                    </h1>
                );
            }

            // Handle quotes
            if (line.startsWith('> ')) {
                return (
                    <blockquote key={index} className="my-4 border-l-4 border-gray-300 pl-4 italic">
                        {line.substring(2)}
                    </blockquote>
                );
            }

            // Handle lists
            if (line.startsWith('- ')) {
                return (
                    <li key={index} className="ml-4">
                        {line.substring(2)}
                    </li>
                );
            }
            if (/^\d+\. /.test(line)) {
                const match = line.match(/^(\d+)\. (.*)$/);
                if (match) {
                    return (
                        <li key={index} className="ml-4">
                            {match[1]}. {match[2]}
                        </li>
                    );
                }
            }

            // Handle empty lines
            if (line.trim() === '') {
                return <br key={index} />;
            }

            // Regular paragraphs with inline formatting
            if (formatted !== line || line.length > 0) {
                return <div key={index} dangerouslySetInnerHTML={{ __html: formatted }} />;
            }

            return <div key={index}>{line}</div>;
        });
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
                                    <CardTitle className="text-sm font-medium">Total Konten</CardTitle>
                                    <Newspaper className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{aktivitasData.length}</div>
                                    <p className="text-muted-foreground text-xs">+3 dari bulan lalu</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Dipublikasi</CardTitle>
                                    <FileText className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{aktivitasData.filter((a: any) => a.status === 'published').length}</div>
                                    <p className="text-muted-foreground text-xs">Artikel & berita aktif</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                                    <Eye className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{aktivitasData.reduce((sum:any, a:any) => sum + a.views, 0)}</div>
                                    <p className="text-muted-foreground text-xs">
                                        Rata-rata {Math.round(aktivitasData.reduce((sum: any, a: any) => sum + a.views, 0) / aktivitasData.length)} per konten
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Draft</CardTitle>
                                    <Archive className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{aktivitasData.filter((a: any) => a.status === 'draft').length}</div>
                                    <p className="text-muted-foreground text-xs">Menunggu publikasi</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Tabel Aktivitas */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Artikel & Berita</CardTitle>
                                        <CardDescription>Kelola semua konten artikel dan berita organisasi</CardDescription>
                                    </div>
                                    <Button className="bg-rose-600 hover:bg-rose-700" onClick={handleCreateNew}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Buat Konten
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Judul</TableHead>
                                            <TableHead>Jenis</TableHead>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead>Penulis</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Views</TableHead>
                                            <TableHead className="text-right">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {aktivitasData.map((aktivitas: any) => (
                                            <TableRow key={aktivitas.id}>
                                                <TableCell className="max-w-xs font-medium">
                                                    <div className="truncate">{aktivitas.judul}</div>
                                                    <div className="text-muted-foreground text-xs">{aktivitas.kategori}</div>
                                                </TableCell>
                                                <TableCell>{getJenisBadge(aktivitas.jenis)}</TableCell>
                                                <TableCell>{aktivitas.tanggal}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <User className="mr-1 h-3 w-3" />
                                                        {aktivitas.penulis.nama}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{getStatusBadge(aktivitas.status)}</TableCell>
                                                <TableCell>{aktivitas.views}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => handleViewArtikel(aktivitas)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={() => handleViewDetail(aktivitas)}>
                                                            <FileText className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" onClick={() => handleEditArtikel(aktivitas)}>
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
                                                                    <AlertDialogTitle>Hapus {aktivitas.jenis === 'artikel' ? 'Artikel' : 'Berita'}</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Apakah kamu yakin ingin menghapus {aktivitas.jenis === 'artikel' ? 'artikel' : 'berita'} <strong>{aktivitas.judul}</strong>? Tindakan ini
                                                                        tidak bisa dibatalkan.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                    <AlertDialogAction className='bg-red-600 hover:bg-red-700 text-white' onClick={() => handleDeleteArtikel(aktivitas.id)}>
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

                {/* Create Content Section */}
                {currentView === 'create' && (
                    <>
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">Buat Konten Baru</h2>
                                <p className="text-muted-foreground">Tulis artikel atau berita baru dengan formatting dan gambar</p>
                            </div>
                            <Button variant="outline" onClick={() => setCurrentView('list')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Daftar
                            </Button>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Form Section - 2 columns */}
                            <div className="space-y-6 lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Form Konten</CardTitle>
                                        <CardDescription>Isi detail konten yang akan dibuat</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="judul">Judul</Label>
                                                <Input
                                                    id="judul"
                                                    placeholder="Masukkan judul artikel/berita"
                                                    value={formData.judul}
                                                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="jenis">Jenis Konten</Label>
                                                    <Select
                                                        value={formData.jenis}
                                                        onValueChange={(value) => setFormData({ ...formData, jenis: value })}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih jenis" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="artikel">Artikel</SelectItem>
                                                            <SelectItem value="berita">Berita</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="kategori">Kategori</Label>
                                                    <Select
                                                        value={formData.kategori}
                                                        onValueChange={(value) => setFormData({ ...formData, kategori: value })}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih kategori" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="kegiatan-sosial">Kegiatan Sosial</SelectItem>
                                                            <SelectItem value="pelatihan">Pelatihan</SelectItem>
                                                            <SelectItem value="organisasi">Organisasi</SelectItem>
                                                            <SelectItem value="lingkungan">Lingkungan</SelectItem>
                                                            <SelectItem value="budaya">Budaya</SelectItem>
                                                            <SelectItem value="olahraga">Olahraga</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            {/* Rich Text Toolbar */}
                                            <div className="grid gap-2">
                                                <Label>Toolbar Formatting</Label>
                                                <div className="flex flex-wrap gap-1 rounded-lg border bg-gray-50 p-2">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertFormatting('**', '**')}
                                                        title="Bold"
                                                    >
                                                        <Bold className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertFormatting('*', '*')}
                                                        title="Italic"
                                                    >
                                                        <Italic className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertFormatting('__', '__')}
                                                        title="Underline"
                                                    >
                                                        <Underline className="h-4 w-4" />
                                                    </Button>
                                                    <Separator orientation="vertical" className="h-6" />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertText('\n# ')}
                                                        title="Heading 1"
                                                    >
                                                        <Type className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertText('\n## ')}
                                                        title="Heading 2"
                                                    >
                                                        <Type className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertText('\n### ')}
                                                        title="Heading 3"
                                                    >
                                                        <Type className="h-2 w-2" />
                                                    </Button>
                                                    <Separator orientation="vertical" className="h-6" />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertText('\n- ')}
                                                        title="Bullet List"
                                                    >
                                                        <List className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertText('\n1. ')}
                                                        title="Numbered List"
                                                    >
                                                        <ListOrdered className="h-4 w-4" />
                                                    </Button>
                                                    <Button type="button" variant="ghost" size="sm" onClick={() => insertText('\n> ')} title="Quote">
                                                        <Quote className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Content Editor */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="konten">Konten</Label>
                                                <Textarea
                                                    ref={textareaRef}
                                                    id="konten"
                                                    placeholder="Tulis konten artikel/berita...

Gunakan formatting:
**Bold** untuk teks tebal
*Italic* untuk teks miring
__Underline__ untuk garis bawah
# Heading 1
## Heading 2
### Heading 3
- Bullet point
1. Numbered list
> Quote"
                                                    rows={20}
                                                    value={formData.konten}
                                                    onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                                                    className="font-mono text-sm"
                                                />
                                            </div>

                                            <div className="flex items-center space-x-2 rounded-lg border p-4">
                                                <div className="flex-1">
                                                    <Label htmlFor="publish" className="font-medium">
                                                        Publikasikan Langsung
                                                    </Label>
                                                    <p className="text-muted-foreground text-sm">
                                                        {formData.publish
                                                            ? 'Konten akan langsung dipublikasikan dan dapat dilihat publik'
                                                            : 'Konten akan disimpan sebagai draft dan dapat dipublikasikan nanti'}
                                                    </p>
                                                </div>
                                                <Switch
                                                    id="publish"
                                                    checked={formData.publish}
                                                    onCheckedChange={(checked) => setFormData({ ...formData, publish: checked })}
                                                />
                                            </div>

                                            <div className="flex gap-2 pt-4">
                                                <Button variant="outline" onClick={() => setCurrentView('list')} className="flex-1">
                                                    Batal
                                                </Button>
                                                <Button
                                                    className="flex-1 bg-rose-600 hover:bg-rose-700"
                                                    onClick={handleSubmitForm}
                                                    disabled={!formData.judul || !formData.jenis || !formData.kategori || !formData.konten}
                                                >
                                                    <Save className="mr-2 h-4 w-4" />
                                                    {formData.publish ? 'Publikasikan' : 'Simpan Draft'}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Sidebar - 1 column */}
                            <div className="space-y-6">
                                {/* Preview Section */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Eye className="h-5 w-5" />
                                            Live Preview
                                        </CardTitle>
                                        <CardDescription>Preview konten yang sedang ditulis</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="max-h-96 overflow-y-auto rounded-lg border bg-white p-4">
                                            {formData.judul && <h1 className="mb-4 text-2xl font-bold">{formData.judul}</h1>}
                                            {formData.jenis && formData.kategori && (
                                                <div className="mb-4 flex gap-2">
                                                    {getJenisBadge(formData.jenis)}
                                                    <Badge variant="outline">{formData.kategori}</Badge>
                                                </div>
                                            )}
                                            {coverImage && (
                                                <div className="mb-6">
                                                    <img
                                                        src={coverImage || '/placeholder.svg'}
                                                        alt="Cover Image"
                                                        className="h-48 w-full rounded-lg object-cover"
                                                    />
                                                </div>
                                            )}
                                            {formData.konten ? (
                                                <div className="prose max-w-none text-sm">{renderFormattedContent(formData.konten)}</div>
                                            ) : (
                                                <p className="text-gray-400 italic">Mulai menulis untuk melihat preview...</p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Image Upload Section */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <ImageIcon className="h-5 w-5" />
                                            Gambar Sampul
                                        </CardTitle>
                                        <CardDescription>Upload gambar sampul untuk artikel</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4">
                                            {/* Upload Area */}
                                            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                    id="image-upload"
                                                />
                                                <label htmlFor="image-upload" className="cursor-pointer">
                                                    {coverImage ? (
                                                        <img
                                                            src={coverImage || '/placeholder.svg'}
                                                            alt="Cover Preview"
                                                            className="mx-auto h-32 max-w-full rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <>
                                                            <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                                            <p className="text-sm text-gray-600">Klik untuk upload gambar</p>
                                                            <p className="mt-1 text-xs text-gray-400">PNG, JPG, GIF hingga 5MB</p>
                                                        </>
                                                    )}
                                                </label>
                                            </div>

                                            {/* Uploaded Images */}
                                            {coverImage && (
                                                <div className="grid gap-3">
                                                    <Label className="font-medium">Gambar yang diupload:</Label>
                                                    <div className="flex items-center gap-3 rounded-lg border p-3">
                                                        <img
                                                            src={coverImage || '/placeholder.svg'}
                                                            alt="Cover"
                                                            className="h-12 w-12 rounded object-cover"
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-sm font-medium">Gambar Sampul</p>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeCoverImage()}
                                                                className="text-red-600"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Formatting Guide */}
                                            <div className="rounded-lg bg-blue-50 p-4">
                                                <h4 className="mb-2 font-medium text-blue-900">Panduan Formatting:</h4>
                                                <div className="space-y-1 text-sm text-blue-800">
                                                    <p>
                                                        <code>**teks**</code> untuk <strong>tebal</strong>
                                                    </p>
                                                    <p>
                                                        <code>*teks*</code> untuk <em>miring</em>
                                                    </p>
                                                    <p>
                                                        <code>__teks__</code> untuk <u>garis bawah</u>
                                                    </p>
                                                    <p>
                                                        <code># Judul</code> untuk heading besar
                                                    </p>
                                                    <p>
                                                        <code>## Subjudul</code> untuk heading sedang
                                                    </p>
                                                    <p>
                                                        <code>- Item</code> untuk bullet point
                                                    </p>
                                                    <p>
                                                        <code>1. Item</code> untuk numbered list
                                                    </p>
                                                    <p>
                                                        <code>&gt; Teks</code> untuk quote
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </>
                )}

                {/* View Article Section */}
                {currentView === 'view' && selectedAktivitas && (
                    <>
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">Lihat {selectedAktivitas.jenis === 'artikel' ? 'Artikel' : 'Berita'}</h2>
                                <p className="text-muted-foreground">
                                    Dipublikasikan pada {formatTanggal(selectedAktivitas.tanggal)} oleh {selectedAktivitas.penulis.nama}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setCurrentView('list')}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Kembali ke Daftar
                                </Button>
                                <Button className="bg-rose-600 hover:bg-rose-700">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Konten
                                </Button>
                            </div>
                        </div>

                        <Card>
                            <CardContent className="p-8">
                                <article className="prose prose-lg max-w-none">
                                    {/* Header Artikel */}
                                    <div className="mb-6">
                                        <div className="mb-4 flex items-center gap-2">
                                            {getJenisBadge(selectedAktivitas.jenis)}
                                            <Badge variant="outline">{selectedAktivitas.kategori}</Badge>
                                            {getStatusBadge(selectedAktivitas.status)}
                                        </div>
                                        <h1 className="mb-4 text-3xl font-bold">{selectedAktivitas.judul}</h1>
                                        <div className="text-muted-foreground mb-6 flex items-center gap-4 text-sm">
                                            <div className="flex items-center">
                                                <User className="mr-1 h-4 w-4" />
                                                {selectedAktivitas.penulis.nama}
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="mr-1 h-4 w-4" />
                                                {formatTanggal(selectedAktivitas.tanggal)}
                                            </div>
                                            <div className="flex items-center">
                                                <Eye className="mr-1 h-4 w-4" />
                                                {selectedAktivitas.views} views
                                            </div>
                                        </div>
                                    </div>

                                    {/* Featured Image */}
                                    {selectedAktivitas.cover_image && (
                                        <div className="mb-6">
                                            <img
                                                src={'/storage/' + selectedAktivitas.cover_image || '/placeholder.svg'}
                                                alt={selectedAktivitas.judul}
                                                className="w-full rounded-lg object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Konten Artikel */}
                                    <div className="prose max-w-none text-sm">{renderFormattedContent(selectedAktivitas.konten)}</div>

                                    {/* Footer Artikel */}
                                    <div className="mt-8 border-t pt-6">
                                        <div className="flex items-center justify-between">
                                            <div className="text-muted-foreground text-sm">
                                                <p>Artikel ini telah dibaca {selectedAktivitas.views} kali</p>
                                                <p>Dipublikasikan oleh Karang Taruna Cakra Wijaya</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Lihat Detail
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Edit Artikel berita section */}
                {currentView === 'edit' && editingArtikel && (
                    <>
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">Edit {formData.jenis === 'artikel' ? 'Artikel' : 'Berita'}</h2>
                                <p className="text-muted-foreground">
                                    Edit konten {formData.jenis} yang telah dipublikasikan pada {formatTanggal(formData.tanggal)} oleh{' '}
                                    {editingArtikel.penulis.nama}
                                </p>
                            </div>
                            <Button variant="outline" onClick={() => setCurrentView('list')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Daftar
                            </Button>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Form Section - 2 columns */}
                            <div className="space-y-6 lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Form Konten</CardTitle>
                                        <CardDescription>Isi detail konten yang akan dibuat</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="judul">Judul</Label>
                                                <Input
                                                    id="judul"
                                                    placeholder="Masukkan judul artikel/berita"
                                                    value={formData.judul}
                                                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="jenis">Jenis Konten</Label>
                                                    <Select
                                                        value={formData.jenis}
                                                        onValueChange={(value) => setFormData({ ...formData, jenis: value })}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih jenis" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="artikel">Artikel</SelectItem>
                                                            <SelectItem value="berita">Berita</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="kategori">Kategori</Label>
                                                    <Select
                                                        value={formData.kategori}
                                                        onValueChange={(value) => setFormData({ ...formData, kategori: value })}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih kategori" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="kegiatan-sosial">Kegiatan Sosial</SelectItem>
                                                            <SelectItem value="pelatihan">Pelatihan</SelectItem>
                                                            <SelectItem value="organisasi">Organisasi</SelectItem>
                                                            <SelectItem value="lingkungan">Lingkungan</SelectItem>
                                                            <SelectItem value="budaya">Budaya</SelectItem>
                                                            <SelectItem value="olahraga">Olahraga</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            {/* Rich Text Toolbar */}
                                            <div className="grid gap-2">
                                                <Label>Toolbar Formatting</Label>
                                                <div className="flex flex-wrap gap-1 rounded-lg border bg-gray-50 p-2">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertFormatting('**', '**')}
                                                        title="Bold"
                                                    >
                                                        <Bold className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertFormatting('*', '*')}
                                                        title="Italic"
                                                    >
                                                        <Italic className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertFormatting('__', '__')}
                                                        title="Underline"
                                                    >
                                                        <Underline className="h-4 w-4" />
                                                    </Button>
                                                    <Separator orientation="vertical" className="h-6" />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertText('\n# ')}
                                                        title="Heading 1"
                                                    >
                                                        <Type className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertText('\n## ')}
                                                        title="Heading 2"
                                                    >
                                                        <Type className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertText('\n### ')}
                                                        title="Heading 3"
                                                    >
                                                        <Type className="h-2 w-2" />
                                                    </Button>
                                                    <Separator orientation="vertical" className="h-6" />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertText('\n- ')}
                                                        title="Bullet List"
                                                    >
                                                        <List className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => insertText('\n1. ')}
                                                        title="Numbered List"
                                                    >
                                                        <ListOrdered className="h-4 w-4" />
                                                    </Button>
                                                    <Button type="button" variant="ghost" size="sm" onClick={() => insertText('\n> ')} title="Quote">
                                                        <Quote className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Content Editor */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="konten">Konten</Label>
                                                <Textarea
                                                    ref={textareaRef}
                                                    id="konten"
                                                    placeholder="Tulis konten artikel/berita...

Gunakan formatting:
**Bold** untuk teks tebal
*Italic* untuk teks miring
__Underline__ untuk garis bawah
# Heading 1
## Heading 2
### Heading 3
- Bullet point
1. Numbered list
> Quote"
                                                    rows={20}
                                                    value={formData.konten}
                                                    onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                                                    className="font-mono text-sm"
                                                />
                                            </div>

                                            <div className="flex items-center space-x-2 rounded-lg border p-4">
                                                <div className="flex-1">
                                                    <Label htmlFor="publish" className="font-medium">
                                                        Publikasikan Langsung
                                                    </Label>
                                                    <p className="text-muted-foreground text-sm">
                                                        {formData.status === 'published'
                                                            ? 'Konten akan langsung dipublikasikan dan dapat dilihat publik'
                                                            : 'Konten akan disimpan sebagai draft dan dapat dipublikasikan nanti'}
                                                    </p>
                                                </div>
                                                <Switch
                                                    id="publish"
                                                    checked={formData.status === 'published' ? true : false}
                                                    onCheckedChange={(checked) => setFormData({ ...formData, publish: checked })}
                                                />
                                            </div>

                                            <div className="flex gap-2 pt-4">
                                                <Button variant="outline" onClick={() => setCurrentView('list')} className="flex-1">
                                                    Batal
                                                </Button>
                                                <Button
                                                    className="flex-1 bg-rose-600 hover:bg-rose-700"
                                                    onClick={handleUpdateArtikel}
                                                    disabled={!editingArtikel.judul || !editingArtikel.jenis || !editingArtikel.kategori || !editingArtikel.konten}
                                                >
                                                    <Save className="mr-2 h-4 w-4" />
                                                    {editingArtikel.publish ? 'Publikasikan' : 'Simpan Draft'}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Sidebar - 1 column */}
                            <div className="space-y-6">
                                {/* Preview Section */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Eye className="h-5 w-5" />
                                            Live Preview
                                        </CardTitle>
                                        <CardDescription>Preview konten yang sedang ditulis</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="max-h-96 overflow-y-auto rounded-lg border bg-white p-4">
                                            {editingArtikel.judul && <h1 className="mb-4 text-2xl font-bold">{editingArtikel.judul}</h1>}
                                            {editingArtikel.jenis && editingArtikel.kategori && (
                                                <div className="mb-4 flex gap-2">
                                                    {getJenisBadge(editingArtikel.jenis)}
                                                    <Badge variant="outline">{editingArtikel.kategori}</Badge>
                                                </div>
                                            )}
                                            {coverImage && (
                                                <div className="mb-6">
                                                    <img
                                                        src={coverImage || '/placeholder.svg'}
                                                        alt="Cover Image"
                                                        className="h-48 w-full rounded-lg object-cover"
                                                    />
                                                </div>
                                            )}
                                            {editingArtikel.konten ? (
                                                <div className="prose max-w-none text-sm">{renderFormattedContent(editingArtikel.konten)}</div>
                                            ) : (
                                                <p className="text-gray-400 italic">Mulai menulis untuk melihat preview...</p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Image Upload Section */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <ImageIcon className="h-5 w-5" />
                                            Gambar Sampul
                                        </CardTitle>
                                        <CardDescription>Upload gambar sampul untuk artikel</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-4">
                                            {/* Upload Area */}
                                            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                    id="image-upload"
                                                />
                                                <label htmlFor="image-upload" className="cursor-pointer">
                                                    {coverImage ? (
                                                        <img
                                                            src={coverImage || '/placeholder.svg'}
                                                            alt="Cover Preview"
                                                            className="mx-auto h-32 max-w-full rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <>
                                                            <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                                                            <p className="text-sm text-gray-600">Klik untuk upload gambar</p>
                                                            <p className="mt-1 text-xs text-gray-400">PNG, JPG, GIF hingga 5MB</p>
                                                        </>
                                                    )}
                                                </label>
                                            </div>

                                            {/* Uploaded Images */}
                                            {coverImage && (
                                                <div className="grid gap-3">
                                                    <Label className="font-medium">Gambar yang diupload:</Label>
                                                    <div className="flex items-center gap-3 rounded-lg border p-3">
                                                        <img
                                                            src={coverImage || '/placeholder.svg'}
                                                            alt="Cover"
                                                            className="h-12 w-12 rounded object-cover"
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-sm font-medium">Gambar Sampul</p>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeCoverImage()}
                                                                className="text-red-600"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Formatting Guide */}
                                            <div className="rounded-lg bg-blue-50 p-4">
                                                <h4 className="mb-2 font-medium text-blue-900">Panduan Formatting:</h4>
                                                <div className="space-y-1 text-sm text-blue-800">
                                                    <p>
                                                        <code>**teks**</code> untuk <strong>tebal</strong>
                                                    </p>
                                                    <p>
                                                        <code>*teks*</code> untuk <em>miring</em>
                                                    </p>
                                                    <p>
                                                        <code>__teks__</code> untuk <u>garis bawah</u>
                                                    </p>
                                                    <p>
                                                        <code># Judul</code> untuk heading besar
                                                    </p>
                                                    <p>
                                                        <code>## Subjudul</code> untuk heading sedang
                                                    </p>
                                                    <p>
                                                        <code>- Item</code> untuk bullet point
                                                    </p>
                                                    <p>
                                                        <code>1. Item</code> untuk numbered list
                                                    </p>
                                                    <p>
                                                        <code>&gt; Teks</code> untuk quote
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </>
                )}

                {/* Dialog Detail Aktivitas */}
                <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                    <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                            <DialogTitle>Detail Konten</DialogTitle>
                            <DialogDescription>Informasi lengkap tentang artikel/berita</DialogDescription>
                        </DialogHeader>
                        {selectedAktivitas && (
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Judul</Label>
                                    <p>{selectedAktivitas.judul}</p>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Jenis</Label>
                                        {getJenisBadge(selectedAktivitas.jenis)}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Kategori</Label>
                                        <p>{selectedAktivitas.kategori}</p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Views</Label>
                                        <p>{selectedAktivitas.views}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Tanggal</Label>
                                        <p className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {selectedAktivitas.tanggal}
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="font-semibold">Penulis</Label>
                                        <p className="flex items-center">
                                            <User className="mr-2 h-4 w-4" />
                                            {selectedAktivitas.penulis.nama}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Status</Label>
                                    {getStatusBadge(selectedAktivitas.status)}
                                </div>
                                <div className="grid gap-2">
                                    <Label className="font-semibold">Konten</Label>
                                    <div className="max-h-40 overflow-y-auto rounded-md bg-gray-50 p-3">
                                        <p className="text-sm">{selectedAktivitas.konten}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                                Tutup
                            </Button>
                            <Button className="bg-rose-600 hover:bg-rose-700">Edit Konten</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
};

export default Aktivitas;
