### Contoh Isi File `configuration.md`

File `configuration.md` dapat berisi informasi tentang konfigurasi proyek:

```markdown
# Konfigurasi Proyek Lumos

## Konfigurasi Database

Pastikan untuk mengisi konfigurasi database di `config/db.config.js` dengan parameter berikut:

- `username`: nama pengguna database Anda
- `password`: kata sandi database Anda
- `database`: nama database `lumos_db`
- `host`: biasanya `localhost` untuk pengembangan lokal

## Environment Variables

Setelah environment variables seperti berikut dalam file `.env`:

- `PORT`: Port server (default: 3000)
- `DB_HOST`: Host untuk database
- `DB_USER`: Username untuk database
- `DB_PASS`: Password untuk database

## API Keys

Simpan semua API key yang diperlukan di dalam file `.env` untuk menjaga keamanan.
```
