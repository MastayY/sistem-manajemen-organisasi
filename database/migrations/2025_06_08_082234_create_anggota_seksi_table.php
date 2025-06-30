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
        Schema::create('anggota_seksi', function (Blueprint $table) {
            $table->foreignId('id_anggota')->constrained('users')->onDelete('cascade');
            $table->foreignId('id_seksi')->constrained('seksis', 'id_seksi')->onDelete('cascade');
            $table->primary(['id_anggota', 'id_seksi']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggota_seksi');
    }
};
