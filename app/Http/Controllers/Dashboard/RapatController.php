<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rapat;
use App\Models\User;
use App\Models\PresensiRapat;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RapatController extends Controller
{
    public function index()
    {
        $rapats = Rapat::with('presensi.user')->latest()->get();
        $users = User::with('jabatan')->get();
        return Inertia::render('dashboard/rapat', [
            'rapatData' => $rapats,
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'judul' => 'required',
            'tanggal' => 'required|date',
            'waktu' => 'required',
            'lokasi' => 'required',
            'agenda' => 'required',
        ]);

        $data['kode_presensi'] = Str::upper(Str::random(6));
        $data['pembuat'] = auth()->id(); // ID pembuat rapat
        $rapat = Rapat::create($data);

        // Buat presensi default untuk semua user aktif
        foreach (User::where('status', 'Aktif')->get() as $user) {
            $rapat->presensi()->create([
                'user_id' => $user->id,
                'status' => 'tidak_hadir',
            ]);
        }

        return redirect()->back()->with('success', 'Rapat berhasil dibuat!');
    }

    public function presensi(Request $request)
    {
        $request->validate(['kode_presensi' => 'required|string|size:6']);

        $rapat = Rapat::where('kode_presensi', $request->kode_presensi)->first();
        if (!$rapat) return back()->withErrors(['kode_presensi' => 'Kode tidak ditemukan']);

        $presensi = PresensiRapat::where('rapat_id', $rapat->id)->where('user_id', auth()->id())->first();
        if (!$presensi) return back()->withErrors(['kode_presensi' => 'Presensi belum tersedia untuk Anda.']);

        $presensi->update([
            'status' => 'hadir',
            'waktu_presensi' => now()->format('H:i:s'),
        ]);

        return back()->with('success', 'Presensi berhasil dicatat.');
    }

    public function show($id)
    {
        $rapat = Rapat::with(['presensi.user'])->findOrFail($id);
        return Inertia::render('dashboard/rapat-detail', ['rapat' => $rapat]);
    }

    public function update(Request $request, $id)
    {
        $rapat = Rapat::findOrFail($id);
        $data = $request->validate([
            'judul' => 'required',
            'tanggal' => 'required|date',
            'waktu' => 'required',
            'lokasi' => 'required',
            'agenda' => 'required',
            'status' => 'nullable|in:berlangsung,selesai', // status rapat
        ]);

        // kalau status di set ke selesai maka update kode presensinya menjadi kosong/null
        if ($data['status'] === 'selesai') {
            $data['kode_presensi'] = null; // hapus kode presensi jika rapat sudah selesai
        } else {
            $data['kode_presensi'] = $rapat->kode_presensi; // tetap gunakan kode yang sama
        }

        $rapat->update($data);
        return redirect()->back()->with('success', 'Rapat berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $rapat = Rapat::findOrFail($id);
        $rapat->delete();
        return redirect()->back()->with('success', 'Rapat berhasil dihapus!');
    }


}
