# 07. STRUKTUR PROYEK (PROJECT STRUCTURE)

Dokumen ini mendefinisikan rancangan struktur direktori, organisasi file, konvensi penamaan, dan pembagian tanggung jawab modul untuk sisi Frontend (Client) dan Backend (Server). Dokumen ini berfungsi sebagai peta jalan arsitektural yang wajib dipatuhi sebelum proses penulisan kode dimulai demi menjaga kebersihan kode (*clean code*) dan pemisahan kekhawatiran (*separation of concerns*).

---

## 1. Struktur Folder Project (Global Directory Tree)

Berikut adalah struktur folder produksi lengkap untuk monorepo `portfolio/`:

```
portfolio/
├── docs/                             # Dokumen Perencanaan & Analisis Sistem (Single Source of Truth)
│   ├── 01_PROJECT_REQUIREMENT.md
│   ├── 02_SYSTEM_ARCHITECTURE.md
│   ├── 03_UI_UX_GUIDELINES.md
│   ├── 04_DATABASE_API.md
│   ├── 05_DEVELOPMENT_GUIDE.md
│   ├── 06_DEPLOYMENT_GUIDE.md
│   └── 07_PROJECT_STRUCTURE.md       # Dokumen Ini
│
├── client/                           # Folder Workspace Frontend (React.js + Vite)
│   ├── public/                       # Aset Statis Publik (Dapat Diakses Langsung via URL)
│   │   ├── documents/                # Berkas Dokumen Unduhan (CV PDF)
│   │   ├── images/                   # Gambar Statis (Foto Profil, Default Fallbacks)
│   │   └── vercel.json               # Konfigurasi Rewrites Routing Vercel
│   ├── src/                          # Source Code Utama Klien
│   │   ├── assets/                   # Aset yang Diproses oleh Bundler (SVG, WebP)
│   │   ├── components/               # Komponen UI Reusable
│   │   │   ├── ui/                   # Komponen Atom (Basics/Primitives)
│   │   │   ├── layout/               # Komponen Layout Pembungkus
│   │   │   └── sections/             # Komponen Konten Seksi (Home Sections)
│   │   ├── layouts/                  # Template Kerangka Halaman
│   │   ├── pages/                    # Komponen Halaman (Views)
│   │   ├── hooks/                    # Custom React Hooks
│   │   ├── services/                 # Lapisan Komunikasi HTTP Client (Axios)
│   │   ├── utils/                    # Utilitas Logika Pendukung
│   │   ├── constants/                # Nilai Tetap (Konstan) Global
│   │   ├── router/                   # Konfigurasi Rute Aplikasi
│   │   ├── styles/                   # Konfigurasi CSS & Tailwind Directives
│   │   ├── types/                    # Dokumentasi Type Definitions (JSDoc/TypeScript Type Mock)
│   │   ├── App.jsx                   # Root Component
│   │   └── main.jsx                  # Entry Point React
│   ├── tailwind.config.js            # Konfigurasi Token Desain Tailwind
│   ├── vite.config.js                # Konfigurasi Bundler Vite
│   ├── postcss.config.js             # Konfigurasi Pemrosesan CSS
│   └── package.json
│
└── server/                           # Folder Workspace Backend (Node.js + Express.js)
    ├── prisma/                       # Manajemen ORM & Migrasi
    │   ├── schema.prisma             # Pemetaan Database Model
    │   └── seed.js                   # Inisialisasi Data Awal Database
    ├── src/                          # Source Code Utama Server
    │   ├── config/                   # Inisialisasi Env & Koneksi DB Client
    │   ├── controllers/              # Penerima Request & Pengirim Response
    │   ├── routes/                   # Pemetaan Rute Endpoint HTTP
    │   ├── middleware/               # Fungsi Interseptor Request Express
    │   ├── services/                 # Logika Bisnis & Layanan Eksternal (Mailer)
    │   ├── repositories/             # Akses Query Database Langsung (Prisma Client)
    │   ├── validators/               # Skema Validasi Body Request
    │   │   └── contact.validator.js
    │   ├── utils/                    # Kelas Pembantu & Penanganan Error Custom
    │   ├── app.js                    # Bootstrap Aplikasi Express
    │   └── server.js                 # Entry Point & Listener Port HTTP
    ├── .env                          # Variabel Lingkungan Lokal (Diabaikan Git)
    ├── .env.example                  # Contoh Variabel Lingkungan untuk Git
    └── package.json
```

