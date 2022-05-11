import api from '../http'
import QS from 'qs'
export const getLocation = (params) => {
	return api.http.jsonp(
		'https://apis.map.qq.com/ws/location/v1/ip?'+QS.stringify(params)
	)
}
export const getPOI = (params) => {
	return api.http.jsonp(
		'https://apis.map.qq.com/ws/geocoder/v1/?'+QS.stringify(params)
	)
}

export const getCheckOutPosition = () => {
	return api.http({
		url:'/check-out/get/position',
		method:'get'
	}).catch(err => err)
}
export const updateCheckOutPostion = (data) => {
	return api.http({
			url:'/check-out/update/position',
			method:'put',
			data
	}).catch(err => err)
	
}