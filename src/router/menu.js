const { getMenuList } = require('../controller/menu')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleMenuRouter = (req, res) => {
    const method = req.method
    // 登录
    if (method === 'POST' && req.path === '/api/user/menu') {

        const result = getMenuList(req.body.roleId)
        return result.then(data => {
            if (data) {
                return new SuccessModel(data)
            }
            return new ErrorModel('菜单列表获取失败')
        })
    }
    
}

module.exports = handleMenuRouter