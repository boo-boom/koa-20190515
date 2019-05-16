const Koa = require('koa')
const parser = require('koa-bodyparser')
const app = new Koa()
const InitManager = require('./core/init')
const catchError = require('./middleware/exception')

app.use(catchError)
app.use(parser())

InitManager.initCore(app)

app.listen(3002)