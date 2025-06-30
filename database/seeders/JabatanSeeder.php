<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Jabatan;

class JabatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jabatans = [
            ['nama_jabatan' => 'Ketua'],
            ['nama_jabatan' => 'Wakil Ketua'],
            ['nama_jabatan' => 'Sekretaris I'],
            ['nama_jabatan' => 'Sekretaris II'],
            ['nama_jabatan' => 'Bendahara I'],
            ['nama_jabatan' => 'Bendahara II'],
            ['nama_jabatan' => 'Koordinator Seksi'],
            ['nama_jabatan' => 'Anggota Seksi'],
            ['nama_jabatan' => 'Anggota Umum'],
        ];

        foreach ($jabatans as $jabatan) {
            Jabatan::create($jabatan);
        }
    }
}
