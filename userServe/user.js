let request = require('../utils/request')
let sendEmail = require('../utils/sendEmail')

let userServe = {
    login: (req) => {
        return request.success()
    },
    sendCode: (res) => {
        let randomNum = MathRand(6);
        sendEmail(res.email, '注册验证码', 'Hi 您好,您的注册验证码为:' + randomNum).then(res => {
            return request.success()
        }).catch(e => {
            return request.error('邮件发送失败！')
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