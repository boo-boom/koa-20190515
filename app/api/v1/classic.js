const Router = require('koa-router')
const { Auth } = require('../../../middleware/auth')
const router = new Router({
    prefix: '/v1/classic'
})

// 传入<= 的权限数字，以控制接口访问权限
router.get('/', new Auth(9).m, async(ctx, next) => {
    ctx.body = {
        uid: ctx.auth.uid
    }
})

module.exports = router;