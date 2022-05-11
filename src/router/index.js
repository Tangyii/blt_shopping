import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
		children:[
			{
				path:'/user',
				name:'user',
				component:() => import('../views/system/user/user.vue'),
			},
			{
				path:'/user-add',
				name:'user-add',
				component:() => import('../views/system/user/user-add.vue'),
			},
			{
				path:'/user-edit',
				name:'user-edit',
				component:() => import('../views/system/user/user-edit.vue'),
			},
			// {
			// 	path:'/welcome',
			// 	name:'welcome',
			// 	component:() => import('../views/echars/welcome.vue'),
			// },
			{
				path:'/role',
				name:'role',
				component:() => import('../views/system/role/role.vue'),
			},
			{
				path:'/role-add',
				name:'role-add',
				component:() => import('../views/system/role/role-add.vue'),
			},
			{
				path:'/role-edit',
				name:'role-edit',
				component:() => import('../views/system/role/role-edit.vue'),
			},
			{
				path:'/goods',
				name:'goods',
				component:() => import('../views/shop/goods/goods.vue'),
			},
			{
				path:'/goods-add',
				name:'goods-add',
				component:() => import('../views/shop/goods/goods-add.vue'),
			},
			{
				path:'/goods-status',
				name:'goods-status',
				component:() => import('../views/shop/goods/goods-status.vue'),
			},
			{
				path:'/goods-edit',
				name:'goods-edit',
				component:() => import('../views/shop/goods/goods-edit.vue'),
			},
			{
				path:'/order',
				name:'order',
				component:() => import('../views/shop/order/order.vue'),
			},
			{
				path:'/order-paid',
				name:'order-paid',
				component:() => import('../views/shop/order/order-paid.vue'),
			},
			{
				path:'/order-shipped',
				name:'order-shipped',
				component:() => import('../views/shop/order/order-shipped.vue'),
			},
			{
				path:'/order-completed',
				name:'order-completed',
				component:() => import('../views/shop/order/order-completed.vue'),
			},
			{
				path:'/order-preview',
				name:'order-preview',
				component:() => import('../views/shop/order/order-preview.vue'),
			},
			{
				path:'/goods-type',
				name:'goods-type',
				component:() => import('../views/type/goods-type/goods-type.vue'),
			},
			{
				path:'/goods-type-add',
				name:'goods-type-add',
				component:() => import('../views/type/goods-type/goods-type-add.vue'),
			},
			{
				path:'/goods-type-edit',
				name:'goods-type-edit',
				component:() => import('../views/type/goods-type/goods-type-edit.vue'),
			},
			{
				path:'/echars',
				name:'echarts',
				component:() => import('../views/echars/echars.vue'),
			},
		]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
