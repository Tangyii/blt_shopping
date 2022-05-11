<template>
	<div>
		<el-page-header @back="handleBack" content="预览订单详情"></el-page-header>
		<el-row>
			<el-col :span="24">
				<el-form 
					:model="addForm" 
					label-width="auto" 
					ref="addForm" 
					:rules="rules">
					<el-form-item size="mini" prop="name" label="订单编号">
						{{addForm.orderNo}}
					</el-form-item>
					<el-form-item size="mini" prop="price" label="商品原价">
						{{addForm.singlePriceOld}}
					</el-form-item>
					<el-form-item size="mini" prop="price" label="商品售价">
						{{addForm.singlePrice}}
					</el-form-item>
					<el-form-item size="mini" prop="price" label="购买数量">
						{{addForm.num}}
					</el-form-item>
					<el-form-item size="mini" prop="price" label="订单金额">
						{{addForm.totalPrice}}
					</el-form-item>
					<el-form-item size="mini" prop="price" label="购买人">
						{{addForm.nickname}}
					</el-form-item>
					<el-form-item size="mini" prop="price" label="购买人电话">
						{{addForm.phone}}
					</el-form-item>
					<el-form-item size="mini" prop="price" label="订单状态">
						<el-tag v-if="addForm.status==1">已支付</el-tag>
						<el-tag v-else-if="addForm.status==2" type="warning">已发货</el-tag>
						<el-tag v-else-if="addForm.status==3" type="success">确认收货</el-tag>
					</el-form-item>
					<el-form-item size="mini" prop="price" label="订单时间">
						{{formatTime(addForm.insertTime)}}
					</el-form-item>
					<el-form-item size="mini" prop="price" label="物流编号">
						{{addForm.postCode}}
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapActions,mapState } from 'vuex';
	export default{
		name:'goods-add',
		data(){
			let _this = this;
			return {
				addForm:{},
				subLoading:false
			}
		},
		async created(){
			let id = this.$route.query.id
			this.addForm = await this.findById(id)
		},
		computed:{
			formatTime(){
				return function(time){
					time = time.replace('T',' ').replace('Z',' ').split('.')[0]
					return time
				}
			}
		},
		methods:{
			...mapActions('orderModel',['findById']),
			handleBack(){
				this.$router.history.go(-1)
			},
		}
	}
</script>

<style scoped="scoped" lang="scss">
</style>
