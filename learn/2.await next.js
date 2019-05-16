const Koa = require('koa')
const axios = require('axios')
const app = new Koa()

// app.use((ctx, next) => {
//     console.log(1)
//     next()
//     console.log(2)
// })

// app.use(async (ctx, next) => {
//     console.log(3)
//     // await阻断了洋葱模型： 1-3-2-4
//     const res = await axios.get('http://music.hoohmm.com/banner')   
//     next()
//     console.log(4) 
// })

app.use(async (ctx, next) => {
    console.log(1)
    await next()
    /**
     * 接收中间件在ctx上的参数，必须在next之后才能确保数据可以取到
     */
    console.log(2, ctx.r)
})

app.use(async (ctx, next) => {
    console.log(3)
    const res = await axios.get('http://music.hoohmm.com/banner')
    /**
     * 保证洋葱模型
     * 中间件之间的传参：
     *   1. 直接使用return返回，上一个中间件可接收（只有中间件都为自己控制时，否则无法控制）
     *   2. 使用ctx[上下文]传递参数
     */
    ctx.r = res
    // 使用await next()保证洋葱模型
    await next()
    console.log(4) 
})

app.listen(3002)