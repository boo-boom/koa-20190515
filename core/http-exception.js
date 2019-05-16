class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = -100, code = 400) {
        super()
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || -180
    }
}

class Success extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 201
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
}