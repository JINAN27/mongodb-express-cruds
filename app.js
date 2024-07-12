const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongoose');
const mongodb = require('./config/mongodb');

const app = express();
const PORT = process.env.PORT || 3080;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


mongodb.connect().catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
});


connectDB();


const productRouterV2 = require('./product_v2/routes');
const productRouterV3 = require('./app/product_v3/routes');

app.use('/api/v2', productRouterV2);
app.use('/api/v3', productRouterV3);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
