# 06. PANDUAN PENYEBARAN & PEMELIHARAAN (DEPLOYMENT & MAINTENANCE GUIDE)

Dokumen ini mendefinisikan langkah-langkah sistematis untuk merilis aplikasi portfolio pribadi ke lingkungan produksi (production environment) serta rencana pemeliharaan jangka panjang agar website tetap berjalan stabil, aman, dan berkinerja tinggi.

---

## 1. Pre-Flight Checklist (Persiapan Sebelum Rilis)

Sebelum memulai deployment ke cloud, pengembang wajib memastikan seluruh poin verifikasi berikut telah terpenuhi:

*   [ ] **Optimasi Build**: Menjalankan perintah `npm run build` pada folder `client/` secara lokal untuk memastikan tidak ada kesalahan kompilasi (*compile error*).
*   [ ] **Audit Environment**: Memastikan semua kunci API produksi (Supabase Database URL, Resend API Key) telah disiapkan secara aman (tidak di-hardcode dalam kode sumber).
*   [ ] **Pembersihan Git**: Memastikan file `.env` telah masuk dalam daftar `.gitignore` di kedua sisi proyek (klien & server) untuk mencegah kebocoran kredensial ke publik.
*   [ ] **Verifikasi Aset**: Semua gambar proyek telah dikompresi ke format `.webp` dengan ukuran resolusi maksimal 1200px lebar. Dokumen CV PDF telah diletakkan di folder `client/public/`.
*   [ ] **Security Audit**: Menguji validasi input backend lokal secara offline untuk memastikan tidak ada celah SQL injection atau XSS.

---

## 2. Langkah-Langkah Deployment (Step-by-Step Deployment)

Proses penyebaran aplikasi dibagi menjadi tiga bagian: penyebaran database relasional, API backend, dan antarmuka klien frontend.

### 2.1 Tahap 1: Setup Database di Supabase
1.  **Daftar/Masuk ke Supabase**: Buat proyek baru di dashboard Supabase dengan memilih regional terdekat (misal: Singapore) untuk latensi rendah.
2.  **Dapatkan URL Koneksi**:
    *   Buka menu *Settings* ➔ *Database* ➔ *Connection String*.
    *   Ambil URI koneksi dalam mode **Transaction Mode** (menggunakan PgBouncer di port 6543) untuk backend server, dan **Session Mode** (port 5432) untuk migrasi skema langsung.
3.  **Jalankan Migrasi Database**:
    Dari direktori `server/` lokal Anda, jalankan perintah migrasi Prisma untuk membangun skema PostgreSQL di Supabase secara otomatis:
    ```bash
    # Mengarahkan migrasi ke database Supabase
    npx prisma db push
    ```
4.  **Inisialisasi Data Awal (Seeding)**:
    Jalankan skrip seed lokal untuk mengisi database Supabase Anda dengan data awal (riwayat pekerjaan, proyek, dan keahlian):
    ```bash
    npx prisma db seed
    ```

### 2.2 Tahap 2: Deployment Backend di Render
1.  **Daftar/Masuk ke Render**: Buat akun dan pilih pembuatan layanan baru: **Web Service**.
2.  **Hubungkan Repositori Git**: Sambungkan akun GitHub Anda dan pilih repositori portofolio yang relevan.
3.  **Konfigurasi Layanan**:
    *   *Name*: `portfolio-backend-api`
    *   *Environment*: `Node`
    *   *Root Directory*: `server`
    *   *Build Command*: `npm install && npx prisma generate`
    *   *Start Command*: `node src/app.js` (atau perintah start yang sesuai)
    *   *Plan*: `Free` (atau berbayar tergantung kebutuhan resource)
4.  **Konfigurasi Environment Variables**:
    Buka tab *Advanced* dan tambahkan variabel-variabel berikut:
    *   `DATABASE_URL`: *[URL koneksi transaksi Supabase]*
    *   `DIRECT_URL`: *[URL koneksi sesi Supabase]*
    *   `CLIENT_URL`: *[Alamat domain frontend Vercel yang telah dibuat nanti]*
    *   `RESEND_API_KEY`: *[API Key dari akun Resend]*
    *   `TO_EMAIL`: *[Alamat email Anda untuk menerima notifikasi]*
    *   `FROM_EMAIL`: `onboarding@resend.dev` (atau domain kustom terverifikasi)
