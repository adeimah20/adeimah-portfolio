# 02. ARSITEKTUR SISTEM (SYSTEM ARCHITECTURE)

Dokumen ini menjelaskan struktur arsitektur sistem, desain komponen, dan aliran data yang digunakan untuk membangun Website Portfolio Pribadi. Arsitektur ini dirancang untuk memastikan pemisahan tanggung jawab (*separation of concerns*), performa tinggi, dan skalabilitas di masa depan.

---

## 1. Tinjauan Umum Arsitektur (Architecture Overview)

Aplikasi ini menggunakan arsitektur **Client-Server** dengan pola **Single Page Application (SPA)** pada sisi klien. Komunikasi antara klien dan server dilakukan secara asinkronus menggunakan protokol HTTP melalui RESTful API.

```
+-------------------------------------------------------------+
|                       LAPISAN KLIEN                         |
|  - React.js (Vite)                                          |
|  - Tailwind CSS & Framer Motion (UI/UX)                     |
|  - Axios (Panggilan API)                                    |
+-------------------------------------------------------------+
                              |
                     Request (HTTPS JSON)
                              |
                              v
+-------------------------------------------------------------+
|                       LAPISAN SERVER                        |
|  - Node.js & Express.js (REST API)                          |
|  - Zod (Validasi Request)                                   |
|  - Prisma Client (ORM Database Query)                       |
+-------------------------------------------------------------+
         |                                           |
  Prisma Client Query                           API Trigger
         |                                           |
         v                                           v
+-----------------------+                   +-----------------+
|   LAPISAN DATABASE    |                   | LAYANAN EKSTERNAL|
|  - PostgreSQL         |                   |  - Resend Email |
|    (Hosted Supabase)  |                   |    Service API  |
+-----------------------+                   +-----------------+
```

---

## 2. Diagram Arsitektur Detail (Detailed Architecture Diagram)

Diagram berikut menjelaskan bagaimana komponen-komponen di dalam aplikasi berinteraksi secara spesifik, termasuk aliran keamanan dan integrasi email eksternal:

```mermaid
graph TD
    subgraph Klien [Frontend - Vercel Edge CDN]
        UI[React View / Pages]
        Router[React Router DOM]
        State[State Manager / Axios Client]
        Style[Tailwind & Framer Motion]
    end

    subgraph Server [Backend - Render Container]
        API[Express Router / API Router]
        Limit[Rate Limiter Middleware]
        Sec[Helmet / CORS Config]
        Val[Zod Validation Middleware]
        Ctrl[API Controllers]
        Pris[Prisma ORM Client]
        Mail[Resend Email integration]
    end

    subgraph Basis Data [Storage - Supabase Cloud]
        DB[(PostgreSQL Database)]
    end

    subgraph Eksternal [Layanan Pihak Ketiga]
        Resend[Resend SMTP/API Server]
        Inbox[Developer Inbox]
    end

    %% Client-Server Traffic
    UI --> Router
    UI --> Style
    UI --> State
    State ====>|HTTPS GET / POST| Sec
    Sec --> Limit
    Limit --> API
    API --> Val
    Val --> Ctrl
    
    %% Database & Email Actions
    Ctrl --> Pris
    Pris ====>|SQL / Prisma Query| DB
    Ctrl --> Mail
    Mail ====>|HTTP POST API| Resend
    Resend --> Inbox
```

---

## 3. Evaluasi & Rasionalisasi Stack Teknologi

Pemilihan teknologi dalam proyek ini didasarkan pada standar industri, kemudahan pemeliharaan, serta performa eksekusi:

### 3.1 Frontend Stack
*   **React.js (Vite)**: React dipilih karena arsitekturnya yang berbasis komponen (*component-based*), memudahkan pembuatan elemen UI yang dapat digunakan kembali (*reusable*). Vite digunakan sebagai build tool menggantikan Create React App karena kecepatan *bundling* yang luar biasa dan fitur *Hot Module Replacement* (HMR) yang instan.
*   **Tailwind CSS**: Menyediakan metodologi *utility-first* untuk penulisan gaya langsung pada markup. Ini mempercepat penulisan kode CSS, memastikan ukuran file CSS akhir yang kecil pasca-proses *purging*, dan memudahkan penerapan desain responsif.
*   **React Router DOM**: Pustaka routing standar untuk React. Memungkinkan transisi navigasi antar halaman (seperti halaman utama ke detail proyek) tanpa memicu pemuatan ulang halaman penuh (*full page reload*), menjaga karakteristik SPA yang cepat.
*   **Axios**: Klien HTTP berbasis *promise* untuk berkomunikasi dengan API. Menyediakan fitur *interceptors*, penanganan pembatalan request (*cancel tokens*), serta serialisasi data JSON otomatis yang lebih andal dibanding Fetch API bawaan browser.
*   **Framer Motion**: Pustaka animasi yang kuat untuk React. Digunakan untuk transisi halaman yang mulus dan animasi *scroll* mikro untuk menciptakan pengalaman pengguna yang premium tanpa mengorbankan stabilitas performa.

