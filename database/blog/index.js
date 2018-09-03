function selectBlogList(pool, sql, sqlParams, callback) {
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
		console.log("test", test.sql)
	});
}

function selectAllBlogList(pool, sql, callback) {
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
	selectBlogList,
	selectAllBlogList
};