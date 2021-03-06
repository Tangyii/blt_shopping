import { 
	getGoodsTypeListForPage,
	deleteGoodsTypeById,
	insertGoodsType,
	findGoodsTypeById,
	updateGoodsType
} from '../../../api/goods-type-api.js'

export default{
	// 开启命名空间模式，开启之后mapState等方法才能通过模块名称自动映射数据
	namespaced:true,
	state:{
		list:[],//接口查回的table的数据
		page:{//接口返回的分页信息
			pno:1,
			psize:10,
			pCount:0,
			totalElements:0
		},
		userTypeList:[]
	},
	mutations:{
		// 设置state中的list数据
		setList(state,list){
			state.list = list;
		},
		// 设置state中的page数据
		setPage(state,page){
			state.page = page
		}
	},
	// getters相当于vuex中的computed，他可以直接访问state中的对象也可以通过getter
	getters:{
		getList(state,getter){
			return state.list
		}
	},
	actions:{
		async getListForPage({commit},data){
			let res = await getGoodsTypeListForPage(data);
			if(res.data.code == 200){
				commit('setList',res.data.data.listData)
				commit('setPage',res.data.data.page)
			}
		},
		// 根据id删除数据的业务函数
		async deleteById({dispatch},id){
			await deleteGoodsTypeById(id);
		},
		async getUserTypeListAll({commit}){
			let res = await getUserTypeList();
			if(res.data.code == 200){
				commit('setUserTypeList',res.data.data.list)
			}
		},
		async insert({},addForm){
			await insertGoodsType(addForm)
		},
		async findById({},id){
			let res = await findGoodsTypeById(id)
			if(res.data.code == 200 ){
				return res.data.data
			}
		},
		async update({},addForm){
			await updateGoodsType(addForm)
		}
	},
	
}