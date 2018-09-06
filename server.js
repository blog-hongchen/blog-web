var server = require('express');
var bodyParser = require('body-parser');
var app = server();
var urlencodedParser = bodyParser.urlencoded({extended: false});
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

app.use(server.static('public'));
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
	extended: true
}));
app.all('*', urlencodedParser, function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	if (req.method == 'OPTIONS') {
		res.sendStatus(200);
		// /让options请求快速返回/
	} else {
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});//设置response编码为utf-8
		next();
	}
});

// app.get('/', function (req, res) {
// 	res.sendFile(__dirname + "/" + "index.html");
// })
app.use('/', indexRouter);

var server = app.listen(8086, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})