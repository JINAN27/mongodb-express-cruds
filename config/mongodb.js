// config/mongodb.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // Periksa URL dan port
const client = new MongoClient(url);

let db;

async function connect() {
    try {
        await client.connect();
        console.log('Koneksi ke MongoDB berhasil');
        db = client.db("eduwork"); // Ganti dengan nama basis data Anda
    } catch (e) {
        console.error('Gagal menghubungkan ke MongoDB:', e.message);
        throw e; // Melempar kesalahan untuk ditangani di tempat pemanggilan
    }
}

const getDb = () => db;

module.exports = { connect, getDb };
