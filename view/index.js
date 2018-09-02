var db = require('../database/db.js');
var sql = require('../database/sql.js');

function blogList(req, res, next) {
	// 输出 JSON 格式
	let sqlParams = [];
	// query = {page: '1', size: '1', title: '', content: ''},
	// sqlParams.push(req.query.title);
	// sqlParams.push(req.query.content);
	sqlParams.push((req.query.page - 1) * req.query.size);
	sqlParams.push(req.query.size * 1);
	db.selectBlogList(sql.selectBlog, sqlParams, function (error, result, fields) {
		var response = {
			data: result,
			code: 200,
			total: 0,
			message: error
		};
		if (error) {
			response.code = 500;
			res.end(JSON.stringify(response));
		}
		db.selectAllBlogList(sql.selectAllBlog, function (error1, allResult, fields1) {
			if (error) {
				response.code = 500;
				res.end(JSON.stringify(response));
			}
			response.total = allResult.length;
			res.end(JSON.stringify(response));
		});
	});
}


module.exports.blogList = blogList;