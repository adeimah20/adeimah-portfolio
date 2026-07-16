# 01. SPESIFIKASI KEBUTUHAN PROYEK (PROJECT REQUIREMENT)

Dokumen ini berisi analisis kebutuhan lengkap untuk pengembangan Website Portfolio Pribadi yang modern, premium, dan profesional. Dokumen ini dirancang sebagai panduan utama bagi tim pengembang untuk menyamakan visi fungsional dan teknis sebelum fase penulisan kode dimulai.

---

## 1. Latar Belakang & Tujuan Proyek

### 1.1 Latar Belakang
Di era industri digital saat ini, persaingan untuk mendapatkan peluang karir baik berupa magang (*internship*), pekerjaan penuh waktu (*full-time*), maupun proyek lepas (*freelance*) sangatlah ketat. Bagi seorang profesional yang memiliki keahlian lintas disiplin (**Quality Assurance, IT Project Management, UI/UX Design, dan AI Engineering**), sebuah resume kertas atau profil LinkedIn standar sering kali tidak cukup untuk menggambarkan pemahaman yang mendalam tentang siklus hidup pengembangan perangkat lunak secara *end-to-end* (SDLC).

Website ini dibangun untuk mempresentasikan portofolio profesional yang mengintegrasikan seluruh keahlian tersebut dalam satu wadah digital yang premium dan berkinerja tinggi. Proyek ini mendemonstrasikan kemampuan teknis nyata dalam membangun aplikasi berbasis arsitektur *Client-Server* yang terpisah, *production-ready*, dan dioptimalkan secara mendalam.

### 1.2 Tujuan Proyek
*   **Representasi Kredibilitas**: Menyediakan platform pusat untuk memamerkan keahlian lintas disiplin secara komprehensif bagi rekrutmen dan klien.
*   **Bukti Kompetensi End-to-End**: Menunjukkan portofolio proyek berkualitas tinggi yang mencakup dokumentasi pengujian (QA), manajemen proyek (PM), desain antarmuka (UI/UX), dan penerapan model kecerdasan buatan (AI).
*   **Demonstrasi Keahlian Teknis**: Membuktikan pemahaman arsitektur web modern yang memisahkan Frontend (React SPA) dan Backend (Node/Express API) dengan basis data relasional (PostgreSQL).
*   **Koneksi Bisnis & Kontak**: Menyediakan saluran komunikasi yang valid, aman, dan responsif melalui formulir kontak terintegrasi.

---

## 2. Target Pengunjung (User Personas)

Untuk merancang pengalaman pengguna yang tepat sasaran, berikut adalah klasifikasi target pengunjung website beserta kebutuhan utama mereka:

### Persona 1: Tech Lead & Engineering Manager
*   **Kebutuhan**: Ingin memverifikasi apakah kandidat memahami arsitektur sistem, struktur kode, praktik pengujian (QA), dan implementasi AI.
*   **Ekspektasi**: Dokumentasi proyek yang detail (bukan sekadar screenshot), link ke repositori GitHub yang bersih, skema pengujian, dan penjelasan tentang tantangan teknis beserta solusinya.

### Persona 2: HR, Recruiter, & Hiring Manager
*   **Kebutuhan**: Mencari kandidat untuk posisi *Internship* atau *Full-Time*. Memiliki waktu terbatas (rata-rata 6-10 detik per profil).
*   **Ekspektasi**: Struktur navigasi yang intuitif, informasi status ketersediaan (*open to internship*), lokasi, serta ringkasan keahlian utama yang mudah dipindai secara visual (*scannable*). Tombol unduh CV harus mudah ditemukan dan diakses.

### Persona 3: Freelance Client / Pemilik Proyek
*   **Kebutuhan**: Membutuhkan jasa pembuatan aplikasi atau manajemen proyek jangka pendek.
*   **Ekspektasi**: Estetika desain antarmuka yang premium (UI/UX), studi kasus proyek yang terorganisir dengan baik, dan kemudahan untuk mengirimkan pesan penawaran langsung dari website.

---

## 3. Kebutuhan Fungsional (Functional Requirements)

Aplikasi ini mengadopsi pola *Single Page Application* (SPA) dengan sub-halaman detail project. Detail fungsionalitas per bagian adalah sebagai berikut:

