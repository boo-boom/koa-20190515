const Router = require('koa-router')
const { User } = require('../../models/user')
const { RegisterValidator } = require('../../validators/validator')
const { success } = require('../../lib/helper')
const router = new Router({
    prefix: '/v1/user'
})

router.post('/register', async(ctx) => {
    const v = await new RegisterValidator().validate(ctx)
    const query = v.get('body')
    const user = {
        email: query.email,
        password: query.password2,
        nikename: query.nikename
    }
    User.create(user)
    success()
})

module.exports = router