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
        Schema::create('rapats', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->date('tanggal');
            $table->time('waktu');
            $table->string('lokasi');
            // pembuat
            $table->foreignId('pembuat')->constrained('users')->onDelete('cascade');
            $table->text('agenda');
            $table->string('kode_presensi')->unique()->nullable();
            $table->enum('status', ['berlangsung', 'selesai'])->default('berlangsung');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rapats');
    }
};
