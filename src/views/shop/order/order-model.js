import { getOrderListForPage,findOrderById,deleteOrderById,sendPostCode} from '../../../api/order-api.js'
export default{
	namespaced:true,
	state:{
		list:[],
		page:{
			pno:1,
			psize:10,
			pCount:0,
			totalElements:0
		},
	},
	mutations:{
		setList(state,list){
			state.list = list;
		},
		setPage(state,page){
			state.page = page
		},
	},
	getters:{
		getList(state,getter){
			return state.list
		}
	},
	
	actions:{
		async getListForPage({commit},queryForm){
			let res = await getOrderListForPage(queryForm);
			if(res.data.code == 200){
				commit('setList',res.data.data.listData)
				commit('setPage',res.data.data.page)
			}
		},
		// 根据id删除数据的业务函数
		async deleteById({},id){
			await deleteOrderById(id)
		},
		async findById({},id){
			let res = await findOrderById(id)
			if(res.data.code == 200){
				return res.data.data[0]
			}else{
				return {}
			}
		},
		async send({},params){
			await sendPostCode(params)
		}
	}
}