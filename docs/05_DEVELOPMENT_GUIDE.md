# 05. PANDUAN PENGEMBANGAN & PENGUJIAN (DEVELOPMENT & QA GUIDE)

Dokumen ini berfungsi sebagai panduan teknis bagi tim pengembang untuk menjalankan aplikasi secara lokal, memahami standar kualitas kode yang disepakati, serta menerapkan rencana pengujian kualitas (*Quality Assurance*) secara sistematis sebelum deployment ke produksi.

---

## 1. Setup & Instalasi Lokal (Local Environment Setup)

### 1.1 Persyaratan Sistem
*   Node.js (Versi $\ge$ 18.x LTS)
*   NPM (Versi $\ge$ 9.x) atau PNPM (Versi $\ge$ 8.x)
*   PostgreSQL Instance (Lokal atau Cloud Supabase)

### 1.2 Langkah-Langkah Instalasi
1.  **Kloning Repositori**:
    ```bash
    git clone <repository-url> portfolio-imah
    cd portfolio-imah
    ```
2.  **Konfigurasi Backend Server**:
    ```bash
    cd server
    npm install
    # Salin file konfigurasi env
    cp .env.example .env
    ```
3.  **Inisialisasi Database (Prisma)**:
    ```bash
    # Membuat tabel di database berdasarkan skema
    npx prisma db push
    # Memasukkan data awal (seeding)
    npx prisma db seed
    ```
4.  **Menjalankan Backend**:
    ```bash
    npm run dev
    ```
5.  **Konfigurasi Frontend Client**:
    ```bash
    cd ../client
    npm install
    # Menjalankan server lokal (Vite)
    npm run dev
    ```

### 1.3 Templat Variabel Lingkungan (Environment Variables)

#### File: `server/.env`
```ini
# Koneksi database PostgreSQL (gunakan mode Direct Connection dari Supabase)
DATABASE_URL="postgresql://postgres:[password]@db.[project-id].supabase.co:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[password]@db.[project-id].supabase.co:5432/postgres"

# Port Server
PORT=5000

# Pengaturan CORS (Alamat URL Frontend)
CLIENT_URL="http://localhost:5173"

# Kunci API Resend Email
RESEND_API_KEY="re_1234567890abcdef"
TO_EMAIL="developer@email.com"
FROM_EMAIL="onboarding@resend.dev"
```

#### File: `client/.env`
```ini
# URL API Server Backend
VITE_API_URL="http://localhost:5000/api/v1"
```

---

## 2. Standar Kode & Praktik Terbaik (Coding Standards)

Aplikasi wajib mengikuti prinsip rekayasa perangkat lunak modern untuk menjaga keterbacaan dan struktur kode:

### 2.1 Penerapan Prinsip SOLID
*   **Single Responsibility Principle (SRP)**:
    *   *Frontend*: Pisahkan logika pemanggilan data API dari logika presentasi UI. Gunakan *custom hooks* (misalnya `useProjects`) untuk menangani query Axios.
    *   *Backend*: Pisahkan penanganan rute (`routes`), pemrosesan logika bisnis (`controllers`), dan interaksi database (`Prisma client`).
*   **Open/Closed Principle (OCP)**:
    *   Rancang komponen UI (seperti `Card` atau `Button`) agar menerima modifikasi perilaku melalui *props* khusus tanpa harus mengubah kode internal komponen itu sendiri.

### 2.2 Konvensi Penamaan (Naming Conventions)
*   **PascalCase**: Digunakan untuk nama komponen React (contoh: `ProjectCard.jsx`, `ExperienceTimeline.jsx`).
*   **camelCase**: Digunakan untuk nama fungsi, variabel, custom hooks, dan properti objek (contoh: `useActiveSection`, `projectData`, `fetchProjects`).
*   **kebab-case**: Digunakan untuk nama file non-komponen, direktori, dan kelas CSS kustom (contoh: `api-service.js`, `docs/`).

### 2.3 Standar Clean Code & Linter
*   Wajib menerapkan konfigurasi **ESLint** dan **Prettier** terintegrasi pada editor VS Code untuk menjamin pemformatan spasi, tanda koma, dan kutip yang seragam.
*   Hindari penggunaan *magic numbers* atau warna langsung. Rujuk variabel dari file `tailwind.config.js` untuk menjaga konsistensi visual.

---

## 3. Rencana Pengujian Kualitas (Quality Assurance Plan)

Sebagai perwakilan portofolio QA, sistem pengujian dirancang secara menyeluruh meliputi pengujian manual dan otomatis.

### 3.1 Matriks Pengujian Manual (Manual Test Matrix)

