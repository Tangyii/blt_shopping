import api from '../http'
// 初步定义login函数，通过api中的http功能将登录实现
export const login = (username, password) => {
	return api.http({
		url: '/users/login',
		method: 'post',
		data: {username,password},
		headers: {
			'Content-Type': 'application/json'
		},

	})
}
// 获取用户列表接口参数为接口的参数
export const getUserList = (data) => {
	return api.http({
		url: '/users/list/page',
		params: {
			pno: data.pno,
			psize: data.psize,
			username: data.username
		},
		method: 'get'
	})
}
// 获取用户列表接口参数为接口的参数
export const getUserListAll = (data) => {
	return api.http({
		url: '/user/list/all',
		params: {
			pno: data.pno,
			psize: data.psize,
			username: data.username
		},
		method: 'get'
	})
}
//根据id删除用户
export const removeUserById = (id) => {
	return api.http({
		url: `/users/delete`,
		params: {
			id:id
		},
		method: 'delete'
	})
}
//新增用户
export const addUser = (user) => {
	return api.http({
		url: `/users/insert`,
		method: 'put',
		data: user
	})
}
//根据id获取用户数据
export const findUserById = (id) => {
	return api.http({
		url: `/users/find/id`,
		params: {
			id:id
		},
		method: 'get',
	})
}

export const updateUser = (user) => {
	return api.http({
		url: `/users/update`,
		method: 'put',
		data: user
	})
}
export const uploadPic = (file) => {
	return api.http({
		url: `/file/uploadpic`,
		method: 'post',
		data: file
	})
}