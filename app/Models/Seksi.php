<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seksi extends Model
{
    protected $primaryKey = 'id_seksi';

    protected $fillable = ['nama_seksi'];

    public function users()
    {
        return $this->hasMany(User::class, 'id_seksi', 'id_seksi');
    }
}
