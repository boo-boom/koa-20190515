const Sequelize = require('sequelize')
const { dbName, host, port, user, password } = require('../config/config').database
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: false,
    timezone: '+08:00',
    define: {
        timestamps: true,           // create_time update_time 
        paranoid: true,             // delete_time
        createdAt: 'created_at',    // 自动添加的字段重命名
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,          // 字段名驼峰命名转换成_连接
    }
})

sequelize.sync({
    force: false            // 删除并重新创建表
})

module.exports = {
    sequelize
}