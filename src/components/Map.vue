<template>
	<div>
		<div style="color: red;font-weight: bold;">
			在考勤范围中输入考勤范围然后点击地图设置考勤位置
		</div>
		<el-form inline size="mini">
			<el-form-item label="国家">
				<el-input readonly v-model="addressInfo.nation"></el-input>
			</el-form-item>
			<el-form-item label="省">
				<el-input readonly v-model="addressInfo.province"></el-input>
			</el-form-item>
			<el-form-item label="市">
				<el-input readonly v-model="addressInfo.city"></el-input>
			</el-form-item>
			<el-form-item label="区">
				<el-input readonly v-model="addressInfo.district"></el-input>
			</el-form-item>
			<el-form-item label="纬度">
				<el-input style="width: 100px;" readonly :value="lat"></el-input>
			</el-form-item>
			<el-form-item label="经度">
				<el-input style="width: 100px;" readonly :value="lng"></el-input>
			</el-form-item>
			<el-form-item label="考勤区范围(km)">
				<el-input type="number" step="0.1" min="0.5" max="3" v-model.number="r"></el-input>
			</el-form-item>
			
		<el-form inline="">
			<el-form-item label="上班时间">
				<el-time-select
					placeholder="起始时间"
					v-model="addressInfo.beginTime"
					:picker-options="{
						start: '08:30',
						step: '00:15',
						end: '18:30'
					}"
					value-format="hhmm"
					>
				</el-time-select>
  
			</el-form-item>
			<el-form-item label="下班时间">
				<el-time-select
					placeholder="结束时间"
					v-model="addressInfo.endTime"
					:picker-options="{
						start: '08:30',
						step: '00:15',
						end: '18:30',
						minTime: addressInfo.beginTime
					}"
					value-format="hhmm">
				</el-time-select>
			</el-form-item>
			<el-form-item>
				<el-button icon="el-icon-upload" @click="handleSubmit" type="primary">设置</el-button>
			</el-form-item>
		</el-form>
		</el-form>
		<div class="map" ref="map">	
		</div>
	</div>
	
</template>

<script>
	import {getLocation,getPOI,getCheckOutPosition,updateCheckOutPostion} from '@/api/check-scope-api.js'
	export default{
		name:'p-map',
		data(){
			return {
				lat:0,
				lng:0,
				addressInfo:{},
				r:1,
				center:{},
				map:{},
				circle:{},
				marker:{}
			}
		},
		async mounted(){
			let res0 = await getCheckOutPosition()
			let res
			if(res0.data.code == 200){
				res = {
					status:0,
					result:{
						ad_info:{
							...res0.data.data
						},
						location:{
							lat:res0.data.data.lat,
							lng:res0.data.data.lng
						}
					}
				}
			}else{
				// 通过jsonp获取当前电脑接入网络的经纬度和地址信息
				res = await getLocation({
					key:'PN2BZ-XWHW2-ZIAU7-CQW7K-LSY4J-WYBOO',
					output:'jsonp'
				})
			}
			
			console.log(res)
			if(res.status == 0){
				this.lat = res.result.location.lat
				this.lng = res.result.location.lng
				this.addressInfo = res.result.ad_info
				this.r = res.result.ad_info.r?res.result.ad_info.r:1
				this.initMap()
			}
		},
		watch:{
			r(v){
				this.drawCircle()
				this.drawMarker()
			}
		},
		methods:{
			initMap(){
				this.center = new TMap.LatLng(this.lat,this.lng)
				//定义map变量，调用 TMap.Map() 构造函数创建地图
				this.map = new TMap.Map(this.$refs.map, {
						center: this.center,//设置地图中心点坐标
						zoom: 12,   //设置地图缩放级别
						pitch: 0,  //设置俯仰角
						rotation: 0    //设置地图旋转角度
				});
				this.drawCircle()
				this.drawMarker()
				this.map.on('click',(e) => {
					console.log(e)
					this.$confirm('正在设置新的考勤地点是否继续','提示',{
						type:'warning'
						
					}).then(res => {
						return getPOI({
							location:e.latLng.lat+','+e.latLng.lng,
							key:'PN2BZ-XWHW2-ZIAU7-CQW7K-LSY4J-WYBOO',
							output:'jsonp'
						})
					}).then(res => {
						console.log(res)
						if(res.status == 0){
							this.lat = e.latLng.lat
							this.lng = e.latLng.lng
							this.center = new TMap.LatLng(this.lat,this.lng)
							this.addressInfo = {
								...this.addressInfo,
								...res.result.address_component
							}
							this.drawCircle()
							this.drawMarker()
						}
					}).catch(err => err)
					
				})
			},
			drawCircle(){
				if(this.circle.setMap){
					this.circle.setMap(null)
				}
				this.circle = new TMap.MultiCircle({
					map:this.map,
					styles: { // 设置圆形样式
						'circle': new TMap.CircleStyle({
							'color': 'rgba(41,91,255,0.16)',
							'showBorder': true,
							'borderColor': 'rgba(41,91,255,1)',
							'borderWidth': 2,
						}),
					},
					geometries: [{
						styleId: 'circle',
						center: this.center,
						radius: this.r?this.r*1000:0,
					}],
				});
				
			},
			drawMarker(){
				if(this.marker.setMap){
					this.marker.setMap(null)
				}
				//初始化marker
				this.marker = new TMap.MultiMarker({
						id: "marker-layer", //图层id
						map: this.map,
						styles: { //点标注的相关样式
								"marker": new TMap.MarkerStyle({
										"width": 25,
										"height": 35,
										"anchor": { x: 16, y: 32 },
										"src": "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png"
								})
						},
						geometries: [{ //点标注数据数组
								"id": "demo",
								"styleId": "marker",
								"position": this.center,
								"properties": {
										"title": "marker"
								}
						}]
				});
			},
			async handleSubmit(){
				let formData = {
					...this.addressInfo,
					lat:this.lat,
					lng:this.lng,
					id:'001',
					r:this.r
				}
				console.log(formData)
				let res = await updateCheckOutPostion(formData)
				if(res.data.code == 200){
					this.$notify.success({
						title:'提示',
						message:'设置成功'
					})
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.map{
		width: 100%;
		height: 300px;
	}
</style>
