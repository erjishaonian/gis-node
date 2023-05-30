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

const chatSQL = {
    getUserId: (req) => {
        let sql = `SELECT id FROM user WHERE
        email = '`+ req.email + `'`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql)
    },
    getUser: (req) => {
        let sql = `SELECT user.* , chatList.id as chat_id,chatList.get_user, chatList.set_user  FROM chatList , user WHERE
        set_user = (SELECT id FROM user WHERE email = '`+ req.email + `') and user.id = chatList.get_user`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql)
    },
    setUser: (req) => {
        let sql = `SELECT user.* , chatList.id as chat_id,chatList.get_user, chatList.set_user FROM chatList , user WHERE
        get_user = (SELECT id FROM user WHERE email = '`+ req.email + `') and user.id = chatList.set_user`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql)
    },
    selectChat:(req) => {
        let sql = `SELECT * FROM chat WHERE
        chat_id = '`+ req.id + `'`
        console.log('执行sql语句------>')
        // console.log(sql)
        return sqlActive(sql)
    },
    insertChatList: (req) => {
        let sql = `INSERT INTO chatList (set_user, get_user) VALUES ((SELECT id FROM user WHERE email = '`+ req.set_user + `'), (SELECT id FROM user WHERE email = '`+ req.get_user + `'))`
        return sqlActive(sql)
    },
    insertChat: (req) => {
        let sql = `INSERT INTO chat (set_user, get_user, content, status, chat_id) 
        VALUES ((SELECT id FROM user WHERE email = '`+ req.set_user + `'), (SELECT id FROM user WHERE email = '`+ req.get_user + `'), 
        '`+ req.content + `', '已发送', '`+ req.chat_id + `')`
        return sqlActive(sql)
    },
    selectChatId: (req) => {
        
    },
    updataChatStatus: (req) => {
        let sql = `UPDATE chat SET status = '` + req.status +`' WHERE chat_id = '`+ req.id +`'`
        return sqlActive(sql)
    }
}

module.exports = chatSQL