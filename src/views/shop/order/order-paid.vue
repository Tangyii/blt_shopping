<template>
	<div class="page">
		<p-page-header title="订单管理"></p-page-header>
		<el-form inline :model="queryForm">
			<el-form-item size="mini" label="购买人手机">
				<el-input placeholder="请输入" clearable v-model="queryForm.phone"></el-input>
			</el-form-item>
			<el-form-item size="mini">
				<el-button type="primary" :loading="queryLoading" @click="handleClick" icon="el-icon-search">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table
			border
			size="mini"
			:data="list">
			<el-table-column label="订单编号" prop="id"></el-table-column>
			<el-table-column label="购买人手机" prop="phone"></el-table-column>
			<el-table-column label="商品名称" prop="name"></el-table-column>
			<el-table-column label="订单金额" prop="totalPrice"></el-table-column>
			<el-table-column label="订单状态" prop="price">
				<template v-slot="{row}"> 
					<el-tag v-if="row.status==1">已支付</el-tag>
					<el-tag v-else-if="row.status==2" type="warning">已发货</el-tag>
					<el-tag v-else-if="row.status==3" type="success">确认收货</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="物流单号" prop="postCode"></el-table-column>
			<el-table-column label="订单时间" prop="postCode">
				<template v-slot="{row}">
					{{formatTime(row.insertTime)}}
				</template>
			</el-table-column>
			
			<el-table-column width="300px" label="操作" >
				<template v-slot="{row}">
					<el-button size="mini" icon="el-icon-search" @click="handlePreview(row.id)" type="primary">详情</el-button>
					<el-button size="mini" icon="el-icon-remove" @click="handleRemove(row.id)" type="danger">删除</el-button>
					
					<el-button size="mini" v-if="row.status==1" icon="el-icon-edit" @click="handleSend(row.id)" type="warning">发货</el-button>
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
		name:'order-paid',
		data(){
			return {
				// 调用查询接口需要的参数
				queryForm:{
					phone:'',
					status:1,
					pno:1,
					psize:10
				},
				// 查询按钮的加载动画开关
				queryLoading:false,
			}
		},
		computed:{
			...mapState('orderModel',['list','page']),
			// 格式化日期的计算属性
			formatTime(){
				return function(time){
					let d = new Date(time);
					return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
				}
			}
		},
		// 当第一次打开页面时会执行created生命周期
		async created(){
			await this.getListForPage(this.queryForm)
		},
		// 由于本页通过keep-alive进行了缓存，缓存后原有的生命周期不执行，所以通过activated来识别何时进入本页
		async activated(){
			await this.getListForPage(this.queryForm)
		},
		methods:{
			...mapActions('orderModel',['getListForPage','deleteById','send']),
			// 点击查询按钮触发的⌚️
			async handleClick(){
				this.queryLoading = true;
				this.queryForm.pno = 1;
				await this.getListForPage(this.queryForm)
				this.queryLoading = false;
			},
			// 点击分页组件的每页多少条切换时会触发这个回调，参数就是切换的条数
			async handleSizeChange(psize){
				this.queryForm.psize = psize
				this.queryForm.pno = 1;
				await this.getListForPage(this.queryForm)
			},
			async handleCurrentChange(pno){
				this.queryForm.pno = pno
				await this.getListForPage(this.queryForm)
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
			handlePreview(id){
				this.$router.push({path:'/order-preview',query:{id}})
			},
			async handleSend(id){
				let {value} = await this.$prompt('请输入物流编号', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPlaceholder:'请填写物流单号',
					inputValidator(value){
						console.log(value)
						if(!value){
							return '不可以为空'
						}
					}
				}).catch(()=>{value:''})
				await this.send({id,postCode:value})
				await this.getListForPage(this.queryForm)
			}
		}
	}
</script>

<style>
</style>
