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
        Schema::create('pengumumen', function (Blueprint $table) {
            $table->id('id_pengumuman');
            $table->string('judul');
            $table->text('isi');
            $table->date('tanggal');
            $table->time('waktu')->nullable(); // Optional, can be null
            $table->string('lokasi');
            $table->foreignId('id_pembuat')->constrained('users', 'id')->onDelete('cascade');
            $table->string('target'); // Semua/Divisi/Seksi/Individu
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengumumen');
    }
};
