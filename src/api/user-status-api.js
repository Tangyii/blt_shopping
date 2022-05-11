import api from '../http'

export const getUserStatusList = () => {
	return api.http({
		url:'/user-status/list/all',
		method:'get'
	})
}

export const getUserStatusListForPage = (queryForm) => {
	return api.http({
		url:'/user-status/list/page',
		method:'get',
		params:queryForm
	})
}

export const insertUserStatus = (addForm) => {
	return api.http({
		url:'/user-status/insert',
		method:'put',
		data:addForm
	})
}

export const findUserStatusById = (id) => {
	return api.http({
		url:`/user-status/find/id/${id}`,
		method:'get',
		data:id
	})
}

export const updateUserStatus = (addForm) => {
	return api.http({
		url:`/user-status/update`,
		method:'put',
		data:addForm
	})
}

export const deleteUserStatusById = (id) => {
	return api.http({
		url:`/user-status/delete/id/${id}`,
		method:'delete',
	})
}


