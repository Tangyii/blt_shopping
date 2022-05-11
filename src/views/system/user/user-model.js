
import { getUserList,removeUserById,addUser,findUserById,updateUser,getUserListAll,uploadPic} from '../../../api/user-api.js'
import { getAllRoleList } from '../../../api/role-api.js'
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
		roleList:[]
	},
	mutations:{
		setList(state,list){
			state.list = list;
		},
		setPage(state,page){
			state.page = page
		},
		setRoleList(state,roleList){
			state.roleList = roleList
		}
	},
	getters:{
		getList(state,getter){
			return state.list
		}
	},
	actions:{
		async getListAll({commit},data){
			let res = await getUserListAll(data);
			if(res.data.code == 200){
				let list = res.data.data.list.map((item,index) => {
					item.index = index+1
					return item
				})
					
				let page = {
					pno:1,
					psize:10,
					totalElements:list.length
				}
				commit('setList',list)
				commit('setPage',page)
			}
		},
		async getListForPage({commit},data){
			let res = await getUserList(data);
			if(res.data.code == 200){
				commit('setList',res.data.data.listData)
				commit('setPage',res.data.data.page)
			}
		},
		async deleteById({dispatch},id){
			await removeUserById(id);
		},
		async getRoleListAll({commit}){
			let res = await getAllRoleList();
			if(res.data.code == 200){
				commit('setRoleList',res.data.data)
			}
		},
		async insert({},user){
			await addUser(user)
		},
		async uploadPic({},file){
			await uploadPic(file)
		},
		async findById({},id){
			let res = await findUserById(id)
			if(res.data.code == 200){
				return res.data.data
			}
		},
		async update({},user){
			await updateUser(user)
		},
		
		
	}
}