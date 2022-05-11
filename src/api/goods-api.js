import api from '../http'

export const getGoodsListForPage = (queryForm) => {
	return api.http({
		url: '/shops/list/page',
		method: 'get',
		params: queryForm
	})
}

export const insertGoods = (addForm) => {
	return api.http({
		url: '/shops/insert',
		method: 'put',
		data: addForm
	})
}

export const findGoodsById = (id) => {
	return api.http({
		url: `/shops/find/id`,
		method: 'get',
		params: {
			id: id
		}
	})
}

export const updateGoods = (addForm) => {
	return api.http({
		url: `/shops/update`,
		method: 'put',
		data: addForm
	})
}

export const deleteGoodsById = (id) => {
	return api.http({
		url: `/shops/delete/id`,
		method: 'delete',
		params: {
			id: id
		}
	})
}

export const setGoodsIsOnSale = (params) => {
	return api.http({
		url: `/shops/set/onsale`,
		method: 'get',
		params: params
	})
}