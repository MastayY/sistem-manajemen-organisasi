<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengumuman extends Model
{
    protected $primaryKey = 'id_pengumuman';

    protected $fillable = [
        'judul',
        'isi',
        'tanggal',
        'waktu',
        'lokasi',
        'id_pembuat',
        'target',
    ];

    public function pembuat()
    {
        return $this->belongsTo(User::class, 'id_pembuat');
    }

    public function penerima()
    {
        return $this->hasMany(PenerimaPengumuman::class, 'id_pengumuman', 'id_pengumuman');
    }
}
