import api from '../http'

export const getNewsTypeList = () => {
	return api.http({
		url:'/news-type/list/all',
		method:'get'
	})
}

export const getNewsTypeListForPage = (queryForm) => {
	return api.http({
		url:'/news-type/list/page',
		method:'get',
		params:queryForm
	})
}

export const insertNewsType = (addForm) => {
	return api.http({
		url:'/news-type/insert',
		method:'put',
		data:addForm
	})
}

export const findNewsTypeById = (id) => {
	return api.http({
		url:`/news-type/find/id/${id}`,
		method:'get',
		data:id
	})
}

export const updateNewsType = (addForm) => {
	return api.http({
		url:`/news-type/update`,
		method:'put',
		data:addForm
	})
}

export const deleteNewsTypeById = (id) => {
	return api.http({
		url:`/news-type/delete/id/${id}`,
		method:'delete',
	})
}


