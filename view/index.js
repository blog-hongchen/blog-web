var db = require('../database/db.js');
var sql = require('../database/sql.js');

function blogList(req, res, next) {
	// 输出 JSON 格式
	let sqlParams = [], sqlStr = sql.selectBlogList;
	if (req.query.title) {
		sqlParams.push(req.query.title);
		sqlStr = sql.selectBlogByTitle;
	}
	sqlParams.push((req.query.page - 1) * req.query.size);
	sqlParams.push(req.query.size * 1);
	db.ParamsConnection(sqlStr, sqlParams, function (error, result, fields) {
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

function blogItem(req, res, next) {
// 输出 JSON 格式
	let sqlParams = [], sqlStr = sql.selectBlog;
	let response = {
		data: "",
		code: 500,
		message: "获取数据失败"
	};
	if (req.query.id) {
		sqlParams.push(req.query.id);
		db.ParamsConnection(sqlStr, sqlParams, function (error, result, fields) {
			response.data = result[0];
			response.code = 200;
			response.message = error;
			if (error) {
				response.code = 500;
				res.end(JSON.stringify(response));
			}
			res.end(JSON.stringify(response));
		});
	} else {
		response.code = 500;
		res.end(JSON.stringify(response));
	}
}

function updateBlog(req, res, next) {
// 输出 JSON 格式
	let sqlParams = [], sqlStr = sql.updateBlog;
	sqlParams.push(req.body.title);
	sqlParams.push(req.body.article);
	sqlParams.push(req.body.classification * 1);
	sqlParams.push(req.body.id * 1);
	db.ParamsConnection(sqlStr, sqlParams, function (error, result, fields) {
		var response = {
			data: result,
			code: 200,
			message: error
		};
		if (error) {
			response.code = 500;
			res.end(JSON.stringify(response));
		}
		res.end(JSON.stringify(response));
	});
}

module.exports = {
	blogList,
	blogItem,
	updateBlog
};