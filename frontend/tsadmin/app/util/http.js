import axios from 'axios'
import {
	Loading,
	MessageBox,
	Notification
} from 'element-ui';
//import store from './store/store'
//import * as types from './store/types'

// axios 配置
axios.defaults.timeout = 15000;
//axios.defaults.headers.common['Authorization'] = 'Authorization';
//axios.defaults.baseURL = 'http://localhost:12548/api';
axios.defaults.baseURL ='http://localhost:12548/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
if (IS_PRODUCTION) {
	axios.defaults.baseURL = "http://localhost:12548/api";
}


let loadingInstance;
// http request 拦截器
axios.interceptors.request.use(
	config => {
		/*
		if (store.state.token) {
		    config.headers.Authorization = `token ${store.state.token}`;
		}
		*/
		loadingInstance = Loading.service({
			text: '加载中...'
		});
		return config;
	},
	function (error) {
		console.info(error);
		return Promise.reject(error);
	});

// http response 拦截器
axios.interceptors.response.use(
	response => {
		loadingInstance.close();
		return response;
	},
	error => {
		try {
			loadingInstance.close();
			if (error.response) {
				let res = error.response;
				let message = '处理请求时遇到了问题,请稍候再试.';
				if (res.data && res.data.message) {
					message = res.data.message;
				}
				alert(res.status);
				switch (res.status) {
					case 401:
						// 401 清除token信息并跳转到登录页面
						//store.commit(types.LOGOUT);
						/*
						router.replace({
						    path: 'login',
						    query: {redirect: router.currentRoute.fullPath}
						})
						*/
						Notification({
							title: '提示',
							message: '登录已失效,请重新登录',
							type: 'error'
						});
						window.top.location.href = "/login.html";
						break;
					default:
						Notification({
							title: '错误提示',
							message: message,
							type: 'error',
							duration: 0
						});
						break;
				}
			}
			let err = error + '';
			if (err.indexOf("Network Error") > -1) {
				MessageBox({
					title: '网络出错',
					message: '向服务器发起资源请求时出错,请检查你的网络或者联系管理员检查服务器运行状况.',
					type: 'error',
					closeOnClickModal: false,
					closeOnPressEscape: false
				});
			}
			return Promise.reject(error.response.data);
		} catch (err) { }
	});

export default axios;
