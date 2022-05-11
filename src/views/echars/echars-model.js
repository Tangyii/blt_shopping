import { getGoodsTypeList, } from '../../api/goods-type-api'
import { getOrdersWeekDay, getTopFiveShop, getDigitalData, getAllOrders, getYesterdayOrders, getTodayOrders, getDigitalData2 } from '../../api/order-api'

export default {
	namespaced: true,
	state: {
		yesterdayOrder: 0,
		todayOrder: 0,
		allOrder: 0,
		digitalData1: [],
		xAxisText1: [],
		chart2Text: [],
		digitalData: [],
		chart3Text: [],
		digitalData2: [],
		tableData1: [],
	},
	getters: {

	},
	mutations: {
		setDigitalData(state, digitalData) {
			state.digitalData = digitalData
		},
		setDigitalData2(state, digitalData2) {
			state.digitalData2 = digitalData2
		},
		setDigitalData1(state, digitalData1) {
			state.digitalData1 = digitalData1
		},
		setXAxisText1(state, xAxisText1) {
			state.xAxisText1 = xAxisText1
		},
		setGoodsTypeList(state, chart2Text) {
			state.chart2Text = chart2Text
		},
		setTableData1(state, tableData1) {
			state.tableData1 = tableData1
		},
		setAllOrder(state, allOrder) {
			state.allOrder = allOrder
		},
		setTodayOrder(state, todayOrder) {
			state.todayOrder = todayOrder
		},
		setYesterdayOrder(state, yesterdayOrder) {
			state.yesterdayOrder = yesterdayOrder
		},

	},
	actions: {
		async getGoodsTypeListAll({ commit }) {
			let res = await getGoodsTypeList()
			if (res.data.code == 200) {
				let arr = []
				res.data.data.forEach((item) => {
					arr.push(item.name)
				})
				commit('setGoodsTypeList', arr)
			}
		},
		async getDigitalData1({ commit }) {
			let res = await getOrdersWeekDay()
			if (res.data.code == 200) {
				let days = []
				let count = []
				res.data.data.forEach((item) => {
					days.push(item.days)
					count.push(parseInt(item.count))
				})
				commit('setXAxisText1', days)
				commit('setDigitalData1', count)
			}
		},
		async getTableData1({ commit }) {
			let res = await getTopFiveShop()
			if (res.data.code == 200) {
				commit('setTableData1', res.data.data)
			}
		},
		async getDigitalData({ commit }) {
			let res = await getDigitalData()
			if (res.data.code == 200) {
				commit('setDigitalData', res.data.data)
			}
		},
		async getDigitalData2({ commit }) {
			let res = await getDigitalData2()
			if (res.data.code == 200) {
				commit('setDigitalData2', res.data.data)
			}
		},
		async getAllOrder({ commit }) {
			let res = await getAllOrders()
			if (res.data.code == 200) {
				commit('setAllOrder', res.data.data)
			}
		},
		async getTodayOrder({ commit }) {
			let res = await getTodayOrders()
			if (res.data.code == 200) {
				if (res.data.data) {
					commit('setTodayOrder', res.data.data)
				} else {
					commit('setTodayOrder', 0)

				}
			}
		},
		async getYesterdayOrder({ commit }) {
			let res = await getYesterdayOrders()
			if (res.data.code == 200) {
				if (res.data.data) {
					commit('setYesterdayOrder', res.data.data)
				} else {
					commit('setYesterdayOrder', 0)
				}
			}
		},
	}
}