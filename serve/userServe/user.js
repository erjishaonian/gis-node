let request = require('../../utils/request')
let sendEmail = require('../../utils/sendEmail')
let userSQL = require('./sql')
const fs = require('fs')
const path = require('path')

let userServe = {
    //登录
    login: (req) => {
        return new Promise((resolve, reject) => {
            userSQL.selectByEmailAndPassword(req).then(res => {
                if (res.length === 1) {
                    if (res[0].status !== '正常') {
                        resolve(request.error('用户状态异常！'))
                    }
                    const {
                        email,
                        username,
                        role
                    } = res[0]
                    let user = {
                        email,
                        username,
                        role
                    }
                    resolve(request.success(user))
                }
                else {
                    userSQL.selectByEmail(req).then(res => {
                        if (res.length === 1) {
                            resolve(request.other({}, '密码错误', 501))
                        }
                        else {
                            resolve(request.other({}, '邮箱未注册', 502))
                        }
                    })
                }
            }).catch(e => {
                userSQL.selectByEmail(req).then(res => {
                    if (res.length === 1) {
                        resolve(request.other({}, '密码错误', 501))
                    }
                    else {
                        resolve(request.other({}, '邮箱未注册', 502))
                    }
                })
                resolve(request.other({}, 'sql语句执行错误！', 550))
            })
        })
    },
    //发送验证码
    sendCode: (req) => {
        return new Promise((resolve, reject) => {
            let randomNum = MathRand(6);
            req.code = randomNum
            userSQL.selectByEmail(req).then(res => {
                if (res.length === 1) {
                    //数据库存在数据
                    if (res[0].status !== '未激活') {
                        resolve(request.error('此邮箱已经注册！'))
                    }
                    userSQL.updateCode(req).then(res => {
                        sendEmail(req.email, '注册验证码', 'Hi 您好,您的注册验证码为:' + randomNum).then(res => {
                            resolve(request.success())
                        }).catch(e => {
                            resolve(request.error('邮件发送失败！请检查邮箱是否正确'))
                        })
                    })
                }
                else {
                    userSQL.insert(req).then(res => {
                        sendEmail(req.email, '注册验证码', 'Hi 您好,您的注册验证码为:' + randomNum).then(res => {
                            resolve(request.success())
                        }).catch(e => {
                            resolve(request.error('邮件发送失败！请检查邮箱是否正确'))
                        })
                    })
                }
            })
        })
    },
    //验证验证码
    code: (req) => {
        return new Promise((resolve, reject) => {
            userSQL.selectByEmailAndCode(req).then(res => {
                if (res.length === 1) {
                    resolve(request.success())
                }
                else {
                    resolve(request.error('验证码错误'))
                }
            })
        })
    },
    //更新密码
    registerPassword: (req) => {
        return new Promise((resolve, reject) => {
            userSQL.updatePassword(req).then(res => {
                resolve(request.success())
            })
        })
    },
    //获取个人信息
    getUserInfo: (req) => {
        return new Promise((resolve, reject) => {
            userSQL.selectByEmail(req).then(res => {
                if (res.length === 1) {
                    if (res[0].status !== '正常') {
                        resolve(request.error('用户状态异常！'))
                    }
                    const {
                        email,
                        username,
                        img,
                        introduce,
                        phone,
                        hide,
                        real_name,
                        address,
                        province,
                        city,
                        district,
                        wx,
                        qq,
                        role
                    } = res[0]
                    let user = {
                        email,
                        username,
                        img,
                        introduce,
                        phone,
                        hide,
                        real_name,
                        address,
                        province,
                        city,
                        district,
                        wx,
                        qq,
                        role
                    }
                    resolve(request.success(user))
                }
                else {
                    resolve(request.other({}, '邮箱未注册', 502))
                }
            }).catch(e => {
                resolve(request.other({}, 'sql语句执行错误！', 550))
            })
        })
    },
    //修改个人信息
    editUserInfo: (req) => {
        return new Promise((resolve, reject) => {
            if (req.saveImg) {
                const base64Data = req.img
                const binaryData = Buffer.from(base64Data, 'base64')
                const filePath = path.join('./serve/userServe/img', req.email + '.jpg')
                const base64Image = base64Data.split(';base64,').pop();
                fs.writeFile(filePath, base64Image, { encoding: 'base64' }, (err) => {
                    if (err) {
                        console.error(err);
                        resolve(request.other({}, '头像保存失败！', 550))
                    } else {
                        const fileUrl = `http://localhost:3300/` + req.email + `.jpg`
                        req.img = fileUrl
                        userSQL.update(req).then(res => {
                            resolve(request.success())
                        }).catch(e => {
                            resolve(request.other({}, 'sql语句执行错误！', 550))
                        })
                    }
                });
            }
            else{
                userSQL.update(req).then(res => {
                    resolve(request.success())
                }).catch(e => {
                    resolve(request.other({}, 'sql语句执行错误！', 550))
                })
            }

        })
    }
}

//生成一个随机的六位数验证码
function MathRand(num) {
    var Num = "";
    for (var i = 0; i < num; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}
module.exports = userServe