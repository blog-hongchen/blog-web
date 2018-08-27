var server = require('express');
var bodyParser = require('body-parser');
var app = server();
var urlencodedParser = bodyParser.urlencoded({extended: false});

var indexRouter = require('./routes/index');

app.use(server.static('public'));

app.all('*', urlencodedParser, function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});//设置response编码为utf-8
	if (req.method == 'OPTIONS') {
		res.send(200);
		// /让options请求快速返回/
	} else {
		next();
	}
});

// app.get('/', function (req, res) {
// 	res.sendFile(__dirname + "/" + "index.html");
// })
app.use('/', indexRouter);

var server = app.listen(8087, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})