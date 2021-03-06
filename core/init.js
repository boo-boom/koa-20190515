const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
    static initCore(app) {
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.loadConfig()
        InitManager.loadHttpException()
    }

    static loadConfig() {
        const configPath = `${process.cwd()}/config/config.js`
        const config = require(configPath)
        global.config = config
    }

    static initLoadRouters() {
        // process.cwd()项目根目录
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, {
            visit: (obj) => {
                if(obj instanceof Router) {
                    InitManager.app.use(obj.routes())
                }
            }  
        })
    }

    static loadHttpException() {
        const errs = require('./http-exception')
        global.errs = errs
    }
}

module.exports = InitManager