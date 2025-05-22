<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
