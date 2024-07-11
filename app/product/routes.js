const express = require('express');
const router = express.Router();
const connection = require('../../config/mysql');

router.get('/product', (req, res) => {
 connection.connect();
 connection.query({
  sql: 'SELECT * FROM products', 
},
  (error, result) => {
    if(error) {
      res.send({
        status: 'failed',
        response: 'failed to fetch data'
      });
  } else {
    res.send({
      status: 'ok',
      response: 'result'
    });
  }
});
connection.end();
});
  

router.get('/:category/:tag', (req, res) => {
  const { category, tag } = req.params;
  res.json({
    category,
    tag
  });
});

router.get('/product/:id', (req, res) => {
    res.json({
      id: req.params.id
    });
  });

  router.get('/product/', (req, res) => {
    res.json(req.body)
  });
module.exports = router;
