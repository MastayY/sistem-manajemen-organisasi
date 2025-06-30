<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use App\Models\Jabatan;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nama',
        'alamat',
        'telepon',
        'email',
        'jenis_kelamin',
        'status',
        'role',
        'id_jabatan',
        'id_seksi',
        'koordinator',
        'password',
    ];

    public function isSuperAdmin()
    {
        return $this->role === 'superadmin';
    }

    public function isAnggota()
    {
        return $this->role === 'anggota';
    }

    public function isKoordinator()
    {
        return $this->koordinator === True;
    }

    public function jabatan()
    {
        return $this->belongsTo(Jabatan::class, 'id_jabatan', 'id_jabatan');
    }

    public function seksi()
    {
        return $this->belongsTo(Seksi::class, 'id_seksi', 'id_seksi');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
