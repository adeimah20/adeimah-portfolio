# 03. PANDUAN ANTARMUKA & PENGALAMAN PENGGUNA (UI/UX GUIDELINES)

Dokumen ini mendefinisikan standar visual, tipografi, sistem warna, tata letak, dan panduan animasi yang diterapkan pada Website Portfolio Pribadi. Tujuannya adalah menciptakan estetika antarmuka yang premium, clean, dan minimalis yang terinspirasi oleh platform digital kelas dunia seperti Apple, Vercel, Linear, dan GitHub.

---

## 1. Filosofi & Konsep Desain

Karakter visual utama dari portfolio ini adalah **Developer Style - Dark Theme**. Desain diarahkan untuk memancarkan aura profesionalisme teknis, kejelasan informasi, dan kenyamanan membaca yang tinggi.

*   **Apple-style Spacing**: Menggunakan *white space* (ruang kosong) yang melimpah untuk memberikan ruang bernapas bagi konten, membuat informasi lebih terorganisir dan tidak padat.
*   **Vercel-style Typography**: Teks yang tajam, kontras yang presisi, dan hierarki font yang jelas untuk memastikan keterbacaan tingkat tinggi.
*   **Linear-style UI Accents**: Penggunaan garis pembatas (border) 1px yang sangat tipis, sudut melengkung yang konsisten (*rounded corners*), dan efek bayangan (*soft shadows*) yang halus untuk membedakan kedalaman elemen (z-index).
*   **GitHub-style Clean Metadata**: Badge kecil berbentuk kapsul, tag teknologi bergaya kode sumber (*monospaced tags*), dan status keaktifan yang minimalis namun informatif.

---

## 2. Sistem Desain & Token Visual (Design Tokens)

### 2.1 Palet Warna (Color Palette)
Warna dasar yang digunakan adalah warna gelap netral (monokromatik hangat) untuk menghindari kejenuhan mata dan memberikan kesan premium:

| Token Name | Hex Code | Tailwind Equivalent | Penggunaan Utama |
| :--- | :--- | :--- | :--- |
| **Obsidian Jet** | `#0A0A0A` | `bg-neutral-950` | Latar belakang dasar halaman utama (*primary canvas*). |
| **Slate Dark** | `#121212` | `bg-neutral-900` | Latar belakang kartu, form, dan panel (*elevated surfaces*). |
| **Border Gray** | `#222222` | `border-neutral-800` | Garis pembatas tipis 1px untuk memisahkan bagian dan membingkai kartu. |
| **Active White** | `#FFFFFF` | `text-neutral-50` | Teks judul utama (*h1, h2, h3*) dan tombol aksi utama. |
| **Body Gray** | `#A3A3A3` | `text-neutral-400` | Teks paragraf, deskripsi proyek, dan informasi sekunder. |
| **Muted Slate** | `#525252` | `text-neutral-600` | Meta informasi, tanggal periode, ikon tidak aktif, dan placeholder. |
| **Glow Accent** | `#00F0FF` | `text-cyan-400` | Warna sorotan minimalis untuk status keaktifan dan tag terpilih. |

### 2.2 Tipografi (Typography)
*   **Font Utama (Sans-Serif)**: `Geist Sans` atau `Inter`. Digunakan untuk semua judul, teks navigasi, deskripsi proyek, dan konten utama. Font ini memiliki karakteristik modern, geometris, dan sangat terbaca pada layar resolusi tinggi.
*   **Font Kode & Metadata (Monospace)**: `JetBrains Mono` atau `Fira Code`. Digunakan untuk tag teknologi, statistik persentase skill, periode waktu kerja, dan angka indikator status.
*   **Hierarki Tipografi**:
    *   *Hero Title*: `text-5xl` atau `text-6xl` (bold, tracking-tight).
    *   *Section Title*: `text-3xl` (semibold, tracking-tight).
    *   *Card Title / Heading 3*: `text-xl` (semibold).
    *   *Body Paragraph*: `text-base` (leading-relaxed, regular).
    *   *Meta/Caption*: `text-sm` atau `text-xs` (font-mono, tracking-wider).

