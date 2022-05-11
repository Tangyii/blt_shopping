import api from '../http'

export const getCardTypeList = (queryForm) => {
	return api.http({
		url:'/card-type/list/all',
		method:'get',
		params:queryForm
	})
}

export const getCardTypeListForPage = (queryForm) => {
	return api.http({
		url:'/card-type/list/page',
		method:'get',
		params:queryForm
	})
}

export const insertCardType = (addForm) => {
	return api.http({
		url:'/card-type/insert',
		method:'put',
		data:addForm
	})
}

export const findCardTypeById = (id) => {
	return api.http({
		url:`/card-type/find/id/${id}`,
		method:'get',
		data:id
	})
}

export const updateCardType = (addForm) => {
	return api.http({
		url:`/card-type/update`,
		method:'put',
		data:addForm
	})
}

export const deleteCardTypeById = (id) => {
	return api.http({
		url:`/card-type/delete/id/${id}`,
		method:'delete',
	})
}



