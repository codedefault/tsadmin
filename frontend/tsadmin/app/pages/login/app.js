import '../../assets/css/main.css';
import '../../assets/css/semantic-ui-icon.css';
import 'element_ui/lib/theme-default/index.css';
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './app.vue';
import config from 'config/config.js';
import Vuex from 'vuex';
import store from '_vuex/store';

Vue.use(ElementUI);
Vue.use(Vuex);
let vm = new Vue({
    el: '#app',
    store,
    render: h => h(App)
})
