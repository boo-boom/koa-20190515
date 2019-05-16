const { HttpException } = require('../core/http-exception')

const catchError = async(ctx, next) => {
    try {
        await next()
    } catch(error) {
        const isHttpException = error instanceof HttpException
        const isDev = global.config.environment === 'dev'
        
        if(isDev && !isHttpException){
            throw error
        }

        if(isHttpException) {
            // 已知异常
            ctx.body = {
                errorCode: error.errorCode,
                msg: error.msg,
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            // 未知异常
            ctx.body = {
                errorCode: 999,
                msg: '服务器内部错误',
                requestUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }

    }
}

module.exports = catchError