### 3.1 Struktur Navigasi (Navbar)
*   **Sisi Kiri**: Menu navigasi internal dengan efek *smooth scroll* ke bagian: `#about`, `#experience`, `#projects`, `#skills`, dan `#contact`.
*   **Sisi Kanan**: Tombol eksternal dengan ikon GitHub yang mengarah ke profil GitHub pengembang.
*   **Responsivitas**: Pada perangkat *mobile*, navigasi berubah menjadi menu *hamburger* yang bersih dengan interaksi transisi yang halus.

### 3.2 Hero Section (Titik Fokus Pertama)
*   **Nama Lengkap**: Ditampilkan secara jelas menggunakan tipografi berukuran besar dan tegas.
*   **Professional Headline**: Deskripsi singkat peran profesional.
*   **Dynamic Role Animation**: Efek animasi teks bergantian yang dinamis untuk menampilkan keahlian: `[Quality Assurance] ➔ [IT Project Manager] ➔ [UI/UX Designer] ➔ [AI Engineer]`.
*   **Professional Introduction**: Paragraf pengantar singkat yang menyoroti kemampuan pengembangan produk digital dari konsep hingga rilis.
*   **Call-to-Action (CTA) Buttons**:
    1.  *Download CV*: Tombol untuk mengunduh dokumen resume terbaru dalam format PDF.
    2.  *Lihat Selengkapnya*: Tombol dengan efek scroll otomatis ke bagian `#about`.
*   **Technology Badges**: Deretan logo/badge teknologi utama yang melayang secara elegan untuk memberikan kesan pertama yang kuat tentang kapabilitas teknis.

### 3.3 About Section
*   **Ringkasan Diri**: Uraian naratif profesional mengenai visi kerja kandidat.
*   **Pendidikan**: Riwayat institusi formal, program studi, dan periode pendidikan.
*   **Fokus Saat Ini**: Informasi mengenai keahlian atau teknologi yang sedang dipelajari/ditekuni aktif.
*   **Ketertarikan Karir**: Jenis peran dan industri yang diminati.
*   **Lokasi & Ketersediaan**: Status lokasi saat ini dan indikator visual status "Open to Internship" (misal: badge berwarna hijau dengan efek pulsasi).

### 3.4 Experience Section (Timeline Kerja & Organisasi)
*   **Timeline Tampilan**: Daftar kronologis terbalik (pengalaman terbaru berada di atas).
*   **Detail Pengalaman**:
    *   Jabatan/Posisi dan Nama Perusahaan/Organisasi.
    *   Periode waktu bekerja (Bulan Tahun - Bulan Tahun / Present).
    *   *Job Description*: Tanggung jawab utama dalam peran tersebut.
    *   *Key Achievement*: Pencapaian konkret yang dapat diukur (misal: "Meningkatkan cakupan uji sebesar 40%").
    *   *Tools & Technologies Used*: Tag/badge kecil yang menampilkan alat bantu yang digunakan pada pengalaman spesifik tersebut.

### 3.5 Projects Section
*   **Grid Showcase**: Tampilan kartu proyek dalam susunan grid (misal: 2 atau 3 kolom) yang responsif.
*   **Informasi Kartu Proyek (Project Card)**:
    *   *Thumbnail image*: Gambar representasi visual berkualitas tinggi.
    *   *Project Title & Deskripsi Singkat*.
    *   *Project Type*: Kategori asal proyek (Personal / Academic / Internship / Freelance).
    *   *Project Status*: Label visual (Ongoing / Completed).
    *   *Tech Stack Tags*: Maksimal 4 tag utama pada kartu untuk menjaga kebersihan visual.
    *   *Direct Links*: Ikon eksternal untuk GitHub Repository dan Live Site.
