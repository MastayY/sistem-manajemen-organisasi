<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    protected $fillable = [
        'judul',
        'jenis',
        'tanggal',
        'id_penulis',
        'konten',
        'kategori',
        'status',
        'views',
        'cover_image',
    ];

    public function penulis()
    {
        return $this->belongsTo(User::class, 'id_penulis', 'id');
    }
}
