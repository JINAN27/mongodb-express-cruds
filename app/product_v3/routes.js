const router = require('express').Router();
const Product = require('./model');


router.get('/', (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(error => res.status(400).json({ error: error.message }));
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    Product.findById(id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        })
        .catch(error => res.status(400).json({ error: error.message }));
});

router.post('/', (req, res) => {
    const { name, price, stock, status, imageUrl } = req.body;

    Product.create({ name, price, stock, status, imageUrl })
        .then(product => res.status(201).json(product))
        .catch(error => res.status(400).json({ error: error.message }));
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, stock, status, imageUrl } = req.body;

    Product.findByIdAndUpdate(id, { name, price, stock, status, imageUrl }, { new: true })
        .then(updatedProduct => {
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(updatedProduct);
        })
        .catch(error => res.status(400).json({ error: error.message }));
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Product.findByIdAndDelete(id)
        .then(deletedProduct => {
            if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        })
        .catch(error => res.status(400).json({ error: error.message }));
});

module.exports = router;