### 2.3 Spacing, Borders, & Kedalaman (Elevation)
*   **Spacing Grid**: Konsistensi margin dan padding menggunakan kelipatan 4 (standard Tailwind): `p-4` (16px), `p-6` (24px), `py-12` (48px), `py-24` (96px).
*   **Border Radius**: Semua kartu (*cards*), input form, dan tombol menggunakan sudut melengkung berukuran sedang: `rounded-xl` (12px) atau `rounded-2xl` (16px).
*   **Glassmorphism (Glass Effect)**: Diterapkan hanya pada komponen melayang seperti Navbar dengan parameter: `bg-neutral-950/80` disertai efek blur `backdrop-blur-md` dan batas tipis `border-b border-neutral-800/50`.
*   **Soft Shadows**: Efek bayangan yang sangat halus hanya untuk memberikan kedalaman visual pada kartu hover: `shadow-2xl shadow-black/50`.

---

## 3. Panduan Animasi & Transisi (Framer Motion Guidelines)

Prinsip animasi pada portfolio ini adalah: **Halus, Cepat, dan Memiliki Tujuan (Subtle, Fast, and Purposeful)**. Pengembang wajib menghindari animasi berlebihan atau efek goyang (*bouncing*) yang lambat karena akan mengurangi kesan profesionalitas.

### 3.1 Animasi Dynamic Role (Hero Section)
*   **Mekanisme**: Mengganti teks peran profesional secara bergiliran (`QA` ➔ `IT Project Manager` ➔ `UI/UX Designer` ➔ `AI Engineer`).
*   **Animasi**: Transisi vertikal memudar (*fade-in slide-up*). Teks lama meluncur ke atas dan memudar keluar (opacity 0), teks baru muncul dari bawah (meluncur ke atas) dan memudar masuk.
*   **Konfigurasi Waktu**:
    *   Durasi transisi: `0.4` detik (ease-out).
    *   Waktu diam teks: `2.5` detik sebelum berganti peran berikutnya.

### 3.2 Efek Hover pada Kartu Proyek (Project Card Hover)
*   **Mekanisme**: Menyorot kartu ketika kursor pengguna berada di atas kartu proyek.
*   **Animasi**:
    *   Skala kartu membesar secara mikro: `scale: 1.015` (1.5% lebih besar).
    *   Warna border bertransisi dari `border-neutral-800` menjadi `border-neutral-700` atau aksen cyan tipis.
    *   Efek translasi ikon tautan: Panah ikon live site meluncur secara mikro ke arah kanan-atas `translate-x-1 -translate-y-1`.
*   **Konfigurasi Waktu**: Durasi transisi `0.2` detik dengan tipe transisi `easeInOut`.

### 3.3 Fade-in on Scroll (Scroll Reveal)
*   **Mekanisme**: Konten bagian (seperti baris timeline experience atau kategori skill) muncul secara perlahan saat pengguna menggulir halaman ke bagian tersebut.
*   **Animasi**: `opacity: [0 -> 1]` dan pergeseran vertikal `y: [30px -> 0px]`.
*   **Konfigurasi Waktu**: Durasi `0.6` detik dengan efek `easeOut`. Menerapkan properti `viewport: { once: true, margin: "-100px" }` agar animasi hanya berjalan satu kali saat pertama kali digulir.

### 3.4 Transisi Halaman Detail Proyek (Page Transitions)
*   **Mekanisme**: Mencegah perpindahan rute instan yang kasar saat beralih ke `/projects/:slug`.
*   **Animasi**: Menggunakan `<AnimatePresence>` dari Framer Motion. Halaman lama memudar keluar (`opacity: 0`), halaman detail proyek baru memudar masuk (`opacity: 1`, `y: [15px -> 0px]`).
*   **Konfigurasi Waktu**: Durasi transisi `0.3` detik dengan kurva `easeOut`.

---

## 4. Perencanaan Komponen UI (Atomic & Section Components)

Aplikasi dibangun menggunakan komponen modular yang dapat digunakan kembali (*reusable*):

