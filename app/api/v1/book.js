const Router = require('koa-router')
const router = new Router()
const { PositiveIntegerValidator } = require('../../validators/validator')

router.get('/v1/book', async(ctx, next) => {
    // const params = ctx.params                       // :id  动态路由参数
    // const query = ctx.request.query                 // 使用?传的参数
    // const header = ctx.request.header               // header
    // const body = ctx.request.body                   // 使用body传的参数
    
    // 参数验证
    await new PositiveIntegerValidator().validate(ctx)
    // 获取参数
    // console.log(v.get('body.id'))

    ctx.body = {
        key: 'book'
    }
})

module.exports = router;