<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pengumuman;
use Inertia\Inertia;
use App\Models\User;
use App\Models\PenerimaPengumuman;
use Illuminate\Support\Facades\DB;

class PengumumanController extends Controller
{
    public function index()
    {
        $pengumuman = Pengumuman::with(['pembuat', 'penerima'])->orderByDesc('created_at')->get();
        $anggota = User::with('jabatan')
        ->where('status', 'Aktif') // jika ingin hanya yang aktif
        ->get();

        return Inertia::render('dashboard/pengumuman', [
            'pengumuman' => $pengumuman,
            'anggota' => $anggota,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'tanggal' => 'required|date',
            'waktu' => 'nullable|date_format:H:i',
            'lokasi' => 'nullable|string|max:255',
            'target' => 'array', // <-- pastikan array!
            'target.*' => 'exists:users,id',
        ]);

        // dd($request->all());

        DB::beginTransaction();
        try {
            $pengumuman = Pengumuman::create([
                'judul' => $request->judul,
                'isi' => $request->isi,
                'tanggal' => $request->tanggal,
                'waktu' => $request->waktu,
                'lokasi' => $request->lokasi,
                'id_pembuat' => auth()->id(),
                'target' => 'Khusus', // atau 'Semua' jika target kosong
            ]);

            // Insert penerima
            foreach ($request->target as $idAnggota) {
                PenerimaPengumuman::create([
                    'id_pengumuman' => $pengumuman->id_pengumuman,
                    'id_anggota' => $idAnggota,
                    'status_kirim' => 'terkirim',
                    'metode' => 'in-app',
                ]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return dd($e->getMessage());
        }

        return redirect()->back();
    }

    public function show($id)
    {
        return Pengumuman::with('penerima.anggota')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $pengumuman = Pengumuman::findOrFail($id);
        if (!$pengumuman) {
            return redirect()->back()->withErrors(['message' => 'Pengumuman not found']);
        }
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'tanggal' => 'required|date',
            'waktu' => 'nullable|date_format:H:i',
            'lokasi' => 'nullable|string|max:255',
            'target' => 'nullable|string|max:255',
        ]);
        $pengumuman->update([
            'judul' => $request->judul,
            'isi' => $request->isi,
            'tanggal' => $request->tanggal,
            'waktu' => $request->waktu,
            'lokasi' => $request->lokasi,
            'target' => 'Semua',
        ]);
        return redirect()->back();
    }

    public function destroy($id)
    {
        $pengumuman = Pengumuman::findOrFail($id);
        if (!$pengumuman) {
            return redirect()->back()->withErrors(['message' => 'Pengumuman not found']);
        }
        $pengumuman->delete();
        return redirect()->back();
    }
}
