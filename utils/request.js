//导入加密解密包
const cryp = require('../utils/cryp')
let request = {
    success: (data = {}, msg = '成功') => {
        let requst = {
            status: 200,
            msg: msg,
            data: data
        }
        console.log('返回----->')
        // console.log(requst)
        console.log('[obejct]')
        return cryp.encryptFunc(JSON.stringify(requst))
    },
	error: (msg = '失败') => {
        let requst = {
            status: 500,
            msg: msg,
            data: {}
        }
        console.log('返回----->')
        console.log(requst)
        return cryp.encryptFunc(JSON.stringify(requst))
    },
    other: (data, msg, status) => {
        let requst = {
            status: status,
            msg: msg,
            data: data
        }
        console.log('返回----->')
        console.log(requst)
        return cryp.encryptFunc(JSON.stringify(requst))
    }
}
module.exports = request