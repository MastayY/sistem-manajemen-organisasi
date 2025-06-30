<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Inventaris;
use Inertia\Inertia;

class InventarisController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/inventaris', [
            'inventarisData' => Inventaris::orderByDesc('created_at')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'kategori' => 'required|string',
            'jumlah' => 'required|integer|min:1',
            'kondisi' => 'required|in:baik,perlu_perbaikan,rusak',
            'lokasi' => 'required|string',
            'tanggal_beli' => 'required|date',
            'harga' => 'required|numeric|min:0',
            'keterangan' => 'nullable|string',
        ]);

        Inventaris::create($request->all());

        return redirect()->back()->with('success', 'Item inventaris berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'kategori' => 'required|string',
            'jumlah' => 'required|integer|min:1',
            'kondisi' => 'required|in:baik,perlu_perbaikan,rusak',
            'lokasi' => 'required|string',
            'tanggal_beli' => 'required|date',
            'harga' => 'required|numeric|min:0',
            'keterangan' => 'nullable|string',
        ]);

        $item = Inventaris::findOrFail($id);
        $item->update($request->all());

        return redirect()->back()->with('success', 'Item inventaris berhasil diupdate!');
    }

    public function destroy($id)
    {
        $item = Inventaris::findOrFail($id);
        $item->delete();

        return redirect()->back()->with('success', 'Item inventaris berhasil dihapus.');
    }

    public function show($id)
    {
        $item = Inventaris::findOrFail($id);
        return response()->json($item);
    }
}
