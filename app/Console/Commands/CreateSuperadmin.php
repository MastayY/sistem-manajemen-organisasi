<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class CreateSuperadmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:superadmin 
                            {--name= : Nama lengkap superadmin}
                            {--email= : Email superadmin}
                            {--password= : Password superadmin}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Membuat user superadmin baru';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->option('name') ?? $this->ask('Masukkan nama lengkap superadmin');
        $email = $this->option('email') ?? $this->ask('Masukkan email superadmin');
        $password = $this->option('password') ?? $this->secret('Masukkan password superadmin');

        // Validasi input
        $validator = Validator::make([
            'nama' => $name,
            'email' => $email,
            'password' => $password,
        ], [
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            $this->error('Validasi gagal:');
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }
            return 1;
        }

        // Buat user superadmin
        $user = User::create([
            'nama' => $name,
            'alamat' => 'Alamat superadmin',
            'telepon' => '085643094917',
            'email' => $email,
            'jenis_kelamin' => 'Laki-laki',
            'tanggal_bergabung' => now(),
            'status' => 'Aktif',
            'role' => 'superadmin',
            'password' => Hash::make($password),
        ]);

        $this->info('Superadmin berhasil dibuat!');
        $this->line('Nama: '.$user->nama);
        $this->line('Email: '.$user->email);
        $this->line('Role: '.$user->role);

        return 0;
    }
}