---

## 2. Struktur Folder Frontend (React.js)

Pembagian modul dalam direktori `client/src/` diatur dengan tanggung jawab yang spesifik untuk menjamin reusability komponen:

| Nama Folder | Fungsi Utama | Tanggung Jawab | Kapan Harus Digunakan? |
| :--- | :--- | :--- | :--- |
| **`assets/`** | Menyimpan aset media internal. | Menyimpan file grafik, logo SVG, dan ilustrasi WebP yang memerlukan optimasi kompilasi oleh Vite Bundler. | Digunakan saat mengimpor gambar atau ikon langsung ke dalam file komponen menggunakan sintaks `import image from './assets/...'`. |
| **`components/ui/`** | Modul komponen terkecil (Atom). | Menyediakan elemen dasar UI seperti tombol kustom, field input, textarea, card kosong, dan lencana (*badge*). Komponen tidak boleh memiliki dependensi logika API. | Digunakan saat membangun fondasi antarmuka yang akan dipakai berulang kali di berbagai bagian halaman. |
| **`components/layout/`** | Modul kerangka struktural visual. | Mengelola elemen pembungkus halaman seperti Navbar, Footer, dan Section Wrapper yang menjaga konsistensi lebar layout (*container*). | Digunakan ketika merancang elemen navigasi global atas dan bawah yang menetap di seluruh halaman. |
| **`components/sections/`** | Konten bagian halaman utama. | Mengelompokkan kode berdasarkan seksi pada halaman beranda (Hero, About, Experience, Projects, Skills, Contact). | Digunakan saat mengimplementasikan konten dan tata letak spesifik per seksi di halaman utama. |
| **`layouts/`** | Struktur pembungkus rute. | Menyediakan layout dasar (misal `MainLayout` yang menyertakan Navbar + Footer + Outlet React Router). | Digunakan saat ingin menerapkan tata letak visual dasar yang konsisten pada sekelompok rute halaman tertentu. |
| **`pages/`** | Tampilan halaman penuh (Views). | Bertindak sebagai perakit akhir dari berbagai komponen seksi untuk membentuk satu halaman utuh (misalnya `HomePage`, `ProjectDetailPage`, `NotFoundPage`). | Digunakan ketika mendaftarkan rute baru pada router aplikasi. Halaman ini yang diakses langsung melalui perubahan URL. |
| **`hooks/`** | Ekstraksi logika React. | Mengisolasi state, efek samping, dan logika asinkronus dari komponen UI (misalnya custom hook `useFetchProjects`). | Digunakan ketika logika API fetching, event listener, atau state scroll spy perlu dipakai di beberapa komponen secara terpisah. |
| **`services/`** | Lapisan jaringan HTTP. | Berkomunikasi secara eksternal dengan backend API menggunakan Axios instance yang terkonfigurasi. | Digunakan saat menulis fungsi panggilan API seperti `getProjects()`, `getProjectBySlug(slug)`, atau `submitContact(data)`. |
| **`utils/`** | Fungsi logika umum (*pure functions*). | Menyimpan utilitas format tanggal, penggabungan kelas CSS (`cn.js`), dan manipulasi string dasar. | Digunakan saat membutuhkan pemrosesan data sederhana yang bersifat independen tanpa melibatkan state React. |
| **`constants/`** | Pusat variabel statis. | Menyimpan data konfigurasi statis, daftar rute tautan navigasi, data statis fallback, dan kunci-kunci referensi konstan. | Digunakan untuk menghindari penulisan string mentah (*hardcoded string*) di dalam kode komponen. |
| **`router/`** | Konfigurasi navigasi. | Mendefinisikan pemetaan URL ke komponen halaman menggunakan React Router DOM. | Digunakan ketika ada penambahan halaman baru atau modifikasi alur navigasi aplikasi. |
| **`styles/`** | Gaya visual global. | Menyimpan file CSS global, impor modul Tailwind, dan deklarasi kelas kustom tambahan. | Digunakan untuk mengonfigurasi gaya global dasar pada aplikasi. |
| **`types/`** | Dokumentasi tipe data. | Menyimpan deskripsi struktur objek (JSDoc schema atau file tipe) untuk membantu auto-complete di VS Code. | Digunakan saat menulis dokumentasi struktur tipe data JSON yang diterima dari API. |

