<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artikel;
use Inertia\Inertia;

class ArtikelBeritaLandingController extends Controller
{
    public function index()
    {
        $artikelBerita = Artikel::select('id', 'judul as title', 'tanggal as date', 'cover_image as image', 'konten as description', 'jenis as type')
            ->latest()
            ->get();

        return Inertia::render('aktivitas', [
            'activities' => $artikelBerita,
        ]);
    }
}
