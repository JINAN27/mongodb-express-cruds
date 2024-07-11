const router = require('express').router;
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productController = require('./controller');

router.get('/product', productController.index);
router.get('/product/:id', productController.index);
router.post('/product', upload.single('image'), productController.store)

module.exports = router