<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\SeksiSeeder;
use Database\Seeders\JabatanSeeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::create([
            'nama' => 'Superadmin',
            'alamat' => 'Jl. Contoh No. 1',
            'telepon' => '085643094917',
            'email' => 'superadmin@cakra.org',
            'jenis_kelamin' => 'Laki-laki',
            'status' => 'Aktif',
            'role' => 'superadmin',
            'id_jabatan' => null,
            'id_seksi' => null,
            'koordinator' => false,
            'password' => Hash::make('IX1429Hw1f'),
        ]);

        $this->call([
            JabatanSeeder::class,
            SeksiSeeder::class,
        ]);
    }
}
