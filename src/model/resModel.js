class BaseModel {
    constructor(data,token,userInfo){
        // if(typeof data === 'string'){
        //     this.message = data
        //     data = null
        //     message = null
        // }
        if(data) {
            this.data = data
        }
        if(token) {
            this.token = token
        }
        if(userInfo) {
            this.userInfo = userInfo
        }
    }
}
class SuccessModel extends BaseModel {
    constructor(data,token,userInfo,session) {
        super(data,token,userInfo)
        this.code = 200
        this.errno = 0
    }
}

class ErrorModel extends BaseModel {
    constructor(token,userInfo) {
        super(token,userInfo)
        this.code = 400
        this.errmo = -1
    }
}

module.exports = {
    SuccessModel,ErrorModel
}