### 3.2 Backend Stack
*   **Node.js & Express.js**: Express.js adalah framework minimalis berbasis Node.js yang sangat populer untuk membuat API RESTful. Model I/O non-blocking yang digunakannya sangat efisien dalam menangani panggilan I/O database dan integrasi email eksternal secara asinkronus.
*   **Prisma ORM**: Menyediakan lapisan abstraksi basis data yang type-safe. Dengan Prisma, pengembang dapat berinteraksi dengan database PostgreSQL menggunakan objek JavaScript yang jelas, mengurangi kesalahan query manual, dan memfasilitasi migrasi skema basis data dengan aman.
*   **Zod**: Pustaka deklarasi skema untuk validasi data runtime. Zod memvalidasi body request sebelum masuk ke fungsi pengontrol (*controller*), mengamankan backend dari payload yang tidak valid atau berbahaya.

### 3.3 Database & Cloud Stack
*   **PostgreSQL (Hosted Supabase)**: Supabase menyediakan database PostgreSQL relasional kelas industri yang tangguh. Relasi data terstruktur pada portfolio (misal: relasi proyek ke jenis stack, detail log, dan pesan masuk) paling optimal ditangani oleh database relasional PostgreSQL dibandingkan NoSQL.
*   **Resend Email Service**: Menyediakan API modern untuk mengirimkan notifikasi email secara cepat dengan tingkat keteririman (*deliverability*) yang tinggi, menggantikan protokol SMTP tradisional yang lambat dan rentan diblokir spam filter.

---

## 4. Struktur Folder Blueprint

Struktur direktori dirancang dengan memisahkan kode Frontend (`client/`) dan Backend (`server/`) secara tegas untuk memudahkan kolaborasi tim dan proses deployment yang independen.

```
portfolio/
├── docs/                       # Dokumentasi Kebutuhan dan Arsitektur
├── client/                     # Frontend Workspace (React.js)
│   ├── public/                 # Aset statik (PDF CV, favicon, manifest)
│   ├── src/
│   │   ├── assets/             # Aset gambar terkompresi & SVG icons
│   │   ├── components/         # Komponen UI Reusable
│   │   │   ├── ui/             # Komponen Atom (Button, Badge, Card, Input)
│   │   │   ├── layout/         # Komponen Struktur (Navbar, Footer, SectionWrapper)
│   │   │   └── sections/       # Konten per bagian (Hero, About, Experience, Skills, Contact)
│   │   ├── hooks/              # Custom React Hooks (fetching, scroll state)
│   │   ├── pages/              # Komponen Halaman (Home, ProjectDetail, NotFound)
│   │   ├── styles/             # Pengaturan file CSS & Tailwind directives
│   │   ├── utils/              # Helper functions (date formatter, class merger)
│   │   ├── App.jsx             # Konfigurasi Route Utama
│   │   └── main.jsx            # Entry point aplikasi
│   ├── vite.config.js          # Konfigurasi Build Vite
│   ├── tailwind.config.js      # Konfigurasi Design Token Tailwind
│   └── package.json
│
└── server/                     # Backend Workspace (Node.js/Express)
    ├── prisma/                 # Folder ORM Prisma (Migrasi & Skema)
    │   ├── schema.prisma       # Struktur Model Database
    │   └── seed.js             # Script Pengisian Data Awal
    ├── src/
    │   ├── config/             # Konfigurasi Database Client & Env Variables
    │   ├── controllers/        # Logika Pengolahan Request & Response (Handlers)
    │   ├── middleware/         # Middleware Express (CORS, Helmet, Rate Limiter, Validator)
    │   ├── routes/             # Pemetaan endpoint URI
    │   ├── services/           # Logika integrasi pihak ketiga (Resend Mailer)
    │   └── app.js              # Inisialisasi Express App & Listener
    ├── .env                    # Konfigurasi Environment Lokal
    ├── .env.example
    └── package.json
```

---

## 5. Diagram Aliran Data (Data Flow Diagrams)

### 5.1 Aliran Pengambilan Data Halaman Utama (Home Page Load)
Ketika pengunjung membuka website, aplikasi frontend secara paralel memicu request ke backend untuk mendapatkan data dinamis yang disimpan di database.

