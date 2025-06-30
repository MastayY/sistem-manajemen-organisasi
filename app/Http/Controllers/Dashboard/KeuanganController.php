<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Keuangan;
use Inertia\Inertia;

class KeuanganController extends Controller
{
    public function index()
    {
        $keuangan = Keuangan::with('penanggungJawab')->orderByDesc('tanggal')->get();
        return Inertia::render('dashboard/keuangan', [
            'keuanganData' => $keuangan,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tanggal' => 'required|date',
            'jenis' => 'required|in:pemasukan,pengeluaran',
            'kategori' => 'required|string',
            'jumlah' => 'required|integer|min:0',
            'keterangan' => 'nullable|string',
        ]);

        Keuangan::create([
            ...$request->only(['tanggal', 'jenis', 'kategori', 'jumlah', 'keterangan']),
            'penanggung_jawab' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Transaksi berhasil disimpan!');
    }

    public function update(Request $request, $id)
    {
        $keuangan = Keuangan::findOrFail($id);

        $request->validate([
            'tanggal' => 'required|date',
            'jenis' => 'required|in:pemasukan,pengeluaran',
            'kategori' => 'required|string',
            'jumlah' => 'required|integer|min:0',
            'keterangan' => 'nullable|string',
        ]);

        $keuangan->update($request->only(['tanggal', 'jenis', 'kategori', 'jumlah', 'keterangan']));

        return redirect()->back()->with('success', 'Transaksi berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $keuangan = Keuangan::findOrFail($id);
        $keuangan->delete();
        return redirect()->back()->with('success', 'Transaksi dihapus!');
    }

    public function show($id)
    {
        $keuangan = Keuangan::findOrFail($id);
        return response()->json($keuangan);
    }
}
