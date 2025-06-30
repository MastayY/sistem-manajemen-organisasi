<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PeminjamanInventaris extends Model
{
    protected $primaryKey = 'id_peminjaman';

    protected $fillable = ['id_barang', 'id_anggota', 'tanggal_pinjam', 'tanggal_kembali', 'status', 'keterangan'];

    public function barang()
    {
        return $this->belongsTo(Inventaris::class, 'id_barang');
    }

    public function anggota()
    {
        return $this->belongsTo(User::class, 'id_anggota');
    }
}
