var express = require('express');
var router = express.Router();
var ss = require('../view/index');

/* GET home page. */
router.get('/test', ss.test);

module.exports = router;
