<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    protected $primaryKey = 'id_kegiatan';

    protected $fillable = ['nama_kegiatan', 'tanggal', 'waktu','lokasi', 'status', 'image'];
}
