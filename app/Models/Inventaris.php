<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventaris extends Model
{
    protected $fillable = [
        'nama', 'kategori', 'jumlah', 'kondisi', 'lokasi', 'tanggal_beli', 'harga', 'keterangan'
    ];
}
