let mysql = require('mysql')
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'gis'
})
connection.connect()
console.log('数据库已连接')

function executeSQL(sql) {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, res) => {
            if(err) {
                reject(err)
                return
            }
            resolve(res)
        })
    })
    return promise
}

module.exports = {
    executeSQL
}

// connection.end()