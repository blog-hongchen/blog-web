var express = require('express');
var router = express.Router();
var blog = require('../view/index');

/* GET home page. */
router.get('/api/blogList', blog.blogList);

module.exports = router;
