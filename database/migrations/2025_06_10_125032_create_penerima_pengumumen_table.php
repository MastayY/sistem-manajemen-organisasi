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
        Schema::create('penerima_pengumumen', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('id_pengumuman')->constrained('pengumumen', 'id_pengumuman')->onDelete('cascade');
            $table->foreignId('id_anggota')->constrained('users', 'id')->onDelete('cascade');
            $table->string('status_kirim');
            $table->string('metode');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penerima_pengumumen');
    }
};
