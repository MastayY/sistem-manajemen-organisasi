<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Dashboard\KegiatanController;
use App\Http\Controllers\Dashboard\PengumumanController;
use App\Http\Controllers\Dashboard\AnggotaController;
use App\Http\Controllers\Dashboard\ArtikelBeritaController;
use App\Http\Controllers\Dashboard\KeuanganController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/kepengurusan', function () {
    return Inertia::render('kepengurusan');
})->name('kepengurusan');

Route::get('/aktivitas', function () {
    return Inertia::render('aktivitas');
})->name('aktivitas');

Route::get('/kontak', function () {
    return Inertia::render('kontak');
})->name('kontak');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');

    Route::get('dashboard/agenda', [KegiatanController::class, 'index'])->name('dashboard.agenda');
    Route::get('dashboard/agenda/create', [KegiatanController::class, 'create'])->name('dashboard.agenda.create');
    Route::post('dashboard/agenda', [KegiatanController::class, 'store'])->name('dashboard.agenda.store');
    Route::get('dashboard/agenda/{id}/edit', [KegiatanController::class, 'edit'])->name('dashboard.agenda.edit');
    Route::put('dashboard/agenda/{id}', [KegiatanController::class, 'update'])->name('dashboard.agenda.update');
    Route::delete('dashboard/agenda/{id}', [KegiatanController::class, 'destroy'])->name('dashboard.agenda.destroy');
    
    Route::get('dashboard/pengumuman', [PengumumanController::class, 'index'])->name('dashboard.pengumuman');
    Route::get('dashboard/pengumuman/create', [PengumumanController::class, 'create'])->name('dashboard.pengumuman.create');
    Route::post('dashboard/pengumuman', [PengumumanController::class, 'store'])->name('dashboard.pengumuman.store');
    Route::get('dashboard/pengumuman/{id}/edit', [PengumumanController::class, 'edit'])->name('dashboard.pengumuman.edit');
    Route::put('dashboard/pengumuman/{id}', [PengumumanController::class, 'update'])->name('dashboard.pengumuman.update');
    Route::delete('dashboard/pengumuman/{id}', [PengumumanController::class, 'destroy'])->name('dashboard.pengumuman.destroy');
    
    Route::get('/dashboard/aktivitas', [ArtikelBeritaController::class, 'index'])->name('dashboard.artikel');
    Route::post('/dashboard/aktivitas', [ArtikelBeritaController::class, 'store'])->name('dashboard.artikel.store');
    Route::get('/dashboard/aktivitas/{id}', [ArtikelBeritaController::class, 'show'])->name('dashboard.artikel.show');
    Route::put('/dashboard/aktivitas/{id}', [ArtikelBeritaController::class, 'update'])->name('dashboard.artikel.update');
    Route::delete('/dashboard/aktivitas/{id}', [ArtikelBeritaController::class, 'destroy'])->name('dashboard.artikel.destroy');
    
    Route::get('dashboard/anggota', [AnggotaController::class, 'index'])->name('dashboard.anggota');
    Route::get('dashboard/anggota/create', [AnggotaController::class, 'create'])->name('dashboard.anggota.create');
    Route::post('dashboard/anggota', [AnggotaController::class, 'store'])->name('dashboard.anggota.store');
    Route::get('dashboard/anggota/{id}/edit', [AnggotaController::class, 'edit'])->name('dashboard.anggota.edit');
    Route::put('dashboard/anggota/{id}', [AnggotaController::class, 'update'])->name('dashboard.anggota.update');
    Route::delete('dashboard/anggota/{id}', [AnggotaController::class, 'destroy'])->name('dashboard.anggota.destroy');

    Route::get('dashboard/keuangan', [App\Http\Controllers\Dashboard\KeuanganController::class, 'index'])->name('dashboard.keuangan');
    Route::post('dashboard/keuangan', [App\Http\Controllers\Dashboard\KeuanganController::class, 'store'])->name('dashboard.keuangan.store');
    Route::put('dashboard/keuangan/{id}', [App\Http\Controllers\Dashboard\KeuanganController::class, 'update'])->name('dashboard.keuangan.update');
    Route::delete('dashboard/keuangan/{id}', [App\Http\Controllers\Dashboard\KeuanganController::class, 'destroy'])->name('dashboard.keuangan.destroy');
    Route::get('dashboard/keuangan/{id}', [App\Http\Controllers\Dashboard\KeuanganController::class, 'show'])->name('dashboard.keuangan.show');

    Route::get('dashboard/inventaris', [App\Http\Controllers\Dashboard\InventarisController::class, 'index'])->name('dashboard.inventaris');
    Route::post('dashboard/inventaris', [App\Http\Controllers\Dashboard\InventarisController::class, 'store'])->name('dashboard.inventaris.store');
    Route::put('dashboard/inventaris/{id}', [App\Http\Controllers\Dashboard\InventarisController::class, 'update'])->name('dashboard.inventaris.update');
    Route::delete('dashboard/inventaris/{id}', [App\Http\Controllers\Dashboard\InventarisController::class, 'destroy'])->name('dashboard.inventaris.destroy');
    Route::get('dashboard/inventaris/{id}', [App\Http\Controllers\Dashboard\InventarisController::class, 'show'])->name('dashboard.inventaris.show');

    Route::get('dashboard/dokumen', [App\Http\Controllers\Dashboard\DokumenController::class, 'index'])->name('dashboard.dokumen');
    Route::post('dashboard/dokumen', [App\Http\Controllers\Dashboard\DokumenController::class, 'store'])->name('dashboard.dokumen.store');
    Route::put('dashboard/dokumen/{id}', [App\Http\Controllers\Dashboard\DokumenController::class, 'update'])->name('dashboard.dokumen.update');
    Route::delete('dashboard/dokumen/{id}', [App\Http\Controllers\Dashboard\DokumenController::class, 'destroy'])->name('dashboard.dokumen.destroy');
    Route::get('dashboard/dokumen/{id}', [App\Http\Controllers\Dashboard\DokumenController::class, 'show'])->name('dashboard.dokumen.show');
    Route::get('dashboard/dokumen/{id}/download', [App\Http\Controllers\Dashboard\DokumenController::class, 'download'])->name('dokumen.download');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
