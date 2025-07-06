<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Rapat;
use App\Models\User;

class PresensiRapat extends Model
{
    protected $fillable = [
        'rapat_id',
        'user_id',
        'waktu_presensi',
        'status',
    ];

    public function rapat()
    {
        return $this->belongsTo(Rapat::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
