const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

class User extends Model {
    // 登录时验证
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: { email }
        })
        if (!user) {
            throw new global.errs.AuthFailed('账户不存在')
        }
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }

    static async getUserByOpenid(openid) {
        return await User.findOne({
            where: { openid }
        })
    }

    static async registerByOpenid(openid) {
        return await User.create({
            where: { openid }
        })
    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,            // 字符串
        primaryKey: true,                   // 主键
        autoIncrement: true                 // 自增
    },
    nikename: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        // module的属性操作，当往数据库中存储password字段时触发
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),         // 长度64
        unique: true
    }
}, {
    sequelize,
    tableName: 'user',                       // 默认创建Users表，使用tableName创建一个user表，手动删除Users
})

module.exports = {
    User
}