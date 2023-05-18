const express = require('express')
//导入加密解密包
const cryp = require('./utils/cryp')
//清空终端
console.log('\n\n\n\n')
//连接mysql
const mysql = require('./database/mysql-gis')
const app = express()

const path = require('path')

const bodyParser = require('body-parser')

//跨域
const acct = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
	res.header('Access-Control-Allow-Headers', '*')
	// res.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
}

//日志
const logger = (req, res, next) => {
	console.log('\n')
	console.log('log 接收到请求--->')
	console.log('请求地址: ' + req.url)
	console.log('请求方法: ' + req.method)
	next()
}

//挂载
app.use(acct).use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json()).use(logger)

const serve = {
	user: require('./serve/userServe/user'),
	map: require('./serve/mapServe/map'),
	farm: require('./serve/farmServe/farm')
}

let request = require('./utils/request')

app.use(express.static(path.join(__dirname, './serve/userServe/img')));
// 监听
app.post('/', (req, res) => {
	let body = JSON.parse(cryp.decryptFunc(req.body.data))
	console.log('接收到参数并解密--->')
	console.log(body)
	let fun = String(body.method).split('.')
	
	// 
	if(serve[fun[0]] && serve[fun[0]][fun[1]])
	{
		console.log('开始业务操作----'+fun[0]+'----'+fun[1]+ '------>')
		serve[fun[0]][fun[1]](body.data).then(result=> {
			res.send(result)
		})
		
		
	}
	else {
		res.send(request.error('未找到方法'))
	}
	
	
})
// 监听3300端口
app.listen(3300, () => {
	console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
	console.log('服务器运行在3300\n\n')
})
