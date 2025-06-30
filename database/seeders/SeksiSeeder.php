<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Seksi;

class SeksiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seksis = [
            ['nama_seksi' => 'Kelistrikan'],
            ['nama_seksi' => 'Perikanan'],
            ['nama_seksi' => 'Bekakas'],
            ['nama_seksi' => 'Kehutanan'],
            ['nama_seksi' => 'Sinoman'],
            ['nama_seksi' => 'Humas'],
        ];

        foreach ($seksis as $seksi) {
            Seksi::create($seksi);
        }
    }
}
