const express = require('express');
const app = express();
// 导入依赖包(将请求参数转化为json)
const parser = require('body-parser');
app.use(parser.json());
// app.use(express.urlencoded({ extended: false }));

const vipLogin = {
	code: 200,
	msg: 'success',
	data: []
};

/*为app添加中间件处理跨域请求*/
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// get方式监听/login请求
app.get('/login', (req, res) => {
	console.log(req.query, '<-- req');
	res.send(vipLogin);
});

// post方式监听
app.post('/ownInfo', (req, res) => {
	console.log(req, '<--- post - req');
	res.send({ code: 200, msg: 'success', data: [{ name: 'namei' }], rP: req.body });
});

// 监听3300端口
app.listen(3300, () => {
	console.log('服务器运行在3300');
});