*   **Halaman Detail Proyek (Sub-page Route)**:
    *   Ketika kartu diklik, aplikasi melakukan perpindahan rute ke `/projects/:slug` (menggunakan React Router DOM, bukan modal dialog) dan melakukan scroll ke posisi teratas halaman secara otomatis.
    *   **Komponen Halaman Detail**:
        *   **Overview**: Deskripsi mendalam mengenai proyek.
        *   **Problem Statement**: Latar belakang masalah yang dihadapi.
        *   **Objectives**: Tujuan utama pengembangan aplikasi/proyek.
        *   **My Role & Responsibilities**: Peran spesifik (QA/PM/Designer/AI) beserta daftar tanggung jawab yang diemban.
        *   **Tech Stack**: Penjelasan detail alasan pemilihan stack teknologi.
        *   **System Architecture**: Penjelasan arsitektur sistem (disertai diagram alur jika relevan).
        *   **Features**: Daftar fitur utama beserta penjelasannya.
        *   **Challenges & Solutions**: Tantangan teknis/non-teknis terberat selama proyek berjalan dan bagaimana cara menyelesaikannya.
        *   **Testing**: Rencana pengujian, skenario pengujian, atau hasil metrik uji yang menunjukkan pendekatan QA.
        *   **Gallery**: Screenshot antarmuka atau dokumentasi proses kerja.
        *   **GitHub & Live Links**: Tombol aksi eksternal ke kode sumber dan produk jadi.
        *   **Lessons Learned**: Pelajaran berharga yang diambil setelah menyelesaikan proyek.

### 3.6 Skills Section
*   **Metode Penilaian**: Menggunakan representasi persentase visual yang ringkas (misal: visualisasi lingkaran kecil atau bar tipis dengan persentase) yang merepresentasikan penilaian mandiri (*self-assessment*).
*   **Kategori Kompetensi**:
    1.  **Hard Skills**:
        *   *Software Testing*: Manual Testing, API Testing, Test Case Design, Bug Reporting, Requirement Analysis.
        *   *Frontend Development*: HTML5, CSS3, JavaScript (ES6+), React.js.
        *   *Backend Development*: Node.js, Express.js, REST API.
        *   *Database*: PostgreSQL, Prisma ORM.
        *   *Product & Design*: UI/UX Design, Project Management.
    2.  **Soft Skills**: Communication, Leadership, Problem Solving, Critical Thinking, Team Collaboration, Time Management, Adaptability.
    3.  **Tools**: Figma, Postman, Git & GitHub, Visual Studio Code, Supabase, Prisma Studio, n8n, Microsoft Office, Google Workspace, Jira, Trello, Notion.

### 3.7 Contact Section
*   **Informasi Kontak Langsung**: Link/tautan langsung dengan ikon profesional menuju GitHub, LinkedIn, Instagram, Email, dan Nomor Handphone.
*   **Formulir Kontak (Contact Form)**:
    *   Input Fields: Nama Lengkap (Required), Alamat Email (Required, format email valid), Pesan (Required, minimal 10 karakter).
    *   Interaksi Pengiriman: Tombol kirim menampilkan status loading (misalnya: animasi spinner) saat proses API berlangsung dan dinonaktifkan untuk mencegah klik ganda (*double submission*).
    *   Notifikasi Sukses/Gagal: Menggunakan sistem *Toast Notification* yang elegan.
    *   Email Alur Kerja: Menyimpan data pesan ke database PostgreSQL dan memicu pengiriman notifikasi email otomatis ke pengembang menggunakan Resend Email API.

---

## 4. Kebutuhan Non-Fungsional (Non-Functional Requirements)

Kriteria non-fungsional memastikan bahwa aplikasi tidak hanya berfungsi dengan baik, tetapi juga memiliki standar performa, keamanan, dan kegunaan yang setara dengan produk industri modern.

### 4.1 Performa (Performance)
*   **Lighthouse Score Target**:
    *   Performance: $\ge 90$
    *   Accessibility: $\ge 95$
    *   Best Practices: $\ge 95$
    *   SEO: $\ge 95$
*   **Kecepatan Pemuatan**: *First Contentful Paint* (FCP) $\le 1.2$ detik pada jaringan seluler 4G LTE standar.
*   **Optimasi Gambar**: Semua gambar proyek wajib dikompresi ke format `.webp` atau `.avif` dengan ukuran yang dioptimalkan sesuai dengan dimensi kontainer visual.
*   **Code Splitting**: Menerapkan dynamic import di React Router untuk memuat komponen halaman detail proyek secara *lazy-load*, mengurangi beban ukuran bundle awal.

### 4.2 Keamanan (Security)
*   **Validasi Sisi Server**: API backend wajib melakukan validasi ketat terhadap tipe data, panjang string, dan format email pada payload formulir kontak menggunakan Zod.
*   **CORS (Cross-Origin Resource Sharing)**: Konfigurasi server backend hanya mengizinkan request masuk dari domain frontend resmi (Vercel).
*   **Rate Limiting**: Membatasi pengiriman formulir kontak maksimal 3 request per menit dari alamat IP yang sama untuk mencegah serangan spamming/DDoS pada API Resend.
*   **Security Headers**: Menggunakan modul `helmet` pada backend untuk menerapkan header keamanan HTTP dasar guna mengurangi risiko serangan XSS dan Clickjacking.

