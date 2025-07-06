<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Kegiatan;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KegiatanController extends Controller
{
    public function index()
    {
        $kegiatan = Kegiatan::orderByDesc('created_at')->get();
        return Inertia::render('dashboard/agenda', [
            'kegiatan' => $kegiatan
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_kegiatan' => 'required|string',
            'tanggal' => 'required|date',
            'waktu' => 'nullable|date_format:H:i',
            'lokasi' => 'required|string',
            'status' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('kegiatan', 'public');
        }

        Kegiatan::create([
            'nama_kegiatan' => $request->nama_kegiatan,
            'tanggal' => $request->tanggal,
            'waktu' => $request->waktu, // Optional, can be null
            'lokasi' => $request->lokasi,
            'status' => $request->status,
            'image' => $imagePath,
        ]);

        return redirect()->back();
    }

    public function show($id)
    {
        return Kegiatan::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $kegiatan = Kegiatan::findOrFail($id);

        if (!$kegiatan) {
            return redirect()->back()->withErrors(['message' => 'Kegiatan not found']);
        }

        $request->validate([
            'nama_kegiatan' => 'sometimes|required|string',
            'tanggal' => 'sometimes|required|date',
            'waktu' => 'nullable|date_format:H:i',
            'lokasi' => 'sometimes|required|string',
            'status' => 'sometimes|required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        // convert waktu to H:i format
        if ($request->has('waktu')) {
            $request->merge(['waktu' => date('H:i', strtotime($request->waktu))]);
        }

        $imagePath = $kegiatan->image;
        if ($request->hasFile('image')) {
            // Optional: Delete old image
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('kegiatan', 'public');
        }

        // debug the request data
        // dd($request->all());

        $kegiatan->update([
            'nama_kegiatan' => $request->nama_kegiatan ?? $kegiatan->nama_kegiatan,
            'tanggal' => $request->tanggal,
            'waktu' => $request->waktu, // Optional, can be null
            'lokasi' => $request->lokasi,
            'status' => $request->status,
            'image' => $imagePath,
        ]);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $kegiatan = Kegiatan::findOrFail($id);
        if ($kegiatan->image) {
            Storage::disk('public')->delete($kegiatan->image);
        }
        $kegiatan->delete();

        return redirect()->back();
    }
}
