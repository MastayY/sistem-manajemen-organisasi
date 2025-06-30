<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PenerimaPengumuman extends Model
{
    public $incrementing = false;

    protected $primaryKey = 'id';

    protected $fillable = ['id_pengumuman', 'id_anggota', 'status_kirim', 'metode'];

    public function pengumuman()
    {
        return $this->belongsTo(Pengumuman::class, 'id_pengumuman');
    }

    public function anggota()
    {
        return $this->belongsTo(User::class, 'id_anggota');
    }
}
