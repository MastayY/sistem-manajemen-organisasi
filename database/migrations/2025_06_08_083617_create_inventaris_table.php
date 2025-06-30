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
        Schema::create('inventaris', function (Blueprint $table) {
            $table->id('id_barang');
            $table->string('nama');
            $table->string('kategori');
            $table->integer('jumlah');
            $table->enum('kondisi', ['baik', 'perlu_perbaikan', 'rusak']);
            $table->string('lokasi');
            $table->date('tanggal_beli');
            $table->bigInteger('harga');
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris');
    }
};
