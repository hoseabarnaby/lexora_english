# Lexora English Boost — Vocab Fix + Security Checklist

## Yang sudah ditambahkan
- Login wajib sebelum masuk dashboard.
- Supabase RLS per akun memakai `auth.uid()`.
- Frontend menolak `service_role` / secret key.
- Password minimal 8 karakter.
- Vocab Fix + Security headers untuk Netlify (`_headers`) dan Vercel (`vercel.json`).
- Content Vocab Fix + Security Policy untuk membatasi script, iframe, dan koneksi luar.
- Database hardening: `force row level security`, revoke akses `anon`, grant hanya untuk `authenticated`, serta constraint skor/review.

## Wajib kamu lakukan di Supabase
1. Jalankan `supabase-schema.sql` versi terbaru di SQL Editor.
2. Di `config.js`, isi hanya `SUPABASE_URL` dan `anon/publishable key`. Jangan pakai `service_role` atau `sb_secret_...`.
3. Supabase → Authentication → URL Configuration: isi Site URL dan Redirect URLs dengan domain websitemu.
4. Supabase → Authentication → Providers: aktifkan Google hanya kalau sudah setting OAuth benar.
5. Gunakan HTTPS saat hosting.

## Catatan jujur
Website frontend tidak bisa dibuat 100% anti-hack. Keamanan utamanya ada pada RLS Supabase, tidak menaruh secret key di frontend, HTTPS, dan security headers hosting.
