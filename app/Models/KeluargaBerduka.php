<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KeluargaBerduka extends Model
{
    protected $fillable = ['id_dokumen', 'nama', 'hubungan'];

    public function dokumen()
    {
        return $this->belongsTo(Dokumen::class, 'id_dokumen');
    }
}
