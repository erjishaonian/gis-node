//连接mysql
const mysql = require('../../database/mysql-gis')

const sqlActive = (sql) => {
    return new Promise((resolve, reject) => {
        mysql.executeSQL(sql).then(res => {
            // console.log(res)
            resolve(res)
        }).catch(e => {
            console.log(e)
            reject(e)
        })
    })
}

const weatherSQL = {
    selectByPCD: (req) => {
        let sql = `SELECT json FROM weather WHERE
        province = '` + req.province + `' AND
        city = '` + req.city + `' AND
        DATE(create_time) = CURDATE()`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql)
    },
    insert: (req) => {
        let sql = `INSERT INTO weather (json, province, city, district) VALUES ('`+ 
            req.json+`', '`+ req.province+`', '`+ req.city+`', '`+ req.district+`')`
        return sqlActive(sql)
    }
}

module.exports = weatherSQL