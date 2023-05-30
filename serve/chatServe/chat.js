let request = require('../../utils/request')
let chatSQL = require('./sql')
const axios = require('axios')
const jsonFS = require('../../utils/json')

let chatServe = {
    getList: (req) => {
        return new Promise((resolve, reject) => {
            chatSQL.getUserId(req).then(id => {
                chatSQL.getUser(req).then(getRes => {
                    chatSQL.setUser(req).then(setRes => {
                        let list = [...getRes, ...setRes]
                        let listPromise = []
                        for (let i = 0; i < list.length; i++) {
                            let p = chatSQL.selectChat({id: list[i].chat_id})
                            listPromise.push(p)
                        }
                        Promise.all(listPromise).then(listRes => {
                            for (let i = 0; i < list.length; i++) {
                                list[i].chat = listRes[i]
                            }
                            let r = {
                                id: id,
                                list: list,
                                get: getRes,
                                set: setRes
                            }
                            resolve(request.success(r))
                        })
                    })
                })
            })
            
        })
    },
    createChat: (req) => {
        return new Promise((resolve, reject) => {
            chatSQL.insertChatList(req).then(res => {
                resolve(request.success())
            })
        })
    },
    chat: (req) => {
        return new Promise((resolve, reject) => {
            chatSQL.insertChat(req).then(res => {
                resolve(true)
            })
        })
    },
    read: (req) => {
        return new Promise((resolve, reject) => {
            req.status = '已读'
            chatSQL.updataChatStatus(req).then(res => {
                resolve(request.success())
            })
        })
    }
}

module.exports = chatServe