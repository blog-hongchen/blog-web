var db = require('../database/db.js');
var sql = require('../database/sql.js');

function blogList(req, res, next) {
	// 输出 JSON 格式
	let sqlParams = [], sqlStr = sql.selectBlog;
	if (req.query.title) {
		sqlParams.push(req.query.title);
		sqlStr = sql.selectBlogTitle;
	}
	sqlParams.push((req.query.page - 1) * req.query.size);
	sqlParams.push(req.query.size * 1);
	db.selectBlogList(sqlStr, sqlParams, function (error, result, fields) {
		var response = {
			data: result[1],
			code: 200,
			total: result[0].length,
			message: error
		};
		if (error) {
			response.code = 500;
			res.end(JSON.stringify(response));
		}
		res.end(JSON.stringify(response));
	});
}


module.exports.blogList = blogList;