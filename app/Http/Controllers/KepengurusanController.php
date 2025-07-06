<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Jabatan;
use App\Models\Seksi;
use Inertia\Inertia;

class KepengurusanController extends Controller
{
    public function index() 
    {
        $anggota = User::with(['jabatan', 'seksi'])->get();

        return Inertia::render('kepengurusan', [
            'anggota' => $anggota,
            'jabatan' => Jabatan::all(),
            'seksi' => Seksi::all(),
        ]);
    }
}
