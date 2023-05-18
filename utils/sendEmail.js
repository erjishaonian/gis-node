var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');

smtpTransport = nodemailer.createTransport({
    service: 'QQ',
    auth: {
        user: '1593916507@qq.com',//自己的QQ邮箱地址
        pass: 'fvcwdwbfllwyjdaf'
    }
});


/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var sendMail = function(recipient, subject, html) {
    return new Promise((resolve, reject) => {
        console.log('向' + recipient + '发送验证码')
        smtpTransport.sendMail({
            from: '1593916507@qq.com',
            to: recipient,
            subject: subject,
            html: html
    
        }, function(error, response) {
            if (error) {
                console.log('发送邮件失败');
                reject(error)
            }
            else{
                console.log('发送成功');
                resolve(response)
            }
        });
    })
    
}

module.exports = sendMail