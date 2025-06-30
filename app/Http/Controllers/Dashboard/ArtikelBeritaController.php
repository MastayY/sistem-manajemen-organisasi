<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Artikel;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArtikelBeritaController extends Controller
{
    public function index()
    {
        $artikels = Artikel::with('penulis')->orderBy('created_at', 'desc')->get();

        return Inertia::render('dashboard/aktivitas', [
            'aktivitasData' => $artikels,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'jenis' => 'required|in:artikel,berita',
            'tanggal' => 'required|date',
            'konten' => 'required|string',
            'kategori' => 'required|string',
            'status' => 'required|in:draft,published,archived',
            'cover_image' => 'nullable|image|max:2048',
        ]);

        $coverImagePath = null;
        if ($request->hasFile('cover_image')) {
            $coverImagePath = $request->file('cover_image')->store('cover_images', 'public');
        }

        Artikel::create([
            ...$request->except('cover_image'),
            'id_penulis' => auth()->user()->id,
            'cover_image' => $coverImagePath,
        ]);

        return redirect()->back()->with('success', 'Konten berhasil ditambahkan!');
    }

    public function show($id)
    {
        $artikel = Artikel::findOrFail($id);
        return response()->json($artikel);
    }

    public function update(Request $request, $id)
    {
        $artikel = Artikel::findOrFail($id);

        $request->validate([
            'judul' => 'required|string|max:255',
            'jenis' => 'required|string',
            'kategori' => 'nullable|string|max:100',
            'tanggal' => 'required|date',
            'konten' => 'required|string',
            'status' => 'required|in:draft,published,archived',
            'cover_image' => 'nullable|image|max:2048',
        ]);

        // update cover image jika diubah
        if ($request->hasFile('cover_image')) {
            if ($artikel->cover_image) {
                Storage::disk('public')->delete($artikel->cover_image);
            }

            $coverPath = $request->file('cover_image')->store('cover_artikel', 'public');
            $artikel->cover_image = $coverPath;
        }

        $artikel->update($request->only([
            'judul', 'jenis', 'kategori', 'tanggal', 'konten', 'status'
        ]));

        return redirect()->back()->with('success', 'Artikel berhasil diupdate!');
    }

    public function destroy($id)
    {
        $artikel = Artikel::findOrFail($id);

        if ($artikel->cover_image) {
            Storage::disk('public')->delete($artikel->cover_image);
        }

        $artikel->delete();

        return redirect()->back()->with('success', 'Artikel berhasil dihapus!');
    }
}
