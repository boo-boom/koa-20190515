const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const router = new Router({
    prefix: '/v1'
})

router.post('/token', async(ctx) => {
    const v = await new TokenValidator().validate(ctx)
    console.log(v.get('body'))
})

module.exports = router