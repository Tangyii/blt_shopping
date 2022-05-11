// 引入请求对象
import axios from 'axios'
import qs from "qs";
import { Notification } from 'element-ui'
//axios本版本不支持jsonp 自己拓展一个
axios.jsonp = (url) => {
    if(!url){
        console.error('Axios.JSONP 至少需要一个url参数!')
        return;
    }
    return new Promise((resolve,reject) => {
        window.jsonCallBack =(result) => {
            resolve(result)
        }
        var JSONP=document.createElement("script");
        JSONP.type="text/javascript";
        JSONP.src=`${url}&callback=jsonCallBack`;
        document.body.appendChild(JSONP);
    })
}

// 使用Vue.use时Vue会默认执行这个对象暴露出来的install方法并将Vue作为参数传入
export default {
  // install方法用于将axios安装到Vue上
  install(Vue){
    console.log('http执行')
    // 将后台服务统一前缀作为基本配置，设置之后调用this.$http()
    axios.defaults.baseURL = '/api'

    // 添加请求拦截器,所有在项目其他部分使用axios的地方都会触发拦截器的执行
    axios.interceptors.request.use(function (config) {
      console.log('拦截器执行')
      console.log('请求的路径是',config.url)
			// 当用户登录之后会在sessionStorage中存token的值，token就会有值
			let token = sessionStorage.token;
			if(token){
				// 通过jwt方式验证token的参数携带规则如下
				config.headers['Authorization'] = 'Bearer '+token
			}
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器，所有在项目其他部分使用axios的地方都会触发拦截器的执行
    axios.interceptors.response.use(function (response) {
			// 当请求失败时统一拦截进行提示
      console.log(response.data)
			if(response.data.code!=200){
				Notification({
					title:'提示',
					message:response.data.data,
					type:'error'
				})
			}
      // 对响应数据做点什么
      return response;
    }, function (error) {
			// 对服务器系统级别的异常进行提示
			Notification({
				title:'提示',
				message:error.message,
				type:'error'
			})
      // 对响应错误做点什么
      return Promise.reject(error);
    });

    Vue.prototype.$http = axios;
  },
  http:axios
}
