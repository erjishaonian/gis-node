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

const mapSQL = {
    selectByPCD: (req) => {
        let sql = `SELECT json FROM map WHERE
        province = '` + req.province + `' AND
        city = '` + req.city + `' AND
        district = '` + req.district + `'`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql)
    },
    insert: (req) => {
        let sql = `INSERT INTO map (json, province, city, district) VALUES ('`+ 
            req.json+`', '`+ req.province+`', '`+ req.city+`', '`+ req.district+`')`
        return sqlActive(sql)
    }
}

module.exports = mapSQL