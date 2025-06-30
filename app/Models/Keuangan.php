<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Keuangan extends Model
{
    protected $fillable = [
        'tanggal', 'jenis', 'kategori', 'jumlah', 'penanggung_jawab', 'keterangan'
    ];

    public function penanggungJawab()
    {
        return $this->belongsTo(User::class, 'penanggung_jawab', 'id');
    }
}
