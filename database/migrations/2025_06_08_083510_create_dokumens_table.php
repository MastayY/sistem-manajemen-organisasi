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
        Schema::create('dokumens', function (Blueprint $table) {
            $table->id('id_dokumen');
            $table->foreignId('id_pembuat')->constrained('users', 'id')->onDelete('cascade');
            $table->enum('jenis', ['notulensi', 'lelayu', 'lainnya']);
            $table->string('judul')->nullable();
            $table->date('tanggal')->nullable();
            $table->string('waktu')->nullable();
            $table->string('tempat')->nullable();
            $table->string('pimpinan_rapat')->nullable();
            $table->string('notulis')->nullable();
            $table->text('peserta')->nullable();
            $table->text('agenda')->nullable();
            $table->text('pembahasan')->nullable();
            $table->text('keputusan')->nullable();
            $table->text('tindak_lanjut')->nullable();

            // Data lelayu
            $table->string('nama_almarhum')->nullable();
            $table->string('usia')->nullable();
            $table->string('alamat')->nullable();
            $table->string('hari_meninggal')->nullable();
            $table->date('tanggal_meninggal')->nullable();
            $table->string('waktu_meninggal')->nullable();
            $table->string('tempat_meninggal')->nullable();
            $table->string('hari_pemakaman')->nullable();
            $table->date('tanggal_pemakaman')->nullable();
            $table->string('waktu_pemakaman')->nullable();
            $table->string('tempat_pemakaman')->nullable();
            $table->string('lokasi_berita')->nullable();
            $table->date('tanggal_berita')->nullable();

            $table->enum('status', ['draft', 'selesai'])->default('draft');
            $table->string('format')->default('PDF'); // PDF atau DOCX
            $table->string('file_path')->nullable(); // Path ke dokumen
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumens');
    }
};
