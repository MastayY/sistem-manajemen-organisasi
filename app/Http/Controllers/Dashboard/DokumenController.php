<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Dokumen;
use App\Models\KeluargaBerduka;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\TemplateProcessor;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\Writer\Word2007;
use PhpOffice\PhpWord\Writer\HTML;
use PhpOffice\PhpWord\Writer\RTF;
use PhpOffice\PhpWord\Writer\ODText;
use PhpOffice\PhpWord\Writer\PDF;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DokumenController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/dokumen', [
            'dokumenData' => Dokumen::with(['pembuat', 'keluargaBerduka'])->latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'jenis' => 'required|in:notulensi,lelayu,lainnya',
        ]);
        
        // dd($request->all());
        $data = $request->all();
        $data['id_pembuat'] = auth()->id();
        $data['status'] = "selesai";

        if ($request->jenis === 'notulensi') {
            $templatePath = storage_path('app/templates/TEMPLATE_NOTULENSI.docx');
            $templateProcessor = new TemplateProcessor($templatePath);

            // Ganti variabel dari template
            $templateProcessor->setValue('judul', $request->judul);
            $templateProcessor->setValue('tanggal', Carbon::parse($request->tanggal)->translatedFormat('d F Y'));
            $templateProcessor->setValue('waktu', $request->waktu);
            $templateProcessor->setValue('lokasi', $request->tempat);
            $templateProcessor->setValue('pimpinan', $request->pimpinan_rapat);
            $templateProcessor->setValue('notulis', $request->notulis ?? auth()->user()->name);
            $templateProcessor->setValue('peserta', $request->peserta);
            $templateProcessor->setValue('agenda', $request->agenda);
            $templateProcessor->setValue('pembahasan', $request->pembahasan);
            $templateProcessor->setValue('keputusan', $request->keputusan);
            $templateProcessor->setValue('tindak_lanjut', $request->tindak_lanjut);


            // Simpan hasil generate
            $fileName = 'notulensi_' . now()->timestamp . '.docx';
            $savePath = storage_path("app/public/dokumen/{$fileName}");
            $templateProcessor->saveAs($savePath);
        }

        if ($request->jenis === 'lelayu') {
            $templatePath = storage_path('app/templates/TEMPLATE_LELAYU.docx');
            $templateProcessor = new TemplateProcessor($templatePath);

            // Ganti variabel dari template
            $templateProcessor->setValue('nama_organisasi', 'Karang Taruna Bhakti');
            $templateProcessor->setValue('alamat_organisasi', 'Jl. Merpati No. 123');
            $templateProcessor->setValue('gelar', $request->gelar);
            $templateProcessor->setValue('nama_almarhum', $request->nama_almarhum);
            $templateProcessor->setValue('usia', $request->usia);
            $templateProcessor->setValue('hari_meninggal', $request->hari_meninggal);
            $templateProcessor->setValue('tanggal_meninggal', Carbon::parse($request->tanggal_meninggal))->translatedFormat('d F Y');
            $templateProcessor->setValue('waktu_meninggal', $request->waktu_meninggal);
            $templateProcessor->setValue('tempat_meninggal', $request->tempat_meninggal);
            $templateProcessor->setValue('hari_pemakaman', $request->hari_pemakaman);
            $templateProcessor->setValue('tanggal_pemakaman', Carbon::parse($request->tanggal_pemakaman))->translatedFormat('d F Y');
            $templateProcessor->setValue('waktu_pemakaman', $request->waktu_pemakaman);
            $templateProcessor->setValue('tempat_pemakaman', $request->tempat_pemakaman);
            $templateProcessor->setValue('tempat', $request->lokasi_berita);
            // tanggal hari ini
            $templateProcessor->setValue('tanggal', Carbon::parse(now())->translatedFormat('d F Y'));
            $templateProcessor->setValue('ketua', 'Septian David');

            // Proses keluarga berduka sebagai string dengan format sesuai
            $keluargaString = '';
            foreach ($request->keluarga_berduka as $i => $kel) {
                $keluargaString .= ($i + 1) . ". {$kel['nama']} ({$kel['hubungan']})\n";
            }
            $templateProcessor->setValue('keluarga_berduka', $keluargaString);

            // Simpan hasil generate
            $fileName = 'lelayu_' . now()->timestamp . '.docx';
            $savePath = storage_path("app/public/dokumen/{$fileName}");
            $templateProcessor->saveAs($savePath);
        }

        // ⛳ SIMPAN KE DB
        $data['file_path'] = "dokumen/{$fileName}";
        $dokumen = Dokumen::create($data);

        // 💀 SIMPAN KELUARGA BERDUKA JIKA ADA
        if ($request->jenis === 'lelayu' && $request->keluarga_berduka) {
            foreach ($request->keluarga_berduka as $keluarga) {
                $dokumen->keluargaBerduka()->create($keluarga);
            }
        }


        return back()->with('success', 'Dokumen berhasil disimpan');
    }

    public function update(Request $request, $id)
    {
        $dokumen = Dokumen::findOrFail($id);

        $request->validate([
            'jenis' => 'required|in:notulensi,lelayu,lainnya',
        ]);

        // Hapus file lama jika ada
        if ($dokumen->file_path && Storage::disk('public')->exists($dokumen->file_path)) {
            Storage::disk('public')->delete($dokumen->file_path);
        }

        $fileName = null;

        if ($request->jenis === 'notulensi') {
            $templatePath = storage_path('app/templates/TEMPLATE_NOTULENSI.docx');
            $templateProcessor = new TemplateProcessor($templatePath);

            // Ganti variabel dari template
            $templateProcessor->setValue('judul', $request->judul);
            $templateProcessor->setValue('tanggal', Carbon::parse($request->tanggal)->translatedFormat('d F Y'));
            $templateProcessor->setValue('waktu', $request->waktu);
            $templateProcessor->setValue('lokasi', $request->tempat);
            $templateProcessor->setValue('pimpinan', $request->pimpinan_rapat);
            $templateProcessor->setValue('notulis', $request->notulis ?? auth()->user()->name);
            $templateProcessor->setValue('peserta', $request->peserta);
            $templateProcessor->setValue('agenda', $request->agenda);
            $templateProcessor->setValue('pembahasan', $request->pembahasan);
            $templateProcessor->setValue('keputusan', $request->keputusan);
            $templateProcessor->setValue('tindak_lanjut', $request->tindak_lanjut);

            // Simpan hasil generate
            $fileName = 'notulensi_' . now()->timestamp . '.docx';
            $savePath = storage_path("app/public/dokumen/{$fileName}");
            $templateProcessor->saveAs($savePath);
        }

        if ($request->jenis === 'lelayu') {
            $templatePath = storage_path('app/templates/TEMPLATE_LELAYU.docx');
            $templateProcessor = new TemplateProcessor($templatePath);

            $templateProcessor->setValue('nama_organisasi', 'Karang Taruna Bhakti');
            $templateProcessor->setValue('alamat_organisasi', 'Jl. Merpati No. 123');
            $templateProcessor->setValue('gelar', $request->gelar);
            $templateProcessor->setValue('nama_almarhum', $request->nama_almarhum);
            $templateProcessor->setValue('usia', $request->usia);
            $templateProcessor->setValue('hari_meninggal', $request->hari_meninggal);
            $templateProcessor->setValue('tanggal_meninggal', Carbon::parse($request->tanggal_meninggal)->translatedFormat('d F Y'));
            $templateProcessor->setValue('waktu_meninggal', $request->waktu_meninggal);
            $templateProcessor->setValue('tempat_meninggal', $request->tempat_meninggal);
            $templateProcessor->setValue('hari_pemakaman', $request->hari_pemakaman);
            $templateProcessor->setValue('tanggal_pemakaman', Carbon::parse($request->tanggal_pemakaman)->translatedFormat('d F Y'));
            $templateProcessor->setValue('waktu_pemakaman', $request->waktu_pemakaman);
            $templateProcessor->setValue('tempat_pemakaman', $request->tempat_pemakaman);
            $templateProcessor->setValue('tempat', $request->lokasi_berita);
            $templateProcessor->setValue('tanggal', Carbon::now()->translatedFormat('d F Y'));
            $templateProcessor->setValue('ketua', 'Septian David');

            // Format daftar keluarga
            $keluargaString = '';
            foreach ($request->keluarga_berduka as $i => $kel) {
                $keluargaString .= ($i + 1) . ". {$kel['nama']} ({$kel['hubungan']})\n";
            }
            $templateProcessor->setValue('keluarga_berduka', $keluargaString);

            $fileName = 'lelayu_' . now()->timestamp . '.docx';
            $savePath = storage_path("app/public/dokumen/{$fileName}");
            $templateProcessor->saveAs($savePath);
        }

        // Update field file_path
        $updateData = $request->except(['keluarga_berduka']);
        $updateData['file_path'] = "dokumen/{$fileName}";
        $dokumen->update($updateData);

        // Hapus dan simpan ulang keluarga berduka jika ada
        if ($request->jenis === 'lelayu') {
            $dokumen->keluargaBerduka()->delete();
            foreach ($request->keluarga_berduka as $keluarga) {
                $dokumen->keluargaBerduka()->create($keluarga);
            }
        }

        return back()->with('success', 'Dokumen berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $dokumen = Dokumen::findOrFail($id);

        // Hapus file jika ada dan file path valid
        if ($dokumen->file_path && Storage::disk('public')->exists($dokumen->file_path)) {
            Storage::disk('public')->delete($dokumen->file_path);
        }

        // Hapus data dokumen dan relasi keluarga berduka jika ada
        if ($dokumen->jenis === 'lelayu') {
            $dokumen->keluargaBerduka()->delete();
        }

        $dokumen->delete();

        return back()->with('success', 'Dokumen dan file berhasil dihapus!');
    }

    public function show($id)
    {
        $dokumen = Dokumen::with('keluargaBerduka')->findOrFail($id);
        return response()->json($dokumen);
    }

    public function download($id)
    {
        $dokumen = Dokumen::findOrFail($id);

        if (!Storage::disk('public')->exists($dokumen->file_path)) {
            abort(404, 'File tidak ditemukan.');
        }

        return Storage::disk('public')->download($dokumen->file_path);
    }
}
