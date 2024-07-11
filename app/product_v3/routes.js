const router = require('express').Router();
const multer = require('multer');
const Product = require('./model');
const upload = multer({dest: 'uploads'});
const product = require('./model');

router.post('/product', upload.single('image'), (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.files;
    if(image) {
        const target = path.join(_dirname, '../../uploads', image.originalName);
        fs.renameSync(image.path, target);
        Product.create({name, price, stock, status, image_url: 'http://localhost:3080/public${image.originalname'})
        .then(result => res.send(result))
        .catch(error => res.send(error));


    }

}
);

module.exports = router;