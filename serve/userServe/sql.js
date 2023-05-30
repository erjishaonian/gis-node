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

const userSQL = {
    selectByEmailAndPassword : (req) => { 
        let sql = `SELECT * FROM user WHERE
        user.email = '` + req.email + `' AND
        user.password = '` + req.password + `'`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql)
        
    },
    updateLastLoginByEmail: (req) => {
        let sql = `UPDATE user SET last_login = NOW() WHERE email = '`+ req.email +`'`
        return sqlActive(sql)
    },
    selectByEmail : (req) => { 
        let sql = `SELECT * FROM user WHERE
        user.email = '` + req.email + `'`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql) 
    },
    selectById : (id) => { 
        let sql = `SELECT * FROM user WHERE
        user.id = '` + id + `'`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql) 
    },
    updateCode : (req) => {
        let sql = `UPDATE user SET code = '`+ req.code+`' WHERE email = '`+ req.email +`'`
        return sqlActive(sql)
    },
    insert : (req) => {
        let sql = `INSERT INTO user (email, code, status, role) VALUES ('`+ req.email+`', '`+ req.code+`', '未激活', '农户')`
        return sqlActive(sql)
    },
    selectByEmailAndCode : (req) => {
        let sql = `SELECT * FROM user WHERE
        user.email = '` + req.email + `' AND
        user.code = '` + req.code + `'`
        return sqlActive(sql)
    },
    updatePassword: (req) => {
        let sql = `UPDATE user SET password = '`+ req.password+`', status = '正常', username = '用户' WHERE email = '`+ req.email +`'`
        return sqlActive(sql)
    },
    update: (req) => {
        console.log('-*/-*/-/-*/*--/')
        console.log((req.img !== null ? (` ,img = '` + req.img + `' `):' '))
        
        let sql = `UPDATE user SET status = '正常' `
            +(req.img !== null ? (` ,img = '` + req.img + `' `):' ')
            +(req.phone !== null ? (` ,phone = '` + req.phone + `' `):' ')
            +(req.introduce !== null ? (` ,introduce = '` + req.introduce + `' `):' ')
            +(req.real_name !== null ? (` ,real_name = '` + req.real_name + `' `):' ')
            +(req.address !== null ? (` ,address = '` + req.address + `' `):' ')
            +(req.province !== null ? (`, province = '` + req.province + `' `):' ')
            +(req.city !== null ? (`, city = '` + req.city + `' `):' ')
            +(req.district !== null ? (`, district = '` + req.district + `' `):' ')
            +(req.wx !== null ? (`, wx = '` + req.wx + `' `):' ')
            +(req.qq !== null ? (`, qq = '` + req.qq + `' `):' ')
            +(req.username !== null ? (`, username = '` + req.username + `' `):' ')+
            ` ,hide = ` + req.hide + ' '+
            `WHERE email = '`+ req.email +`'`
            console.log(sql)
            
        return sqlActive(sql)
    },
    updateRole: (req) => {
        let sql = `UPDATE user SET role = '`+ req.role+`' WHERE email = '`+ req.email + `'`
        return sqlActive(sql)
    }
}

module.exports = userSQL