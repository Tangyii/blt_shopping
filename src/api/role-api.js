import api from '../http'
// 获取所有角色列表
export const getAllRoleList = () => {
	return api.http({
		url: '/roles/list/all',
		method: 'get'
	})
}

export const findRoleListForPage = (params) => {
	return api.http({
		url: `/roles/list/page`,
		method: 'get',
		params
	})
}

export const deleteRoleById = (id) => {
	return api.http({
		url: `/roles/delete`,
		params: {
			id: id
		},
		method: 'delete',
	})
}

export const insertRole = (roles) => {
	return api.http({
		url: `/roles/insert`,
		method: 'put',
		data: roles
	})
}

export const updateRole = (roles) => {
	return api.http({
		url: `/roles/update`,
		method: 'put',
		data: roles
	})
}

export const findRoleById = (id) => {
	return api.http({
		url: `/roles/find/id`,
		params: {
			id: id
		},
		method: 'get',
	})
}