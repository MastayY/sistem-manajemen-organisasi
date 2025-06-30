<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Jabatan extends Model
{
    protected $primaryKey = 'id_jabatan';

    protected $fillable = ['nama_jabatan'];

    public function users()
    {
        return $this->hasMany(User::class, 'id_jabatan', 'id_jabatan');
    }
}
