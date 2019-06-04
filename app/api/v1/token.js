const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middleware/auth')
const router = new Router({
    prefix: '/v1'
})

router.post('/token', async(ctx) => {
    let token;
    const v = await new TokenValidator().validate(ctx)
    const { type, account, secret } = v.get('body')
    switch(type) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(account, secret)
            break;
        case LoginType.USER_MINI_PROGRAM:
            break;
        default:
            throw new global.errs.ParameterException('没有该登录类型')
    }
    ctx.body = { token }
})

async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret)
    return generateToken(user.id, Auth.USER)
}

module.exports = router