### 4.1 Komponen Atom (UI Kit)
1.  **Button**:
    *   *Primary*: Latar belakang putih (`bg-neutral-50`), teks hitam, hover sedikit meredup (`hover:bg-neutral-200`).
    *   *Secondary*: Latar belakang transparan, border tipis (`border-neutral-800`), hover latar belakang abu-abu gelap (`hover:bg-neutral-900`).
2.  **Badge / Tag**:
    *   Kapsul kecil dengan teks monospaced berukuran kecil, latar belakang `bg-neutral-900`, teks abu-abu terang `text-neutral-300`, border 1px `border-neutral-800`.
3.  **Input / Textarea**:
    *   Input form dengan latar belakang `bg-neutral-900/50`, border `border-neutral-800`, fokus border berubah menjadi `focus:border-neutral-700` dan outline dihilangkan (`focus:outline-none`).

### 4.2 Komponen Organisme (Sections)
*   **Hero Unit**: Menggunakan susunan satu kolom terpusat (*centered layout*) pada mobile, bertransisi menjadi tata letak asimetris yang elegan pada layar desktop untuk memberikan dampak visual yang kuat.
*   **Timeline Experience**: Menggunakan garis vertikal lurus berukuran 2px berwarna `bg-neutral-800`. Setiap titik simpul timeline menggunakan lingkaran kecil berwarna abu-abu yang akan bersinar (glow cyan) ketika baris pekerjaan tersebut aktif di viewport.
*   **Projects Grid**: Layout grid responsif (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) dengan jarak antar kartu sebesar `gap-6` (24px) untuk menjaga keseimbangan whitespace.
*   **Skills Matrix Bar**: Menggunakan garis horizontal tipis setinggi 4px. Latar belakang bar adalah `bg-neutral-800` dan bar indikator pencapaian menggunakan warna putih/cyan terang setinggi 4px dengan animasi transisi memanjang saat bagian keahlian terlihat di layar.

---

## 5. Aksesibilitas (Accessibility) & Desain Responsif (Mobile-First)

Untuk menjamin kenyamanan akses bagi semua calon pemberi kerja, standar aksesibilitas berikut wajib diterapkan:

### 5.1 Standar Aksesibilitas (a11y)
*   **Elemen Interaktif**: Semua tombol (`<button>`) dan tautan (`<a>`) yang hanya menampilkan ikon grafis (seperti tautan GitHub) wajib memiliki atribut `aria-label` (contoh: `aria-label="Kunjungi repositori GitHub"`).
*   **Fokus Keyboard**: Pengguna harus dapat bernavigasi menggunakan tombol `Tab`. Elemen aktif wajib menunjukkan indikator fokus (`focus-visible:ring-1 focus-visible:ring-neutral-400`).
*   **Struktur Dokumen**: Konten utama dibungkus dalam tag `<main>`, navigasi menggunakan `<nav>`, dan setiap bagian dibungkus dalam tag `<section>` dengan `aria-labelledby` yang merujuk pada heading judul bagian tersebut.

### 5.2 Desain Responsif Breakpoints (Mobile First)
Tata letak antarmuka dirancang dari resolusi terkecil lalu ditambahkan aturan layout kompleks pada layar yang lebih besar:

*   **Mobile (<640px - `sm`)**:
    *   Hero section menggunakan layout satu kolom dengan orientasi teks rata tengah (*center-aligned*).
    *   Navbar disembunyikan dan digantikan tombol hamburger menu melayang.
    *   Jarak vertikal antar bagian diturunkan menjadi `py-16` (64px) untuk menghindari scroll terlalu panjang.
*   **Tablet (640px - 1024px - `md` & `lg`)**:
    *   Grid proyek berubah menjadi 2 kolom.
    *   Pengalaman timeline kerja menggunakan layout vertikal sebelah kiri.
*   **Desktop (>1024px - `xl` & `2xl`)**:
    *   Hero section menggunakan tata letak dua kolom asimetris dengan whitespace yang luas.
    *   Grid proyek bertransisi menjadi 3 kolom untuk menampilkan lebih banyak karya secara ringkas.
    *   Jarak vertikal antar bagian ditingkatkan menjadi `py-24` (96px).
