import api from '../http'
export const getDeptList = () => {
	return api.http({
		url:'/dept/list/all',
		method:'get'
	})
}


export const getDeptListForPage = (queryForm) => {
	return api.http({
		url:'/dept/list/page',
		method:'get',
		params:queryForm
	})
}

export const insertDept = (addForm) => {
	return api.http({
		url:'/dept/insert',
		method:'put',
		data:addForm
	})
}

export const findDeptById = (id) => {
	return api.http({
		url:`/dept/find/id/${id}`,
		method:'get',
		data:id
	})
}

export const updateDept = (addForm) => {
	return api.http({
		url:`/dept/update`,
		method:'put',
		data:addForm
	})
}

export const deleteDeptById = (id) => {
	return api.http({
		url:`/dept/delete/id/${id}`,
		method:'delete',
	})
}

export const getDeptListUser = () => {
	return api.http({
		url:'/dept/list/user',
		method:'get'
	})
}
export const addDeptUser = (params) => {
	return api.http({
		url:'/dept/add/user',
		method:'put',
		params
	})
}

export const deleteDeptUserById = (id) => {
	return api.http({
		url:'/dept/delete/user',
		method:'delete',
		params:{id}
	})
}