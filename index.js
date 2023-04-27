const express = require('express')
//清空终端
console.log('\n\n\n\n')
//连接mysql
const mysql = require('./database/mysql-gis')
const app = express()

// 导入依赖包(将请求参数转化为json)
const parser = require('body-parser')
app.use(parser.json())
// app.use(express.urlencoded({ extended: false }))

/*为app添加中间件处理跨域请求*/
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
	res.header('Access-Control-Allow-Headers', 'XMLHttpRequest')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

//日志
const logger = (req, res, next) => {
	console.log('\n')
	console.log('logger --->')
	console.log('请求地址: ' + req.url)
	console.log('请求方法: ' + req.method)
	console.log('\n')
	next()
}
app.use(logger)

// 监听
app.post('/', (req, res) => {
	// mysql.executeSQL('select * from user').then(res => {
	// 	console.log(res)
	// }).catch(e => {
	// 	console.log(e)
	// })
	
	res.send({})
})

// 监听3300端口
app.listen(3300, () => {
	console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
	console.log('服务器运行在3300\n\n')
})
