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
    }
}