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

const expertSQL = {
    selectByEmail: (req) => {
        let sql = `SELECT * FROM expert WHERE
        user_id = (SELECT id FROM user WHERE email = '`+ req.email + `')`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql)
    },
    insert: (req) => {
        let sql = `INSERT INTO expert (tip, img, introduce, education, school, content, status, user_id) VALUES ('`+ 
            req.expert.tip+`', '`+ req.expert.img+`', '`+ req.expert.introduce+`', '`+ req.expert.education+`', '`+ req.expert.school+`', '`+ req.expert.content+`', '待审核', (SELECT id FROM user WHERE email = '`+ req.email + `') )`
        return sqlActive(sql)
    },
    selectAll: (req) => {
        let sql = `SELECT expert.tip as expertTip, expert.img as experImg, expert.introduce as expertIntroduce, expert.education, expert.school, expert.content, expert.status as expertStatus, expert.user_id, user.*  FROM expert, user where expert.user_id = user.id`
        //let sql = `SELECT * FROM expert join user on expert.user_id = user.id`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql)
    },
    selectAllByStatus: (req) => {
        let sql = `SELECT expert.tip as expertTip, expert.img as experImg, expert.introduce as expertIntroduce, expert.education, expert.school, expert.content, expert.status as expertStatus, expert.user_id, user.*  FROM expert, user where expert.user_id = user.id and expert.status = '`+req.status+`'`
        //let sql = `SELECT * FROM expert join user on expert.user_id = user.id`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql)
    },
    updateStatusByEmail: (req) => {
        let sql = `UPDATE expert SET status = '`+ req.status+`' WHERE user_id = (SELECT id FROM user WHERE email = '`+ req.email + `')`
        return sqlActive(sql)
    }
}

module.exports = expertSQL