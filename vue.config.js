module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
	lintOnSave: false,
	// 配置反向代理，所有访问在/shop-service/v1的地址全都转发到http://localhost:3000这个地址上
	devServer: {
		proxy: {
			'/user': {
				target: 'http://localhost:8026',
				changeOrigin: true
			},
			'/public': {
				target: 'http://localhost:8026',
				changeOrigin: true
			},
			'/api': {
				target: 'http://localhost:8026',
				changeOrigin: true
			},
			// '/shop-service/v1': {
			//   target: 'http://192.168.1.2:3000',
			//   changeOrigin: true
			// },
			// '/public': {
			//   target: 'http://192.168.1.2:3000',
			//   changeOrigin: true
			// },
			// '/api':{
			// 	target: 'http://192.168.1.2:3000',
			// 	changeOrigin: true
			// }
		}
	}
}