| Test Case ID | Modul / Fitur | Skenario Pengujian | Hasil yang Diharapkan |
| :--- | :--- | :--- | :--- |
| **TC-NAV-01** | Navigasi Halaman | Mengklik menu "Projects" pada Navbar saat berada di halaman utama. | Viewport melakukan *smooth scrolling* ke arah bagian Projects. |
| **TC-PRJ-01** | Detail Proyek | Mengklik kartu proyek "AI Automation Framework". | Rute bertransisi ke `/projects/ai-automation-framework` dan halaman dimuat dari atas (posisi scroll 0). |
| **TC-VAL-01** | Kontak - Validasi | Mengirimkan formulir kontak dengan alamat email tanpa simbol `@` (contoh: `user.email.com`). | Tombol kirim tidak merespons, dan muncul pesan error inline: "Format alamat email tidak valid." |
| **TC-CON-01** | Kontak - Kirim | Mengisi formulir kontak dengan lengkap dan klik "Kirim Pesan". | Spinner loading muncul, tombol non-aktif, pesan sukses "Toast" muncul, form kosong kembali, data tersimpan di DB, dan email terkirim. |
| **TC-RWD-01** | Responsivitas | Membuka website pada resolusi layar mobile 360px. | Semua teks dan kartu tersusun satu kolom vertical, navigasi berubah menjadi menu hamburger, tidak ada elemen meluap secara horizontal (*no overflow x*). |

### 3.2 Skenario Pengujian API Otomatis (Automated API Testing - Postman/Supertest)

Rencana pengujian backend API difokuskan pada pengujian integrasi endpoint kunci:

```javascript
// Konsep Alur Tes API GET /projects
describe("GET /api/v1/projects", () => {
  it("harus mengembalikan status 200 dan array proyek", async () => {
    const res = await request(app).get("/api/v1/projects");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("slug");
  });
});

// Konsep Alur Tes API POST /contact (Validasi Gagal)
describe("POST /api/v1/contact - Input Tidak Valid", () => {
  it("harus menolak request dan mengembalikan status 400", async () => {
    const res = await request(app)
      .post("/api/v1/contact")
      .send({ name: "", email: "bukan-email", message: "pendek" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });
});
```

### 3.3 Skenario Pengujian E2E (End-to-End Testing - Playwright)

Pengujian E2E mensimulasikan perilaku pengguna nyata pada browser:

1.  **Skenario Pengujian Navigasi Halaman Utama**:
    *   *Langkah*: Buka browser ➔ Akses `http://localhost:5173` ➔ Tunggu hingga Hero Section selesai memuat ➔ Klik tombol "Lihat Selengkapnya".
    *   *Verifikasi*: Pastikan elemen judul "About" terlihat di layar (*visible in viewport*).
2.  **Skenario Dynamic Role Transition**:
    *   *Langkah*: Buka homepage ➔ Amati teks peran melayang di Hero.
    *   *Verifikasi*: Pastikan dalam selang waktu 3 detik, teks berganti dari "Quality Assurance" ke "IT Project Manager" dengan perubahan transisi animasi.
3.  **Skenario Pengiriman Pesan Kontak**:
    *   *Langkah*: Masukkan nama "Tester QA", email "qa@test.com", pesan "Ini adalah pesan pengujian otomatis E2E." ➔ Klik tombol kirim.
    *   *Verifikasi*: Verifikasi bahwa alert notifikasi toast sukses muncul di sudut layar dengan pesan sukses.

---

## 4. Templat Laporan Bug (Bug Reporting Template)

Apabila ditemukan anomali atau kesalahan fungsionalitas selama proses pengembangan atau testing, laporan bug ditulis menggunakan format terstruktur berikut:

```
[BUG-ID] Deskripsi Singkat Bug (Contoh: [BUG-02] Transisi Halaman Detail Tidak Scroll ke Atas)

Langkah-Langkah Reproduksi:
1. Akses halaman utama portfolio.
2. Scroll ke bagian Projects.
3. Klik tombol "Detail" pada kartu proyek ke-3.
4. Tunggu transisi halaman detail proyek selesai.

Perilaku yang Diharapkan (Expected Behavior):
Halaman detail proyek terbuka dan posisi layar langsung berada di paling atas (scroll y = 0).

Perilaku Aktual (Actual Behavior):
Halaman detail proyek terbuka tetapi posisi scroll tetap berada di posisi bawah (mengikuti posisi scroll halaman utama sebelumnya).

Spesifikasi Lingkungan (Environment):
- OS: macOS Sonoma
- Browser: Google Chrome v120.0.1
- Device: Desktop 14 Inch

Prioritas (Severity): Medium (Mempengaruhi kenyamanan navigasi pengguna)
```
