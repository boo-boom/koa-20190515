module.exports = {
    environment: 'dev',
    database: {
        dbName: 'xcx-server',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456'
    },
    security: {
        secretKey: "abcdefg",
        expiresIn: 60 * 60,             // jwk过期时间1小时
    },
    wx: {
        appId: '',
        appSecret: '',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}
