# Istiqomah: Pelacak Ibadah Harian & Al-Quran PWA

Aplikasi Web Progresif (PWA) Islami yang modern, cepat, dan berfokus penuh pada privasi pengguna. Berjalan 100% di sisi klien tanpa server perantara, tanpa database pihak ketiga, dan tanpa pelacakan analitik. Seluruh data tersimpan secara lokal dan aman di perangkat pengguna.

[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![IndexedDB Dexie](https://img.shields.io/badge/IndexedDB-Dexie_v4-22c55e)](https://dexie.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline_First-f97316)](https://web.dev/progressive-web-apps/)
[![Security AES-GCM](https://img.shields.io/badge/Kriptografi-AES--GCM_256--bit-10b981)](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)

---

## Prinsip & Arsitektur Utama

Sebagian besar aplikasi pencatat ibadah mewajibkan pembuatan akun, menyimpan catatan pribadi pengguna di cloud server, atau membatasi fitur pencarian doa di balik biaya langganan berbayar. Istiqomah dibangun dengan tiga pilar arsitektur:

1. **Local-First & Kedaulatan Data**: Seluruh data amalan, riwayat tilawah, progres khatam, dan koleksi doa tersimpan di IndexedDB browser menggunakan Dexie.js v4. Tidak ada server eksternal yang dapat membaca atau mengakses data ibadah Anda.
2. **Bring Your Own Key (BYOK)**: Pengguna menggunakan kunci API Google Gemini pribadi yang diperoleh gratis dari Google AI Studio. Tidak ada biaya langganan dan tidak ada kuota terpusat.
3. **Kriptografi Berlapis (Defense-in-Depth)**: Kunci API dienkripsi secara lokal menggunakan Web Crypto API standar industri (**AES-GCM 256-bit** dengan derivasi kunci **PBKDF2 100.000 iterasi**) sebelum disimpan ke IndexedDB. Material kunci tidak pernah diekspor dalam berkas cadangan data.
4. **Dukungan PWA Offline Penuh**: Dapat diinstall di Android, iOS, iPadOS, Windows, maupun macOS, serta berfungsi optimal dalam kondisi offline tanpa koneksi internet.

---

## Ringkasan Fitur

### 1. Pelacak Rutinitas Ibadah Harian
- **Pencatatan 1-Tap**: Interaksi cepat (kurang dari 3 detik) dengan animasi transisi pegas (spring physics) berbasis Framer Motion.
- **Segmentasi Waktu Ibadah**: Pengelompokan Sholat Wajib 5 Waktu, Amalan Sunnah (Dhuha, Tahajjud, Rawatib), serta Dzikir Pagi dan Petang.
- **Kustomisasi & Pengeditan Amalan**:
  - Seluruh amalan (sholat fardhu, sunnah, dzikir, dan amalan kustom) dapat diedit nama, waktu pelaksanaan, dan catatan khususnya melalui modal edit terpadu.
  - **Proteksi Amalan Wajib**: Sholat wajib 5 waktu dilindungi dari penghapusan dan kategorinya terkunci permanen pada amalan fardhu demi menjaga rukun Islam.
  - **Penghapusan Amalan Non-Wajib**: Amalan sunnah, dzikir, dan amalan kustom dapat dihapus dengan konfirmasi dialog aman yang membersihkan data beserta riwayat hariannya dari IndexedDB.
- **Tombol "Baca Doa" Langsung**: Amalan yang memiliki teks doa/dzikir (seperti Sayyidul Istighfar atau hasil pencarian AI) dilengkapi tombol langsung untuk membuka lafaz Arab dan artinya saat beribadah.
- **Indikator Konsistensi (Streak)**: Visualisasi api dinamis, pelacak rekor hari terpanjang, dan bar persentase capaian harian.

### 2. Al-Quran Al-Karim & Pelacak Khatam
- **Eksplorasi 114 Surah**: Pencarian instan berbasis nama surah Arab, transliterasi Latin, terjemahan resmi Kemenag RI, atau nomor urut surah.
- **Tiga Mode Tilawah Khusyuk**:
  - **Mode Lengkap**: Teks Arab ber-tajwid, transliterasi fonetik Latin, dan terjemahan Indonesia.
  - **Mode Mushaf**: Teks Arab murni berbidang lapang untuk tilawah yang hening dan terfokus.
  - **Mode Arab + Arti**: Teks Arab berdampingan dengan terjemahan Indonesia tanpa teks transliterasi.
- **Pewarnaan Tajwid Interaktif (11 Kaidah)**:
  - Teks Arab dipetakan berdasarkan standar mushaf Kemenag RI dan Madinah (Qalqalah, Ikhfa, Idgham Bighunnah, Idgham Bilaghunnah, Iqlab, Ghunnah Musyaddadah, Mad Thobi'i, Mad Wajib/Jaiz, Mad Lazim, Ikhfa Syafawi, Idgham Mimi).
  - Popover penjelasan hukum tajwid muncul secara kontekstual tepat di bawah ayat yang disentuh (bukan di dasar layar), menampilkan nama kaidah, jumlah ketukan harakat, dan tata cara baca.
- **Kamus Kaidah Tajwid Terpadu**: Modul referensi mandiri untuk hukum nun sukun, mim sukun, ragam mad, qalqalah, dan makhraj huruf hijaiyah.
- **Pelacak Target 30 Juz & Bookmark**: Pelacak progres menuju 6.236 ayat, penanda ayat terakhir dibaca otomatis, serta formulir pencatatan manual dari mushaf cetak.

### 3. Asisten Doa Cerdas & Koleksi Doa Tersimpan (AI Powered)
- Pencarian doa dan dzikir shahih dari Al-Quran dan As-Sunnah berdasarkan keadaan hati, kegelisahan, atau hajat hidup menggunakan Google Gemini AI.
- **Pemilihan Model AI Fleksibel (Transparansi Model Gratis & Berbayar)**:
  - `gemini-3.6-flash` (100% Gratis, Rekomendasi Bawaan): Model generasi terbaru dengan respons kilat, pemahaman hadis mendalam, dan kuota gratis harian dari Google AI Studio.
  - `gemini-2.5-flash` (100% Gratis): Model alternatif stabil dan ringan dengan kuota gratis harian.
  - `gemini-2.5-pro` (Tier Berbayar): Penalaran mendalam untuk telaah komprehensif (khusus API Key tier berbayar Google Cloud / Pay-as-you-go).
- **Penyimpanan Penuh (Full Prayer Data)**:
  - Doa yang ditemukan disimpan secara utuh ke database lokal (Teks Arab berharakat, Transliterasi Latin, Terjemahan Indonesia, Rujukan Hadis, dan Keutamaan/Faidah).
  - Pilihan fleksibel: **Simpan & Jadikan Amalan Harian** atau **Simpan ke Koleksi Doa Saja** (arsip referensi tanpa membebani daftar amalan harian).
- **Mode Pembaca Doa Terpadu (`PrayerReaderModal`)**: Tampilan bacaan dengan tipografi Arab berukuran besar yang nyaman, transliterasi, terjemahan, tombol salin teks satu-klik, dan tombol "Tandai Selesai Dibaca" yang otomatis mencentang amalan harian.
- **Pustaka "Koleksi Doa" di Beranda**: Menu koleksi doa tersimpan dengan pencarian instan, memudahkan membaca ulang kapan saja secara luring (offline) tanpa perlu membuka aplikasi lain.

### 4. Analisis & Gamifikasi Positif
- **Peta Konsistensi (Heatmap)**: Matriks aktivitas 10 pekan terakhir dengan gradasi warna hijau emerald.
- **Grafik Batang Mingguan**: Evaluasi tren persentase ketercapaian ibadah selama 7 hari berjalan.
- **Enam Lencana Apresiasi Amal**: Sistem rekognisi ibadah yang didasarkan pada rujukan hadits shahih (seperti Penjaga Sholat, Pecinta Al-Quran, dan Ahli Dzikir).

### 5. Pengaturan & Pengalaman Antarmuka PWA
- **Instalasi PWA Terpadu**: Dialog panduan pemasangan otomatis (`PwaInstallModal`) dengan deteksi perangkat cerdas (Chrome Android, Safari iOS / Tambah ke Layar Utama, Desktop Chrome/Edge), serta kartu status instalasi di Pengaturan.
- **Dukungan Dual-Theme Mandiri**: Mode Gelap (Zinc-950 off-black) dan Mode Terang (Slate-50) dengan kontras teks yang memenuhi standar WCAG AA.
- **Desain Mobile-First & Gestur Sentuh**: Seluruh dialog popup dirancang sebagai lembar modal bawah (bottom sheet) yang mendukung gestur geser turun (drag-to-dismiss) untuk menutup tampilan.
- **Manajemen Cadangan Data (Backup & Restore)**: Unduh salinan data format JSON (mencakup pengaturan, amalan, riwayat harian, status tilawah, dan koleksi doa tersimpan) dan pulihkan kapan saja secara mandiri.

---

## Audit & Penguatan Keamanan Siber

Aplikasi ini telah melalui audit keamanan menyeluruh berbasis ancaman sisi klien (Client-Side Threat Model & OWASP Top 10):

| Kode | Kategori Risiko | Mitigasi & Implementasi Teknis |
|---|---|---|
| **SEC-01** | Kebocoran Kriptografi | Material kunci (`encryptedApiKey`, `apiKeySalt`, `apiKeyIv`) otomatis dibersihkan dari berkas JSON ekspor. Saat proses impor, material kunci juga difilter untuk mencegah penimpaan tidak sah. |
| **SEC-02** | Isolasi Kunci Enkripsi | Kunci API dilindungi cipher AES-GCM 256-bit dengan salt acak 16-byte dan IV acak 12-byte unik per sesi enkripsi via Web Crypto API. |
| **SEC-03** | Integritas Impor Data | Validasi skema ketat (`isSafeObject`, `isValidHabit`, `isValidDailyLog`, `isValidQuranState`) untuk mencegah serangan Prototype Pollution (via `__proto__`) dan kerusakan struktur data. |
| **SEC-04** | Content Security Policy | Konfigurasi tag meta CSP ketat pada `index.html` yang mengunci koneksi keluar hanya ke domain resmi Google Generative AI dan Al-Quran Cloud API. |
| **SEC-05** | Isolasi Informasi Debug | Pemanggilan logging kesalahan diisolasi menggunakan utilitas `logger.ts` yang hanya aktif pada mode pengembangan (`import.meta.env.DEV`), mencegah kebocoran jejak stack trace pada rilis produksi. |
| **SEC-06** | Standar Header HTTP | Konfigurasi file `_headers` dan `netlify.toml` menerapkan `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, dan `Permissions-Policy`. |
| **SEC-07** | Proteksi Autofill Kredensial | Kolom input API Key dilengkapi atribut `autoComplete="off"`, `data-1p-ignore`, dan `data-lpignore="true"` untuk mencegah intervensi pengelola kata sandi peramban. |

---

## Stack Teknologi

- **Frontend Core**: [React 18.3](https://react.dev/) dengan [TypeScript 5.7](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6.2](https://vitejs.dev/)
- **Database Lokal**: [Dexie.js v4.0](https://dexie.org/) dan [dexie-react-hooks](https://github.com/dexie/Dexie.js) (IndexedDB)
- **Animasi & Gestur**: [Motion (Framer Motion v12)](https://motion.dev/)
- **Styling**: [Tailwind CSS v3.4](https://tailwindcss.com/)
- **Icons**: [Phosphor Icons React v2.1](https://phosphoricons.com/)
- **Tipografi Arab**: Google Fonts (Amiri, Amiri Quran, Scheherazade New, Noto Naskh Arabic)
- **Integrasi AI**: [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- **PWA Engine**: `vite-plugin-pwa` dan Workbox

---

## Panduan Instalasi & Menjalankan di Lokal

### Prasyarat
- Node.js versi 18.0.0 atau lebih tinggi
- Package manager pnpm (direkomendasikan) atau npm / yarn

### Langkah Instalasi

1. Clone repositori proyek:
   ```bash
   git clone https://github.com/username/istiqomah.git
   cd istiqomah
   ```

2. Pasang seluruh dependensi:
   ```bash
   pnpm install
   ```

3. Jalankan server development:
   ```bash
   pnpm run dev
   ```
   Aplikasi dapat diakses melalui browser di `http://localhost:5173`.

4. Build untuk produksi:
   ```bash
   pnpm run build
   ```
   Seluruh file bundle teroptimasi akan dihasilkan di folder `dist/`.

5. Preview hasil build produksi:
   ```bash
   pnpm run preview
   ```

---

## Panduan Deploy ke Netlify

Repositori ini telah dilengkapi dengan konfigurasi siap pakai untuk Netlify melalui berkas `netlify.toml`, `public/_headers`, dan `public/_redirects`.

### Langkah Deploy via Netlify Dashboard

1. Push kode ke repositori GitHub:
   ```bash
   git remote add origin https://github.com/username/istiqomah.git
   git branch -M main
   git push -u origin main
   ```

2. Masuk ke dashboard [Netlify](https://app.netlify.com/) dan pilih **Add new site** lalu **Import an existing project**.

3. Hubungkan repositori GitHub `istiqomah`.

4. Pengaturan build akan otomatis terdeteksi dari `netlify.toml`:
   - **Build Command**: `pnpm run build`
   - **Publish Directory**: `dist`

5. Klik tombol **Deploy Istiqomah**. Website Anda akan langsung aktif (live) dengan dukungan routing SPA dan security headers yang menyala.

---

## Struktur Direktori

```
istiqomah/
├── public/
│   ├── _headers            # Header keamanan HTTP hosting statis
│   ├── _redirects          # SPA fallback routing Netlify (/* -> /index.html)
│   ├── icons/              # Ikon aplikasi PWA multi-resolusi
│   └── assets/             # File audio dan data offline awal
├── src/
│   ├── components/
│   │   ├── analytics/      # Heatmap, BarChart, BadgeGrid, dan StatsCard
│   │   ├── home/           # HabitCard, EditHabitModal, PrayerSearchModal, PrayerReaderModal, SavedPrayersModal, ApiKeyPromptModal
│   │   ├── layout/         # AppShell dan BottomNav
│   │   ├── quran/          # SurahList, AyahReader, TajweedText, TajweedGuideModal, KhatamProgress
│   │   ├── settings/       # ThemeToggle, ApiKeyInput, ModelSelector, PwaInstallCard, dan DataManager
│   │   └── ui/             # Modal (Bottom Sheet), PwaInstallModal, Button, Card, ProgressBar, dan Badge
│   ├── hooks/              # useDailyLog, useQuranReader, useHabits, useStreak, useSavedPrayers, usePwaInstall
│   ├── lib/
│   │   ├── crypto.ts       # Enkripsi Web Crypto API (AES-GCM 256-bit)
│   │   ├── data-manager.ts # Sanitasi ekspor, impor, dan reset data JSON
│   │   ├── db.ts           # Skema tabel IndexedDB Dexie.js
│   │   ├── gemini.ts       # Integrasi Google Gemini AI
│   │   ├── logger.ts       # Logger aman produksi (isDev only)
│   │   ├── notifications.ts# Service notifikasi browser lokal
│   │   ├── quran-data.ts   # Pemuatan data mushaf dan caching offline
│   │   ├── scroll.ts       # Utilitas auto-scroll navigasi ke atas
│   │   └── tajweed.ts      # Parser dan pemetaan warna tajwid
│   ├── types/              # Definisi interface dan tipe data TypeScript
│   ├── App.tsx             # State utama dan routing tab aplikasi
│   ├── index.css           # Styling Tailwind, glassmorphism, dan scrollbar
│   ├── main.tsx            # Entry point aplikasi React
│   └── vite-env.d.ts       # Type definitions environment Vite
├── index.html              # HTML utama, meta tags CSP, dan PWA setup
├── netlify.toml            # Konfigurasi build, SPA redirect, dan cache header Netlify
├── package.json            # Daftar dependensi dan npm scripts
├── tailwind.config.ts      # Konfigurasi token warna dan font Tailwind
├── tsconfig.json           # Konfigurasi compiler TypeScript
└── vite.config.ts          # Konfigurasi bundler Vite dan plugin PWA Workbox
```

---

## Kontribusi

Kontribusi perbaikan bug, penyempurnaan fitur, dan optimalisasi kode sangat diapresiasi:
1. Lakukan *fork* pada repositori ini.
2. Buat cabang baru untuk fitur yang dikerjakan (`git checkout -b fitur/nama-fitur`).
3. Simpan perubahan dengan pesan komit deskriptif (`git commit -m 'feat: deskripsi perubahan'`).
4. Unggah cabang ke repositori Anda (`git push origin fitur/nama-fitur`).
5. Ajukan *Pull Request* baru dengan penjelasan perubahan terkait.

---

## Lisensi

Proyek ini didistribusikan di bawah lisensi [MIT](./LICENSE). Dikembangkan sebagai sarana ikhtiar amal jariyah untuk memfasilitasi keteraturan ibadah harian dan pembacaan Al-Quran kaum muslimin di berbagai tempat.
