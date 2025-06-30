<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dokumen extends Model
{
    protected $primaryKey = 'id_dokumen';
    protected $fillable = [
        'id_pembuat', 'jenis', 'judul', 'tanggal', 'waktu', 'tempat',
        'pimpinan_rapat', 'notulis', 'peserta', 'agenda', 'pembahasan', 'keputusan', 'tindak_lanjut',
        'nama_almarhum', 'usia', 'alamat', 'hari_meninggal', 'tanggal_meninggal',
        'waktu_meninggal', 'tempat_meninggal', 'hari_pemakaman', 'tanggal_pemakaman',
        'waktu_pemakaman', 'tempat_pemakaman', 'lokasi_berita', 'tanggal_berita',
        'status', 'format', 'file_path'
    ];

    public function pembuat()
    {
        return $this->belongsTo(User::class, 'id_pembuat');
    }

    public function keluargaBerduka()
    {
        return $this->hasMany(KeluargaBerduka::class, 'id_dokumen');
    }
}
