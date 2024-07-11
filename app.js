require('./config/mongoose')
const express = require('express');
const app = express();
const logger = require('morgan');
const mongodb = require('./config/mongodb'); 
const productRouterV2 = require('./product_v2/routes');


app.use(logger('dev'));


app.use(express.json());


app.use(express.urlencoded({ extended: true }));


mongodb.connect().catch(err => {
    console.error('Gagal menghubungkan ke MongoDB:', err.message);
    process.exit(1); 
});

app.use('/api/v2', productRouterV2);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
