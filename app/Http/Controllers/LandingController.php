<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artikel;
use App\Models\Kegiatan;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $artikelBerita = Artikel::select('id', 'judul as title', 'tanggal as date', 'cover_image as image', 'konten as description', 'jenis as type')
            ->latest()
            ->take(3)
            ->get();

        $agenda = Kegiatan::select('id_kegiatan', 'nama_kegiatan as title', 'tanggal as date', 'lokasi', 'waktu', 'image')
            ->orderBy('tanggal', 'desc')
            ->take(3)
            ->get();

        return Inertia::render('welcome', [
            'articles' => $artikelBerita,
            'agenda' => $agenda,
        ]);
    }
}
