var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Vacuum World', 
    writeup: 'Hello User',
    numRows: 1,
    numCols: 2 });
});

module.exports = router;