5.  **Catatan Mengatasi Cold Start (Render Free Tier)**:
    Layanan Render gratis akan mengalami suspensi (*sleep*) apabila tidak menerima request selama 15 menit. Ketika ada kunjungan baru, backend membutuhkan waktu sekitar 50 detik untuk bangun kembali (*cold start*). Untuk mengatasinya:
    *   Integrasikan cron-job eksternal (misal menggunakan layanan gratis dari **UptimeRobot** atau **cron-job.org**) untuk mengirimkan HTTP GET sederhana ke `/api/v1/skills` setiap 14 menit agar backend tetap terjaga (*warm state*).

### 2.3 Tahap 3: Deployment Frontend di Vercel
1.  **Masuk ke Dashboard Vercel**: Pilih opsi *Add New Project*.
2.  **Pilih Repositori**: Hubungkan dengan repositori GitHub Anda.
3.  **Pengaturan Konfigurasi Proyek**:
    *   *Framework Preset*: `Vite`
    *   *Root Directory*: `client`
    *   *Build Command*: `npm run build`
    *   *Output Directory*: `dist`
4.  **Konfigurasi Environment Variables**:
    Tambahkan variabel berikut:
    *   `VITE_API_URL`: *[Masukkan URL backend Render Anda, contoh: https://portfolio-backend-api.onrender.com/api/v1]*
5.  **Konfigurasi Fallback Client-Side Routing**:
    Untuk memastikan React Router DOM berjalan lancar saat pengguna memuat ulang halaman detail proyek (contoh: `domain.com/projects/nama-project`) secara langsung tanpa melalui halaman utama, buat file `vercel.json` di dalam folder `client/` sebelum build:
    ```json
    {
      "rewrites": [
        {
          "source": "/((?!api/v1/).*)",
          "destination": "/index.html"
        }
      ]
    }
    ```
6.  **Eksekusi Deploy**: Klik tombol *Deploy*. Vercel akan menyebarkan aset frontend ke jaringan CDN global mereka.

---

## 3. Pemeliharaan, Monitoring, & Pembaruan Data (Maintenance & Monitoring)

### 3.1 Sistem Logging Backend
*   Backend menggunakan middleware logger terintegrasi (`morgan`) untuk mencatat log akses masuk setiap request HTTP.
*   Jika terjadi kesalahan internal (HTTP 500), pesan error akan dicatat ke dalam *standard output* (stdout) container Render yang dapat dipantau langsung melalui dashboard panel logs Render.

### 3.2 Pemantauan Ketersediaan Layanan (Uptime Monitoring)
*   Gunakan **UptimeRobot** (akun gratis) untuk memantau dua rute krusial:
    1.  Frontend: `https://yourdomain.com` (Uptime check HTTP)
    2.  Backend Health: `https://api.yourdomain.com/api/v1/skills` (Uptime check HTTP)
*   Konfigurasikan notifikasi peringatan email instan jika salah satu layanan terdeteksi mati (*downtime*).

### 3.3 Mekanisme Pembaruan Data Portfolio secara Dinamis
Karena proyek ini mengadopsi batasan **tanpa Panel Admin/CMS**, proses pembaruan data (menambah proyek baru, memperbarui persentase skill, atau menambah riwayat kerja) dapat dilakukan dengan dua alternatif metode yang aman:

*   **Metode A: Melalui Dashboard GUI Supabase (Rekomendasi)**:
    1.  Masuk ke dashboard Supabase.
    2.  Pilih menu *Table Editor*.
    3.  Pilih tabel `Project`, `Experience`, atau `Skill`.
    4.  Klik tombol *Insert Row* untuk memasukkan baris data baru melalui antarmuka visual Supabase yang mudah digunakan. Perubahan akan langsung tersedia di web portofolio secara instan tanpa perlu mendeploy ulang frontend atau backend.
*   **Metode B: Melalui Database Seed Script**:
    1.  Buka file `server/prisma/seed.js` di editor lokal Anda.
    2.  Tambahkan data objek proyek baru di baris kode array data proyek.
    3.  Jalankan perintah pengisian ulang basis data dari terminal lokal Anda untuk mengirimkan data baru ke database Supabase:
        ```bash
        npx prisma db seed
        ```
