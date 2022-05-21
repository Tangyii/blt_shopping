import api from '../http'

export const getGoodsTypeList = () => {
	return api.http({
		url:'/shops/type/all',
		method:'get'
	})
}


export const getGoodsTypeListForPage = (queryForm) => {
	return api.http({
		url:'/shops/type',
		method:'get',
		params:queryForm
	})
}

export const insertGoodsType = (addForm) => {
	return api.http({
		url:'/shops/insert/type',
		method:'put',
		data:addForm
	})
}

export const findGoodsTypeById = (id) => {
	return api.http({
		url:`/shops/find/id/${id}`,
		method:'get',
		data:id
	})
}

export const updateGoodsType = (addForm) => {
	return api.http({
		url:`/shops/update`,
		method:'put',
		data:addForm
	})
}

export const deleteGoodsTypeById = (id) => {
	return api.http({
		url:`/shops/delete/type?id=${id}`,
		method:'delete',
	})
}


