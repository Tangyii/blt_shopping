import api from '../http'

export const getOrderListForPage = (queryForm) => {
	return api.http({
		url:'/order/list/page',
		method:'get',
		params:queryForm
	})
}


export const findOrderById = (id) => {
	return api.http({
		url:`/order/find/id`,
		method:'get',
		params:{
			id:id
		}
	})
}


export const deleteOrderById = (id) => {
	return api.http({
		url:`/order/delete/id`,
		method:'delete',
		params:{
			id:id
		}
	})
}

export const sendPostCode = (params) => {
	return api.http({
		url:`/order/send`,
		method:'get',
		params
	})
}

export const getOrdersWeekDay = () => {
	return api.http({
		url:`/order/weekday`,
		method:'get',
	})
}
export const getTopFiveShop = () => {
	return api.http({
		url:`/order/topfive`,
		method:'get',
	})
}
export const getDigitalData = () => {
	return api.http({
		url:`/order/digitaldata`,
		method:'get',
	})
}
export const getDigitalData2 = () => {
	return api.http({
		url:`/order/digitaldata2`,
		method:'get',
	})
}
export const getAllOrders = () => {
	return api.http({
		url:`/order/all`,
		method:'get',
	})
}
export const getYesterdayOrders = () => {
	return api.http({
		url:`/order/yesterday`,
		method:'get',
	})
}
export const getTodayOrders = () => {
	return api.http({
		url:`/order/today`,
		method:'get',
	})
}
