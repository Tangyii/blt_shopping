const {
    getShopsForPage,
    deleteShops,
    insertShops,
    updateShops,
    findShopsById,
    isOnsale } = require('../../controller/shop-list')
const { SuccessModel, ErrorModel } = require('../../model/resModel')

// 登录验证函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}

const handleShopsRouter = (req, res) => {
    const method = req.method
    const id = req.query.id
    
    // 分页获取商品列表
    if (method === 'GET' && req.path === '/api/shops/getShopsForPage') {

        // 登录验证
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }

        const result = getShopsForPage(req.query.pno, req.query.psize)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 删除商品
    if (method === 'DELETE' && req.path === '/api/shops/delete') {

        // 登录验证
        if (loginCheck(req)) {
            return loginCheckResult
        }

        const result = deleteShops(id)
        return result.then(val => {
            // console.log(val)
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除 失败')
            }
        })
    }

    // 新增商品
    if (method === 'POST' && req.path === '/api/shops/insert') {
        // 登录验证
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }
        const result = insertShops(req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新失败')
            }
        })
    }


    // 更新商品
    if (method === 'POST' && req.path === '/api/shops/update') {
        // 登录验证
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }

        const result = updateShops(req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新失败')
            }
        })
    }

    // 商品上下架
    if (method === 'POST' && req.path === '/api/shops/isOnsale') {
        // 登录验证
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return loginCheckResult
        }

        const result = isOnsale(id,req.query.isOnsale)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('上下架修改失败')
            }
        })
    }

}

module.exports = handleShopsRouter