const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        this.level = level || 1
        // 权限
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }
    // get时是class的属性，非func
    get m() {
        return async(ctx, next) => {
            // token检测：通过http规定的HttpBasicAuth
            const userToken = basicAuth(ctx.req)        // ctx.req => node原生的req对象
            let errMsg = 'token不合法'
            if(!userToken || !userToken.name) {
                throw new global.errs.Forbbiden(errMsg)
            }
            try {
                var decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch(error) {
                if(error.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new global.errs.Forbbiden(errMsg)
            }
            // 根据接口等级给予访问权限
            if(decode.scope < this.level) {
                errMsg = '权限不足'
                throw new global.errs.Forbbiden(errMsg)
            }
            // 将jwt中存的字段存储到ctx上，便于以后使用
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next()
        }
    }
}

module.exports = {
    Auth
}