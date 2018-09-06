var mysql = require('mysql');

var config = {
	host: '39.105.12.25',
	user: 'test',
	password: '123456',
	database: 'test',
	multipleStatements: true
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

var ParamsConnection = function (sql, sqlParams, callback) {
	pool.getConnection(function (err, connection) {
		if (err) {
			callback(err, null, null);
			throw err;
		}
		var test = connection.query(sql, sqlParams, function (error, result, fields) {
			connection.release();
			if (error) {
				callback(error, null, null);
				throw error;
			}
			callback(error, result, fields);
		});
	});

}
var Connection = function (sql, callback) {
	pool.getConnection(function (err, connection) {
		if (err) {
			callback(err, null, null);
			throw err;
		}
		connection.query(sql, function (error, result, fields) {
			connection.release();
			if (error) {
				callback(error, null, null);
				throw error;
			}
			callback(error, result, fields);
		});
	});
}

module.exports = {
	ParamsConnection,
	Connection
};

