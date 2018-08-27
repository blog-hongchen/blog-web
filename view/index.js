function test(req, res, next) {
	// 输出 JSON 格式
	var response = {
		data: [
			{
				"first_name": req.query.first_name,
				"last_name": req.query.last_name
			}
		],

		code: 200,
		message: "测试成功"
	};
	res.end(JSON.stringify(response));
}

module.exports.test = test;