---

## 3. Struktur Folder Backend (Express.js)

Pembagian modul dalam direktori `server/src/` menggunakan prinsip arsitektur berlapis (*layered architecture*) untuk memisahkan rute, logika bisnis, dan interaksi basis data:

```
                  +--------------------------------+
                  |         Express Router         |  <--- (src/routes/)
                  +--------------------------------+
                                  |
                                  v
                  +--------------------------------+
                  |     Validation & Limiter       |  <--- (src/middleware/)
                  +--------------------------------+
                                  |
                                  v
                  +--------------------------------+
                  |         API Controller         |  <--- (src/controllers/)
                  +--------------------------------+
                                  |
                                  v
                  +--------------------------------+
                  |        Business Service        |  <--- (src/services/)
                  +--------------------------------+
                                  |
                                  v
                  +--------------------------------+
                  |      Database Repository       |  <--- (src/repositories/)
                  +--------------------------------+
                                  |
                                  v
                  +--------------------------------+
                  |       Prisma DB / Supabase     |  <--- (Prisma Client)
                  +--------------------------------+
```

### 3.1 Fungsi & Hubungan Antar Folder Backend

*   **`config/`**
    *   *Fungsi*: Menyimpan konfigurasi inisialisasi modul pihak ketiga dan variabel lingkungan (`env.js`).
    *   *Tanggung Jawab*: Menyediakan modul ekspor klien database Prisma terpusat dan konfigurasi default API.
    *   *Hubungan*: Dihubungi oleh `app.js` dan modul `repositories/` saat menginisialisasi server dan database.
*   **`routes/`**
    *   *Fungsi*: Lapisan terdepan API untuk memetakan URI HTTP ke fungsi *controller* yang sesuai.
    *   *Tanggung Jawab*: Menentukan rute API publik dan menempelkan middleware spesifik (seperti validation dan rate limiter) pada rute tertentu.
    *   *Hubungan*: Menerima request HTTP ➔ Meneruskan ke `middleware/` untuk dicek ➔ Mengarahkan ke `controllers/`.
*   **`middleware/`**
    *   *Fungsi*: Gerbang penyaringan request (*interceptor*).
    *   *Tanggung Jawab*: Memproses validasi payload (Zod), membatasi frekuensi request (*rate limiting*), menyetel konfigurasi header keamanan, dan menangkap error (*global error middleware*).
    *   *Hubungan*: Dipasang pada `routes/`. Jika lolos penyaringan, data diteruskan ke `controllers/`. Jika terjadi kesalahan, melempar error ke handler error terpusat.
*   **`controllers/`**
    *   *Fungsi*: Pengendali aliran data request-response API.
    *   *Tanggung Jawab*: Membaca parameter URL/query/body, memanggil layanan bisnis terkait, dan mengembalikan respons HTTP berupa status code dan objek JSON terstruktur.
    *   *Hubungan*: Menerima request bersih dari `routes/` ➔ Memanggil `services/` ➔ Menerima hasil pemrosesan data ➔ Mengirim response JSON kembali ke `client`.
*   **`services/`**
    *   *Fungsi*: Lapisan logika bisnis inti aplikasi.
    *   *Tanggung Jawab*: Memproses algoritma logika aplikasi, menggabungkan data, serta melakukan integrasi dengan API eksternal (mengirim email notifikasi melalui layanan Resend API).
    *   *Hubungan*: Dipanggil oleh `controllers/` ➔ Menggunakan `repositories/` untuk mendapatkan data database ➔ Melakukan kalkulasi logika bisnis ➔ Mengembalikan data bersih ke `controllers/`.
*   **`repositories/`**
    *   *Fungsi*: Lapisan query database langsung (*data access layer*).
    *   *Tanggung Jawab*: Mengenkapsulasi query ORM Prisma (seperti `.findMany()`, `.findUnique()`, `.create()`) dari tabel tertentu. Lapisan ini memisahkan logika bisnis dari sintaks spesifik ORM.
    *   *Hubungan*: Dipanggil oleh `services/` ➔ Berkomunikasi langsung dengan PostgreSQL Supabase menggunakan Prisma Client ➔ Mengembalikan record database ke `services/`.
