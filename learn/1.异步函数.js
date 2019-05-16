const Koa = require('koa')
const app = new Koa()

// 中间件
app.use(async (ctx, next) => {
    // const a = next()
    // a : Promise { 'hello koa' }

    // await ：求值关键字
    // await后面可以是Promise / 表达式
    // await会阻断代码执行
    // 保证所有中间件为洋葱模型规则，添加async, await next()
    const a = await next()
    // a : 'hello koa'
    console.log(a)
})

app.use(async (ctx, next) => {
    // return出去的值将会以参数传给上一个中间件next()中
    return 'hello koa'
})

app.listen(3002)