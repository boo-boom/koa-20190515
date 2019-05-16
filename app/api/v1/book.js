const Router = require('koa-router')
const router = new Router()
const { HttpException, ParameterException } = require('./../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')

router.get('/v1/:id/book', async(ctx, next) => {
    // throw new Error('error')
    const params = ctx.params                       // :id  动态路由参数
    const body = ctx.request.body                   // 使用body传的参数
    const query = ctx.request.query                 // 使用?传的参数
    const header = ctx.request.header               // header
    // console.log(params, body, query, header)
    
    // 参数验证
    await new PositiveIntegerValidator().validate(ctx)
    // 获取参数
    // console.log(v.get('path.id'))
    
    // 异常处理
    if(JSON.stringify(query) === '{}') {
        const error = new ParameterException()
        throw error
    } else {
        ctx.body = {
            key: 'book'
        }
    }
})

module.exports = router;