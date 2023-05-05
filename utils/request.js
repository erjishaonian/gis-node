let request = {
    success: (data = {}, msg = '成功') => {
        return {
            status: 200,
            msg: msg,
            data: data
        }
    },
	error: (msg = '失败') => {
        return {
            status: 500,
            msg: msg,
            data: {}
        }
    },
    other: (data, msg, status) => {
        return {
            status: status,
            msg: msg,
            data: data
        }
    }
}
module.exports = request