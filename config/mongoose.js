const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://appuser:apppassword@127.0.0.1:27017/eduwork?authSource=admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Server terhubung ke database');
    } catch (error) {
        console.error('Koneksi ke database gagal:', error);
        process.exit(1); 
    }
};

module.exports = connectDB;
