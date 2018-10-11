var express = require('express');
var router = express.Router();
var blog = require('../view/index');

/* GET home page. */
router.get('/api/blogList', blog.blogList);
router.get('/api/blog', blog.blogItem);
router.post('/api/blog', blog.updateBlog);

module.exports = router;
