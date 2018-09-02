var mysql = require('mysql');
var blog = require('./blog/index');

var config = {
	host: '39.105.12.25',
	user: 'test',
	password: '123456',
	database: 'test'
};
var pool;

// 连接数据库
function connect() {
	pool = mysql.createPool(config);
	// pool.connect(handleError);
	pool.on('error', handleError);
}

connect();


function handleError(err) {
	if (err) {
		// 如果是连接断开，自动重新连接
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			connect();
		} else {
			console.error(err.stack || err);
		}
	}
}

var selectBlogList = function (sql, sqlParams, callback) {
	blog.selectBlogList(pool, sql, sqlParams, callback)
}
var selectAllBlogList = function (sql, callback) {
	blog.selectAllBlogList(pool, sql, callback)
}

module.exports = {
	selectBlogList,
	selectAllBlogList
};