*   **`validators/`**
    *   *Fungsi*: Definisi skema validasi tipe data.
    *   *Tanggung Jawab*: Mendeklarasikan aturan validasi Zod untuk mengontrol struktur input request body.
    *   *Hubungan*: Diimpor oleh `middleware/validation.middleware.js` untuk memvalidasi request masuk.
*   **`utils/`**
    *   *Fungsi*: Modul utilitas sistem.
    *   *Tanggung Jawab*: Menyimpan kelas error kustom (`ApiError.js`) untuk mempermudah standarisasi kode error.
    *   *Hubungan*: Digunakan di seluruh lapisan backend untuk standarisasi format response error.

---

## 4. Struktur Penyimpanan Aset Publik (Public Assets)

Aset statis dalam proyek ini diklasifikasikan berdasarkan cara pemrosesan dan distribusinya demi performa loading situs yang optimal:

```
client/public/
├── documents/
│   └── cv-professional.pdf           # File PDF Resume asli (Diakses langsung)
├── images/
│   ├── profile.webp                  # Foto Profil terkompresi (Format modern)
│   └── fallback-project.webp         # Gambar cadangan jika thumbnail gagal dimuat
└── icons/
    ├── favicon.ico                   # Favicon browser standard
    ├── icon-192.png                  # PWA Manifest Android Icon
    └── icon-512.png                  # PWA Manifest Splash Icon
```

### 4.1 Strategi Distribusi Aset
1.  **CV (Resume PDF)**: Disimpan di folder `client/public/documents/cv-professional.pdf`. Pengunjung dapat mengunduhnya secara langsung melalui tautan HTML `<a href="/documents/cv-professional.pdf" download>`.
2.  **Foto Profil**: Disimpan di folder `client/public/images/profile.webp` dengan format `.webp` yang dikompresi di bawah ukuran 100 KB untuk menjamin rendering Hero Section yang instan.
3.  **Thumbnail & Gallery Project**: Karena ukuran gambar proyek dapat bervariasi dan memakan kapasitas bandwidth server, direkomendasikan untuk **tidak** menyimpannya secara lokal di dalam folder client untuk rilis produksi.
    *   *Rekomendasi Produksi*: Gambar disimpan di **Supabase Storage Bucket** (bersifat publik). Kolom `thumbnail` dan `gallery` pada tabel database `Project` hanya menyimpan string URL CDN Supabase Storage tersebut (contoh: `https://[id].supabase.co/storage/v1/object/public/projects/project-1.webp`).
4.  **Icons & Favicons**: Disimpan di folder `client/public/icons/` untuk konfigurasi metadata HTML dasar dan PWA Manifest.

---

## 5. Analisis File Utama (Core Files breakdown)

*   **`client/src/main.jsx`**: File entri JavaScript untuk React. Mengatur inisialisasi React DOM ke elemen `<div id="root">` di dalam `index.html`, serta membungkus aplikasi dengan tag `<React.StrictMode>` guna memicu pemeriksaan bug selama pengembangan.
*   **`client/src/App.jsx`**: Komponen akar (*root component*). Berfungsi untuk memuat definisi provider global seperti konfigurasi `<RouterProvider>` dari React Router DOM dan provider context dasar lainnya.
*   **`client/src/router/app-router.jsx`**: Pusat navigasi frontend. Mendefinisikan jalur routing aplikasi, memetakan rute utama (`/`) ke halaman beranda (`HomePage`), memetakan halaman studi kasus detail (`/projects/:slug`), serta menyematkan rute fallback `*` ke `NotFoundPage`.
*   **`client/tailwind.config.js`**: Pusat konfigurasi desain. Mendefinisikan skema warna gelap premium, aturan font Geist Sans dan JetBrains Mono, konfigurasi border radius, serta efek bayangan transparan kustom.
*   **`client/vite.config.js`**: Otak kompilasi build frontend. Mengatur plugin `@vitejs/plugin-react` dan konfigurasi alias impor (misalnya memetakan `@/` ke folder `src/`) untuk mempermudah penulisan impor file yang dalam.
*   **`server/src/server.js`**: Entry point utama server backend. Mengimpor aplikasi Express terkonfigurasi dari `app.js` dan menjalankan server HTTP untuk mendengarkan port koneksi (`PORT`) yang didefinisikan di file `.env`.
*   **`server/src/app.js`**: Pusat inisialisasi Express. Mengonfigurasi middleware global seperti CORS, Helmet, pembatasan ukuran payload JSON, parsing query string, pemetaan router utama `/api/v1`, dan middleware penangkap error di baris paling bawah.
*   **`server/prisma/schema.prisma`**: Pusat pendefinisian database. Menentukan provider database (PostgreSQL), tipe generator klien (Prisma Client JS), deklarasi tipe data enumerasi kategori peran, serta model-model tabel relasional.

