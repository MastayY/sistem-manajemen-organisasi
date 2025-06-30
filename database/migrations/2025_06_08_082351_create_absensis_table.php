<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('absensis', function (Blueprint $table) {
            $table->id('id_absensi');
            $table->foreignId('id_anggota')->constrained('users', 'id')->onDelete('cascade');
            $table->foreignId('id_kegiatan')->constrained('kegiatans', 'id_kegiatan')->onDelete('cascade');
            $table->string('status_kehadiran'); // Hadir/Izin/Tidak Hadir
            $table->string('kode_absensi', 6)->unique(); // Kode unik absensi, nullable jika belum diinput
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absensis');
    }
};
