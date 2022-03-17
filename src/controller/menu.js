const { exec,escape } = require('../db/mysql')

const getMenuList = (roleId) => {

    const sql = `select menulist from menu 
    where roleId=${roleId}`

    return exec(sql).then(rows => {
        return rows[0]||{}
    })
}

module.exports = {
    getMenuList
}