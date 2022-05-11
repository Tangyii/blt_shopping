
import { uploadPic } from '../../../api/user-api.js'

import { getGoodsListForPage, insertGoods, updateGoods, findGoodsById, deleteGoodsById, setGoodsIsOnSale } from '../../../api/goods-api.js'
import { getGoodsTypeList } from '../../../api/goods-type-api.js'
export default {
	namespaced: true,

	state: {
		list: [],
		page: {
			pno: 1,
			psize: 10,
			pCount: 0,
			totalElements: 0
		},
		goodsTypeList: []
	},
	mutations: {
		setList(state, list) {
			state.list = list;
		},
		setPage(state, page) {
			state.page = page
		},
		setGoodsTypeList(state, goodsTypeList) {
			state.goodsTypeList = goodsTypeList
		}
	},
	getters: {
		getList(state, getter) {
			return state.list
		}
	},

	actions: {
		async getListForPage({ commit }, queryForm) {
			let res = await getGoodsListForPage(queryForm);
			if (res.data.code == 200) {
				commit('setList', res.data.data.listData)
				commit('setPage', res.data.data.page)
			}
		},
		async deleteById({ }, id) {
			await deleteGoodsById(id)
		},
		async getGoodsTypeListAll({ commit }) {
			let res = await getGoodsTypeList()
			if (res.data.code == 200) {
				commit('setGoodsTypeList', res.data.data)
			}
		},
		async insert({ }, addForm) {
			await insertGoods(addForm)
		},
		async findById({ }, id) {
			let res = await findGoodsById(id)
			if (res.data.code == 200) {
				return res.data.data[0]
			} else {
				return {}
			}
		},
		async update({ }, addForm) {
			await updateGoods(addForm)
		},
		async setIsOnSale({ }, params) {
			await setGoodsIsOnSale(params)
		},
		async uploadPic({ }, file) {
			await uploadPic(file)
		},

	}
}