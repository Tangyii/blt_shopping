const { exec, escape } = require('../db/mysql')

// 分页获取所有商品
const getShopsForPage = (pno, psize) => {
    const sql = `select * from shops limit ${(pno - 1) * psize},${psize}`
    return exec(sql)
}

// 删除商品
const deleteShops = (id) => {
    id = escape(id)
    const sql = `delete from shops where id=${id}`
    return exec(sql).then(deleteData => {
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}

// 新增商品
const insertShops = (listData = {}) => {
    let { name, price, zheKou, shopsTypeId, count, logo, pics, description, remark } = listData
    name = escape(name)
    description = escape(description)
    remark = escape(remark)
    const sql = `INSERT INTO shops (name, price, zheKou, shopsTypeId, count, logo, pics, description, remark)
    VALUES
    (${name}, ${price}, ${zheKou}, ${shopsTypeId}, ${count}, '${logo}', '${pics}', ${description}, ${remark});
    `
    return exec(sql).then(insertData => {
        if (insertData.affectedRows > 0) {
            return true
        }
        return false
    })
}

// 修改商品
const updateShops = (listData = {}) => {
    let { id, name, price, zheKou, shopsTypeId, count, description, remark } = listData
    name = escape(name)
    description = escape(description)
    remark = escape(remark)
    const sql = `update shops set name=${name}, price=${price}, zheKou=${zheKou}, shopsTypeId=${shopsTypeId}, count=${count}, description=${description}, remark=${remark}
    where id=${id}
    `
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

// 设置上下架
const isOnsale = (id, isOnsale) => {
    isOnsale = escape(isOnsale)
    const sql = `update shops set isOnsale=${isOnsale}
    where id=${id}`

    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}


module.exports = {
    insertShops,
    deleteShops,
    updateShops,
    getShopsForPage,
    isOnsale
}