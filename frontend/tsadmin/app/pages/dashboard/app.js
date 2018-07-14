import '../../assets/css/main.css';
import '../../assets/css/semantic-ui-icon.css';
import '../../assets/css/vue-tabpanel.css';
import 'element-ui/lib/theme-default/index.css';
import Vue from 'vue';
import axios from 'util/http';
import Element from 'element-ui';
import { Message, MessageBox } from 'element-ui';
import entry from './app.vue';
import Vuex from 'vuex';
import VueTabpanel from 'vue-tabpanel';
import tabs from 'config/tabs.js';
import config from 'config/config.js';
import store from '_vuex/store';
import toolstrip from 'components/toolstrip';
import VueResource from 'vue-resource';
//import Slideout from 'slideout';

const Tabpanel = new VueTabpanel({
	tabs,
	persist: false
});

Tabpanel.beforeCloseEach((tab, next) => {
	console.info(app);
	MessageBox.confirm('确定要关闭窗口['+tab.title+']吗?', '窗口关闭提示', {
		confirmButtonText: '确 定',
		cancelButtonText: '取 消',
		type: 'warning'
	}).then(() => {
		Message({
			type: 'success',
			message: '成功!'
		});
		next()
	}).catch(()=>{

	});
})

Vue.use(VueTabpanel);
Vue.use(Element);
Vue.use(Vuex);
Vue.use(VueResource);

Vue.component('toolstrip', toolstrip);

Vue.prototype.$axios = axios;
Vue.prototype.api_url = 'http://localhost:12548/api';

//Vue.component('slideout', Slideout);

//Vue.http.headers.common['Authorization'] = 'bearer ' + _token;

let app = new Vue({
	render: h => h(entry),
	taber: Tabpanel,
	axios,
	store,
	mounted() { },
	created() { }
});
app.$mount('#app');
