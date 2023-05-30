let request = require('../../utils/request')
let expertSQL = require('./sql')
let userSQL = require('../userServe/sql')
const axios = require('axios')
const jsonFS = require('../../utils/json')
const fs = require('fs')
const path = require('path')

let expertServe = {
    create: (req) => {
        return new Promise((resolve, reject) => {
            const base64Data = req.expert.img
            const binaryData = Buffer.from(base64Data, 'base64')
            const filePath = path.join('./serve/expertServe/img', req.email + '-expert.jpg')
            const base64Image = base64Data.split(';base64,').pop();
            fs.writeFile(filePath, base64Image, { encoding: 'base64' }, (err) => {
                if (err) {
                    console.error(err);
                    resolve(request.other({}, '资质图片上传失败！', 550))
                } else {
                    const fileUrl = `http://localhost:3300/` + req.email + `-expert.jpg`
                    req.expert.img = fileUrl
                    expertSQL.selectByEmail(req).then(res => {
                        if (res.length >= 1) {
                            resolve(request.error('请勿重复申请！'))
                        }
                        else {
                            expertSQL.insert(req).then(sqlRes => {
                                resolve(request.success())
                            })
                        }
                    })
                }
            });
            
        })
    },
    getAll: (req) => {
        return new Promise((resolve, reject) => {
            expertSQL.selectAll(req).then(res => {
                resolve(request.success(res))
            })
        })
    },
    getZC: (req) => {
        return new Promise((resolve, reject) => {
            req. status = '正常'
            expertSQL.selectAll(req).then(res => {
                resolve(request.success(res))
            })
        })
    },
    pass: (req) => {
        return new Promise((resolve, reject) => {
            expertSQL.updateStatusByEmail({email: req.email, status: '正常'}).then(res => {
                userSQL.updateRole({email: req.email, role: '专家'}).then(Res => {
                    resolve(request.success('角色已变更为专家'))
                })
            })
        })
    }
}

module.exports = expertServe