```mermaid
sequenceDiagram
    autonumber
    Klien->>Server: HTTP GET /api/v1/experience (Minta riwayat kerja)
    Klien->>Server: HTTP GET /api/v1/projects (Minta data ringkas project)
    Klien->>Server: HTTP GET /api/v1/skills (Minta list keahlian)
    
    Note over Server: Express menerima request paralel
    
    Server->>Basis Data: Prisma query data Experience, Project, Skill
    Basis Data-->>Server: Mengembalikan baris data relational
    
    Note over Server: Controller merapikan format data ke JSON
    
    Server-->>Klien: HTTP 200 OK (JSON Payload Data)
    
    Note over Klien: React menaruh data ke State
    Klien-->>UI: Data dirender menggunakan list map & Framer Motion
```

### 5.2 Aliran Navigasi Halaman Detail Proyek (Project Detail Page Navigation)
Ketika pengguna mengklik kartu proyek, perpindahan rute ke `/projects/:slug` memicu permintaan data terperinci khusus untuk proyek tersebut.

```mermaid
sequenceDiagram
    autonumber
    Pengguna->>UI: Klik tombol detail di Kartu Proyek
    UI->>Router: Alihkan rute ke /projects/nama-slug
    Router->>Klien: Mount komponen ProjectDetailPage
    Klien->>Server: HTTP GET /api/v1/projects/nama-slug
    
    alt Project Ditemukan
        Server->>Basis Data: Prisma query project WHERE slug = nama-slug
        Basis Data-->>Server: Data proyek lengkap
        Server-->>Klien: HTTP 200 OK (JSON detail proyek)
        Klien-->>UI: Render konten (Overview, Architecture, Testing, Gallery)
    else Project Tidak Ditemukan
        Server-->>Klien: HTTP 404 Not Found (JSON Error Message)
        Klien->>Router: Alihkan ke halaman /404 (NotFoundPage)
    end
```

### 5.3 Aliran Pengiriman Formulir Kontak (Contact Form Submission)
Aliran data ini mengilustrasikan mekanisme pengamanan data dan pemberitahuan email saat pengunjung mengirimkan pesan kontak.

```mermaid
sequenceDiagram
    autonumber
    Pengguna->>UI: Isi form & klik "Kirim Pesan"
    UI->>UI: Validasi format email & teks kosong di client
    UI->>Klien: Pemicuan Axios POST /api/v1/contact
    Klien->>Server: HTTP POST /api/v1/contact (Name, Email, Message)
    
    Note over Server: Middleware Rate Limiter memvalidasi IP
    Note over Server: Middleware Zod memvalidasi tipe data
    
    alt Validasi & Rate Limit Lolos
        Server->>Basis Data: Prisma insert data ke tabel ContactMessage
        Basis Data-->>Server: Record tersimpan (UUID dihasilkan)
        Server->>Eksternal: Pemicuan API Call ke Resend Mail Server
        Eksternal-->>Server: Email Notification berhasil terkirim
        Server-->>Klien: HTTP 201 Created (JSON Success Payload)
        Klien-->>UI: Reset form input & tampilkan Toast Sukses
    else Validasi Gagal / Rate Limit Terlampaui
        Server-->>Klien: HTTP 400 Bad Request / 429 Too Many Requests
        Klien-->>UI: Tampilkan Toast error deskriptif (tanpa reset form)
    end
```

---

## 6. Strategi Penanganan Error & Degradasi Layanan (Graceful Degradation)

Untuk menjaga keandalan sistem produksi, strategi penanganan kesalahan berikut diterapkan secara seragam:

1.  **React Error Boundary**: Membungkus komponen utama dengan kelas *Error Boundary*. Jika ada satu komponen visual mengalami crash (misalnya karena kesalahan data properti API), aplikasi tidak akan menampilkan layar kosong (*white screen of death*), melainkan menampilkan komponen fallback yang ramah dan tombol "Refresh Halaman".
2.  **API Fallback Cache**: Menyimpan respons API terakhir yang berhasil dimuat ke dalam `localStorage` atau cache browser. Jika jaringan klien tiba-tiba terputus atau server backend mengalami downtime (*cold-start/crash*), aplikasi frontend tetap dapat menampilkan data portofolio terakhir yang tersimpan secara lokal.
3.  **Circuit Breaker untuk Email Service**: Pengiriman notifikasi email via Resend diproses secara asinkronus setelah penyimpanan database selesai. Jika API Resend mengalami kegagalan (misalnya karena kuota habis atau gangguan jaringan), server tetap harus mengembalikan kode sukses `201 Created` kepada klien karena pesan telah tersimpan dengan aman di database lokal, namun mencatat kesalahan pengiriman email di sistem log backend.
4.  **Database Connection Pooling**: Karena Supabase menggunakan koneksi PostgreSQL, pooling koneksi dikonfigurasi melalui Prisma dan Supabase connection pooler (PgBouncer/Supabase Pooler) pada port `6543`. Hal ini mencegah server backend menghabiskan batas maksimal koneksi database selama lonjakan trafik.
