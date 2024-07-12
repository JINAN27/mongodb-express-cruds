membuat akun di mongodb user
1. Masuk sebagai Pengguna Admin
Pertama, masuk ke MongoDB sebagai pengguna admin yang memiliki hak untuk membuat dan mengelola pengguna. Jika Anda belum memiliki pengguna admin, buat terlebih dahulu.

2. Buat atau Verifikasi Pengguna
Jika pengguna appuser belum dibuat, buat pengguna dengan hak akses yang sesuai. Jika sudah dibuat, pastikan kredensialnya benar dan memiliki hak akses yang tepat.

Membuat Pengguna Baru
Masuk ke MongoDB sebagai admin:

sh
Salin kode
mongosh --port 27017
Kemudian, buat pengguna baru:

javascript
Salin kode
use admin

db.createUser({
  user: "appuser",
  pwd: "apppassword",
  roles: [
    { role: "readWrite", db: "eduwork" }
  ]
});
3. Coba Koneksi Ulang dengan Pengguna Baru
Setelah membuat atau memastikan pengguna, coba sambungkan kembali menggunakan perintah:

sh
Salin kode
mongosh --port 27017 -u "appuser" -p "apppassword" --authenticationDatabase "admin"
4. Cek Pengguna dan Hak Akses
Setelah berhasil login, pastikan pengguna Anda memiliki akses yang benar ke database eduwork:

javascript
Salin kode
use eduwork
db.runCommand({ connectionStatus: 1 })
Pastikan Anda melihat informasi tentang hak akses pengguna yang sesuai.

5. Perbarui Konfigurasi Aplikasi
Jika kredensial pengguna sudah benar, pastikan URI MongoDB di aplikasi Anda juga benar. Misalnya:

config/mongodb.js
javascript
Salin kode
const { MongoClient } = require('mongodb');

const uri = "mongodb://appuser:apppassword@127.0.0.1:27017/eduwork?authSource=admin";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = { connect };
