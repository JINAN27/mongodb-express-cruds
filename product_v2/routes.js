const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const productController = require('./controller');

const mongodb = require('../config/mongodb');
mongodb.connect().then((client) => {
    const db = client.db('eduwork');
    productController.setDB(db);
}).catch(err => {
    console.error('Gagal menghubungkan ke MongoDB:', err.message);
});

router.get('/products', productController.index);
router.get('/products/:id', productController.view);
router.post('/products', upload.single('image'), productController.store);
router.put('/products/:id', upload.single('image'), productController.update);
router.delete('/products/:id', productController.destroy);

module.exports = router;
