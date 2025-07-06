<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pengumuman;
use Inertia\Inertia;
use App\Models\User;
use App\Models\PenerimaPengumuman;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
            $targetNumbers = [];
            foreach ($request->target as $idAnggota) {
                PenerimaPengumuman::create([
                    'id_pengumuman' => $pengumuman->id_pengumuman,
                    'id_anggota' => $idAnggota,
                    'status_kirim' => 'terkirim',
                    'metode' => 'in-app',
                ]);

                // Ambil nomor telepon anggota
                $anggota = User::findOrFail($idAnggota);

                $no = preg_replace('/^0/', '62', $anggota->telepon);
                $targetNumbers[] = $no;
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return dd($e->getMessage());
        }

        // Buat pesan WhatsApp
        $message = "🔔 *PENGUMUMAN KARANG TARUNA CAKRA WIJAYA*\n\n";
        $message .= "📢 *" . strtoupper($request->judul) . "*\n\n";
        $message .= "{$request->isi}\n\n";

        if ($request->tanggal || $request->lokasi) {
            $message .= "📅 *Detail Kegiatan:*\n";
            if ($request->tanggal) {
                $message .= "• Tanggal: " . Carbon::parse($request->tanggal)->translatedFormat('l, d F Y') . "\n";
            }
            if ($request->waktu) {
                $message .= "• Waktu: {$request->waktu}\n";
            }
            if ($request->lokasi) {
                $message .= "• Lokasi: {$request->lokasi}\n";
            }
        }

        $message .= "\n---\nTerima kasih atas perhatiannya.\n\n";
        $message .= "_Karang Taruna Cakra Wijaya_\n_Kelurahan Cakra Wijaya_";

        // Kirim ke Fonnte
        $this->kirimWhatsapp(implode(',', $targetNumbers), $message);

        return redirect()->back();
    }

    private function kirimWhatsapp($target, $message)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => array(
                'target' => $target,
                'message' => $message,
                'countryCode' => '62',
                'delay' => '15-20'
            ),
            CURLOPT_HTTPHEADER => array(
                'Authorization: ' . env('FONNTE_TOKEN')
            ),
        ));

        $response = curl_exec($curl);

        if (curl_errno($curl)) {
            \Log::error('Fonnte Error: ' . curl_error($curl));
        }

        curl_close($curl);
        \Log::info('Fonnte Response: ' . $response);
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
