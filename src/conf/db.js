const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

// if (env === "dev") {
    // mysql
    MYSQL_CONF = {
        host: '127.0.0.2',
        user: "root",
        password: '123456',
        port:'3307',
        database: "cloudShopping"    //数据库名称
    }

    // REDIS
    REDIS_CONF = {
        port:6379,
        host:'127.0.0.1'
    }
// }
// if(env === "production") {
//     MYSQL_CONF = {
//         host: "localhost",
//         user: "root",
//         password: 'tangyi123',
//         port:'3306',
//         database: "ym_blog"    //数据库名称
//     }

//     // REDIS
//     REDIS_CONF = {
//         port:6379,
//         host:'127.0.0.1'
//     }
// }

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}