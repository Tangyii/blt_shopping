<template>
	<div class="page">
		<p-page-header title="商品类型管理"></p-page-header>
		<el-form inline :model="queryForm">
			<el-form-item size="mini" label="名称">
				<el-input placeholder="请输入" clearable v-model="queryForm.name"></el-input>
			</el-form-item>
			<el-form-item size="mini">
				<el-button type="primary" :loading="queryLoading" @click="handleClick" icon="el-icon-search">查询</el-button>
			</el-form-item>
			<el-form-item size="mini">
			    <el-button type="success" @click="handleAdd" icon="el-icon-plus">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table
			border
			size="mini"
			:data="list">
			<el-table-column label="名称" prop="name"></el-table-column>
			<el-table-column label="备注" prop="remark"></el-table-column>
			<el-table-column width="300px" label="操作" >
				<template v-slot="{row}">
					<el-button size="mini" v-if="row.freeze==0" @click="handleSetFreeze(row)" plain  type="danger">冻结</el-button>
					<el-button size="mini" v-if="row.freeze==1" @click="handleSetFreeze(row)" plain type="success">解冻</el-button>
					<el-button size="mini" icon="el-icon-edit" @click="handleEdit(row.id)" type="warning">修改</el-button>
					<el-button size="mini" @click="handleRemove(row.id)" icon="el-icon-remove" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page.pno"
			:page-size="page.psize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="page.totalElements">
		</el-pagination>
	</div>
</template>

<script>
	// 引入vuex的state和actions的映射对象用来映射store中定义的state和actions
	import { mapState,mapActions } from 'vuex'
	export default{
		// 定义了组件的名称，用来结合keep-alive缓存页面
		name:'card-type',
		data(){
			return {
				// 调用查询接口需要的参数
				queryForm:{
					name:"",
					pno:1,
					psize:10
				},
				dateArr:[],
				// 查询按钮的加载动画开关
				queryLoading:false
			}
		},
		computed:{
			...mapState('goodsTypeModel',['list','page']),
			formatTime(){
				return function(time){
					let d = new Date(Number(time));
					return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
				}
			}
		},
		async created(){
			await this.getListForPage(this.queryForm)
		},
		async activated(){
			await this.getListForPage(this.queryForm)
		},
		methods:{
			...mapActions('goodsTypeModel',['getListForPage','deleteById','setFreeze']),
			handleDateChange(res){
				if(res!=null){
					this.queryForm.beginTime = res[0]
					this.queryForm.endTime = res[1]
				}else{
					this.queryForm.beginTime = ''
					this.queryForm.endTime = ''
				}
			},
			async handleClick(){
				this.queryLoading = true;
				this.queryForm.pno = 1;
				await this.getListForPage(this.queryForm)
				this.queryLoading = false;
			},
			async handleSizeChange(psize){
				this.queryForm.psize = psize
				this.queryForm.pno = 1;
				await this.getListForPage(this.queryForm)
			},
			async handleCurrentChange(pno){
				this.queryForm.pno = pno
				await this.getListForPage(this.queryForm)
			},
			handleAdd(){
				this.$router.push('/goods-type-add')
			},
			async handleRemove(id){
				let confirm =await  this.$confirm('正在删除','提示',{
					type:'warning'
				}).catch(err => err)
				if(confirm == 'confirm'){
					await this.deleteById(id)
					await this.getListForPage(this.queryForm)
				}
			},
			handleEdit(id){
				this.$router.push({path:'/goods-type-edit',query:{id}})
			},
			async handleSetFreeze(row){
				let message
				let freeze
				
				if(row.freeze == 1){
					message = '正在解冻当前会员，点击确认继续'
					freeze = 0
				}else{
					message = '正在冻结当前会员，点击确认继续'
					freeze = 1
				}
				let confirm = await this.$confirm(message,"提示",{type:'warning'}).catch(err=>err)
				if(confirm == 'confirm'){
					await this.setFreeze({
						id:row.id,
						freeze:freeze
					})
					await this.getListForPage(this.queryForm)
				}
			}
		}
	}
</script>

<style>
</style>