### 4.3 Ketersediaan & Skalabilitas (Reliability & Scalability)
*   **Database Uptime**: Basis data memanfaatkan infrastruktur awan Supabase dengan jaminan ketersediaan yang tinggi.
*   **Graceful Degradation**: Jika server backend mati, frontend harus tetap berjalan menggunakan cache data lokal atau menampilkan pesan error fallback yang ramah pengguna.
*   **Error Logging**: Backend mencatat kesalahan operasional penting ke dalam format log standar untuk memfasilitasi proses debugging pasca-rilis.

### 4.4 SEO & Aksesibilitas (SEO & Accessibility)
*   **Semantik HTML**: Penggunaan tag HTML5 seperti `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, dan `<footer>`.
*   **Kontras Warna**: Semua elemen teks harus memenuhi standar kontras minimal WCAG AA (rasio kontras minimal 4.5:1 terhadap latar belakang gelap).
*   **Aria Labels**: Setiap tombol interaktif tanpa teks (seperti tombol ikon GitHub) wajib menyertakan atribut `aria-label` yang deskriptif untuk dibaca oleh alat bantu pembaca layar (*screen reader*).
*   **Metadata Dinamis**: Setiap halaman proyek memiliki title tag dan deskripsi meta yang unik demi visibilitas pencarian organik yang baik.

---

## 5. Batasan Proyek (Project Constraints)

Untuk mempertahankan fokus pengembangan dan efisiensi waktu, batasan-batasan teknis berikut ditetapkan:

*   **Tanpa Autentikasi Pengguna**: Aplikasi tidak menyediakan fitur *Login*, *Register*, token JWT, atau manajemen sesi pengguna pada platform publik.
*   **Tanpa Panel Admin (No CMS/Dashboard)**: Tidak ada halaman antarmuka untuk menambah atau mengubah data proyek. Semua pembaruan data (proyek, pengalaman, keahlian) dikelola secara langsung melalui manipulasi basis data menggunakan Supabase Dashboard atau skrip inisialisasi data (*data seeding*).
*   **Data Dinamis Murni**: Data tidak boleh disematkan langsung (*hardcoded*) pada kode frontend. Seluruh konten dinamis harus dimuat secara asinkronus melalui panggilan API backend Node.js.

---

## 6. Cakupan Proyek & Prioritas Pengembangan (MoSCoW)

Metode MoSCoW digunakan untuk memprioritaskan fitur-fitur yang dikembangkan:

### Must Have (Wajib Ada)
*   Arsitektur Client-Server yang terpisah dengan API operasional.
*   Hero section dengan dynamic role animation dan tombol unduh resume.
*   Tampilan Grid kartu project yang mengarah ke Halaman Detail Project (bukan modal).
*   Timeline Pengalaman Kerja yang responsif.
*   Skills Matrix dengan self-assessment percentage indikator.
*   Formulir Kontak yang menyimpan data ke basis data PostgreSQL.
*   Desain Dark Theme premium yang responsif di seluruh breakpoint perangkat.

### Should Have (Seharusnya Ada)
*   Integrasi email otomatis menggunakan Resend API saat kontak form diserahkan.
*   Animasi masuk yang halus (*fade-in scroll*) menggunakan Framer Motion.
*   Sistem Toast notification untuk sukses/gagal submit formulir kontak.
*   Dynamic Metadata (title & description) untuk SEO halaman proyek menggunakan React Helmet.

### Could Have (Bisa Ada di Masa Depan)
*   Fitur filter project berdasarkan tech stack (misal: filter React saja, Figma saja).
*   Bahasa multibahasa (Internasionalisasi - i18n untuk bahasa Indonesia dan Inggris).
*   Efek visual background interaktif seperti efek partikel atau grid berpola glow halus.

### Won't Have (Tidak Ada dalam Rilis Ini)
*   Sistem autentikasi atau halaman administrator.
*   Fitur live chat instan.
*   Analitik lalu lintas kunjungan yang kompleks.
