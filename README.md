# Sistem Manajemen Organisasi Karang Taruna

Website ini adalah sistem manajemen organisasi untuk Karang Taruna yang dibangun menggunakan **Laravel** dan **ReactJS** dengan bantuan **Inertia.js**. Proyek ini bertujuan untuk mempermudah pengelolaan organisasi serta meningkatkan branding organisasi melalui berbagai fitur yang disediakan.

## Fitur Utama
1. **Sistem Absensi Rapat**  
    Mempermudah pencatatan kehadiran anggota dalam setiap rapat.

2. **Sistem Inventaris Barang**  
    Mengelola data inventaris barang milik organisasi.

3. **Sistem Pengumuman dengan Blast WhatsApp**  
    Mengirimkan pengumuman penting langsung ke WhatsApp anggota.

4. **Sistem Manajemen Keanggotaan**  
    Mengelola data anggota organisasi secara terstruktur.

5. **Sistem Notulensi Rapat**  
    Mencatat dan menyimpan hasil rapat secara digital.

6. **Sistem Artikel & Berita**  
    Membantu organisasi dalam mempublikasikan artikel dan berita untuk branding.

## Status Proyek
Proyek telah selesai versi 1 dan siap digunakan.

## Tech Stack
- **Backend**: Laravel  
- **Frontend**: ReactJS  
- **Middleware**: Inertia.js  
- **Whatsapp API**: Fonnte

## Cara Menjalankan Proyek (Development)
1. Clone repository ini ke komputer Anda.
2. Install dependencies Laravel dan ReactJS:
    ```bash
    composer install
    npm install
    ```
3. Konfigurasi file `.env` 
    - Isi `FONNTE_TOKEN` dengan token device dari FONNTE

4. Generate Key
    ```bash
    php artisan key:generate
    ```
5. Link storage
    ```bash
    php artisan storage:link
    ```
4. Jalankan server Laravel:
    ```bash
    php artisan serve
    ```
5. Jalankan development server ReactJS:
    ```bash
    npm run dev
    ```
6. Akses aplikasi melalui browser di `http://127.0.0.1:8000`.

## Kontribusi
Jika Anda ingin berkontribusi pada proyek ini, silakan buat pull request atau laporkan masalah melalui [Issues](#).
