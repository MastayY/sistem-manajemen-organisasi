<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    use HasFactory;

    protected $fillable = ['id_anggota', 'id_kegiatan', 'kode_absen', 'status_kehadiran'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($absensi) {
            $absensi->kode_absen = strtoupper(Str::random(6));
        });
    }

    public function anggota()
    {
        return $this->belongsTo(User::class, 'id_anggota');
    }

    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class, 'id_kegiatan');
    }
}