---

## 6. Standar Konvensi Penamaan (Naming Conventions)

Konsistensi penamaan wajib diikuti untuk seluruh file dan folder guna mempercepat pemahaman struktur tim pengembang:

### 6.1 Nama Folder
*   Format: **kebab-case** (huruf kecil semua dipisahkan oleh tanda hubung).
*   *Contoh*: `components/ui/`, `api-service/`, `project-detail/`.

### 6.2 Nama Komponen React
*   Format: **PascalCase** (setiap awal kata diawali huruf kapital).
*   *Contoh*: `HeroSection.jsx`, `Button.jsx`, `ProjectCard.jsx`.

### 6.3 Nama Service API (Client)
*   Format: **camelCase** dengan akhiran kata `Service`.
*   *Contoh*: `projectService.js`, `contactService.js`.

### 6.4 API Endpoint URL
*   Format: **kebab-case** dan menggunakan kata benda jamak (*plural noun*) setelah basis API version.
*   *Contoh*: `/api/v1/projects`, `/api/v1/experience`, `/api/v1/contact`.

### 6.5 Nama Controller Backend
*   Format: **camelCase** dengan akhiran kata `.controller.js`.
*   *Contoh*: `project.controller.js`, `contact.controller.js`.

### 6.6 Nama Route Backend
*   Format: **camelCase** dengan akhiran kata `.router.js`.
*   *Contoh*: `project.router.js`, `experience.router.js`.

### 6.7 Nama File Aset
*   Format: **kebab-case** dengan penamaan yang deskriptif dan huruf kecil semua.
*   *Contoh*: `photo-profile-square.webp`, `resume-qa-manager-2026.pdf`.

### 6.8 Variabel Lingkungan (Environment Variables)
*   Format: **UPPER_SNAKE_CASE** (huruf kapital semua dipisahkan oleh garis bawah).
*   *Contoh*: `DATABASE_URL`, `RESEND_API_KEY`, `VITE_API_URL`.

### 6.9 Variabel Konstan
*   Format: **UPPER_SNAKE_CASE** untuk konstanta global.
*   *Contoh*: `MAX_RATE_LIMIT=100`, `ROUTER_PATHS_HOME="/"`.

---

## 7. Praktik Terbaik Struktur (Architecture Best Practices)

1.  **Strict Separation of Concerns (SoC)**:
    *   Komponen UI React (sisi visual) sama sekali tidak boleh menulis query basis data atau logika fetch URL mentah secara inline. Komponen UI hanya memanggil *custom hook* pemroses data, dan *custom hook* tersebut yang memanggil lapisan `services/api-service`.
2.  **Clean Repository Pattern (Backend)**:
    *   Jangan menulis kueri Prisma langsung di dalam fungsi Controller. Controller bertugas menerima request HTTP dan meneruskannya ke Service. Service mengolah logika aplikasi dan memanggil kelas Repository. Kelas Repository yang berinteraksi langsung dengan database PostgreSQL. Dengan pola ini, jika di masa depan basis data diubah (misalnya dari PostgreSQL ke MongoDB), pengembang hanya perlu mengganti kode di dalam folder `repositories/` tanpa menyentuh logika di `services/` dan `controllers/`.
3.  **Graceful Error Boundary (Client)**:
    *   Setiap pemanggilan API di sisi frontend wajib dibungkus dalam blok penanganan error `try-catch` dan disajikan ke antarmuka pengguna menggunakan sistem pemberitahuan *toast* terpusat, bukan menampilkan pesan error mentah dari konsol browser yang membingungkan pengunjung.
4.  **Reusable Atom Components**:
    *   Saat membuat komponen di folder `components/ui/`, pastikan komponen tersebut bersifat murni (*pure component*). Hindari penyematan state eksternal atau efek global di dalamnya agar komponen tersebut dapat digunakan kembali di bagian mana pun dalam aplikasi hanya dengan mengganti parameter *props*-nya.
