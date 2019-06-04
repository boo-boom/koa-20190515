const util = require('util')
const axios = require('axios')
const { User } = require('../models/user')
const { Auth } = require('../../middleware/auth')
const { generateToken } = require('../../core/util')

class WXManager {
    static async codeToToken(code) {
        const { loginUrl, appId, appSecret } = global.config.wx
        const url = util.format(loginUrl, appId, appSecret, code)
        const result = await axios.get(url)
        if(result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        if(errcode !== 0) {
            throw new global.errs.AuthFailed('openid获取失败:' + errcode)
        }

        let user = await User.getUserByOpenid(result.data.openid)
        if(!user) {
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id, Auth)
    }
}

module.exports = {
    WXManager
}