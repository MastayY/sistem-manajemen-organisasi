<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PresensiRapat;
use App\Models\User;


class Rapat extends Model
{
    protected $fillable = [
        'judul',
        'tanggal',
        'waktu',
        'lokasi',
        'pembuat',
        'agenda',
        'kode_presensi',
        'status',
    ];

    public function presensi()
    {
        return $this->hasMany(PresensiRapat::class);
    }

    public function pembuat()
    {
        return $this->belongsTo(User::class, 'pembuat');
    }

    public function scopeSearch($query, $search)
    {
        return $query->where('judul', 'like', "%{$search}%")
            ->orWhere('lokasi', 'like', "%{$search}%")
            ->orWhere('pimpinan', 'like', "%{$search}%");
    }
}
