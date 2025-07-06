<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Kegiatan;
use App\Models\Pengumuman;
use App\Models\Artikel;
use App\Models\Inventaris;
use App\Models\Keuangan;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $now = now();

        // 1. Statistik utama
        $totalAnggota = User::count();
        $agendaBulanIni = Kegiatan::whereMonth('tanggal', $now->month)->whereYear('tanggal', $now->year)->count();
        $pengumumanAktif = Pengumuman::where('tanggal', '>=', $now)->count();
        $artikelTerpublikasi = Artikel::where('status', 'Publikasi')->count();
        // trend up or down
        $anggotaTrend = User::whereMonth('created_at', $now->month)
            ->whereYear('created_at', $now->year)
            ->count() > User::whereMonth('created_at', $now->subMonth()->month)
            ->whereYear('created_at', $now->year)
            ->count() ? 'up' : 'down';
        $agendaTrend = Kegiatan::whereMonth('tanggal', $now->month)
            ->whereYear('tanggal', $now->year)
            ->count() > Kegiatan::whereMonth('tanggal', $now->subMonth()->month)
            ->whereYear('tanggal', $now->year)
            ->count() ? 'up' : 'down';
        $pengumumanTrend = Pengumuman::where('tanggal', '>=', $now)
            ->count() > Pengumuman::where('tanggal', '<', $now->subMonth())
            ->count() ? 'up' : 'down';
        $artikelTrend = Artikel::where('status', 'published')
            ->whereMonth('created_at', $now->month)
            ->whereYear('created_at', $now->year)
            ->count() > Artikel::where('status', 'published')
            ->whereMonth('created_at', $now->subMonth()->month)
            ->whereYear('created_at', $now->year)
            ->count() ? 'up' : 'down';

        // change
        $anggotaChange = User::whereMonth('created_at', $now->month)
            ->whereYear('created_at', $now->year)
            ->count() - User::whereMonth('created_at', $now->subMonth()->month)
            ->whereYear('created_at', $now->year)
            ->count();
        $agendaChange = Kegiatan::whereMonth('tanggal', $now->month)
            ->whereYear('tanggal', $now->year)
            ->count() - Kegiatan::whereMonth('tanggal', $now->subMonth()->month)
            ->whereYear('tanggal', $now->year)
            ->count();
        $pengumumanChange = Pengumuman::where('tanggal', '>=', $now)
            ->count() - Pengumuman::where('tanggal', '<', $now->subMonth())
            ->count();
        $artikelChange = Artikel::where('status', 'published')
            ->whereMonth('created_at', $now->month)
            ->whereYear('created_at', $now->year)
            ->count() - Artikel::where('status', 'published')
            ->whereMonth('created_at', $now->subMonth()->month)
            ->whereYear('created_at', $now->year)
            ->count();

        // 2. Aktivitas terbaru (ambil 5 terakhir dari gabungan)
        $recent = collect()
            ->merge(Kegiatan::latest()->take(5)->get()->map(fn($k) => [
                'id' => $k->id,
                'type' => 'agenda',
                'title' => $k->nama_kegiatan,
                'description' => $k->deskripsi ?? '',
                'time' => $k->tanggal,
                'status' => 'upcoming',
            ]))
            ->merge(Pengumuman::latest()->take(5)->get()->map(fn($p) => [
                'id' => $p->id,
                'type' => 'pengumuman',
                'title' => $p->judul,
                'description' => $p->isi ?? '',
                'time' => $p->created_at,
                'status' => 'active',
            ]))
            ->merge(Artikel::latest()->take(5)->get()->map(fn($a) => [
                'id' => $a->id,
                'type' => $a->jenis,
                'title' => $a->judul,
                'description' => $a->konten ? substr(strip_tags($a->konten), 0, 80) . '...' : '',
                'time' => $a->created_at,
                'status' => 'published',
            ]))
            ->sortByDesc('time')
            ->take(5)
            ->values();

        // 3. Agenda Mendatang (yang belum lewat)
        $upcomingEvents = Kegiatan::where('tanggal', '>=', $now)
            ->orderBy('tanggal')
            ->take(5)
            ->get()
            ->map(fn($k) => [
                'id' => $k->id,
                'title' => $k->nama_kegiatan,
                'date' => $k->tanggal,
                'time' => $k->waktu ?? 'N/A',
                'location' => $k->lokasi ?? '-',
                'type' => 'event'
            ]);

        // 4. Inventaris
        $totalItem = Inventaris::count();
        $baik = Inventaris::where('kondisi', 'baik')->count();
        $perluPerbaikan = Inventaris::where('kondisi', 'perlu_perbaikan')->count();
        $rusak = Inventaris::where('kondisi', 'rusak')->count();

        // 5. Keuangan Ringkasan
        // pemasukan dan pengeluaran bulan ini
        $now = now();
        $pemasukan = Keuangan::where('jenis', 'pemasukan')
            ->whereMonth('tanggal', $now->month)
            ->whereYear('tanggal', $now->year)
            ->sum('jumlah');
        $pengeluaran = Keuangan::where('jenis', 'pengeluaran')
            ->whereMonth('tanggal', $now->month)
            ->whereYear('tanggal', $now->year)
            ->sum('jumlah');
        // saldo = total pemasukan - total pengeluaran
        $saldo = Keuangan::where('jenis', 'pemasukan')->sum('jumlah') - Keuangan::where('jenis', 'pengeluaran')->sum('jumlah');
        $selisih = $pemasukan - $pengeluaran;

        return inertia('dashboard/index', [
            'dashboardData' => [
                'stats' => [
                    'anggota' => [
                        'total' => $totalAnggota,
                        'trend' => $anggotaTrend,
                        'change' => $anggotaChange
                    ],
                    'agenda' => [
                        'total' => $agendaBulanIni,
                        'trend' => $agendaTrend,
                        'change' => $agendaChange
                    ],
                    'pengumuman' => [
                        'total' => $pengumumanAktif,
                        'trend' => $pengumumanTrend,
                        'change' => $pengumumanChange
                    ],
                    'artikel' => [
                        'total' => $artikelTerpublikasi,
                        'trend' => $artikelTrend,
                        'change' => $artikelChange
                    ],
                ],
                'recentActivities' => $recent,
                'upcomingEvents' => $upcomingEvents,
                'inventaris' => [
                    'totalItem' => $totalItem,
                    'baik' => $baik,
                    'perluPerbaikan' => $perluPerbaikan,
                    'rusak' => $rusak,
                ],
                'keuangan' => [
                    'pemasukan' => $pemasukan,
                    'pengeluaran' => $pengeluaran,
                    'saldo' => $saldo,
                    'selisih' => $selisih,
                ],
            ]
        ]);
    }
}
