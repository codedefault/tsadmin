import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        sidebar: {
            collapsed: false
        },
        user: {},
        permissions: [],
        loggedIn: false,
        theme: 'default',
        workbench: []
    },
    mutations: {
        TOGGLE_SIDEBAR(state) {
            state.sidebar.collapsed = !state.sidebar.collapsed
        },
        LOGGED_IN(state) {
            state.loggedIn = true;
        },
        LOGOUT(state) {
            state.loggedIn = false;
            state.user = {};
            state.permissions = [];
            localStorage.setItem('access_token', '');
        },
        LOGGED_IN_USER(state, data) {
            state.user = data.user;
            state.permissions = data.permissions;
        },
        SWITCH_THEME(state, theme) {
            localStorage.setItem('dx_ls_theme', theme);
            state.theme = theme;
        },
        WORKBENCH_ADD(state,tab){
            if(state.workbench.indexOf(tab)>-1){
                return;
            }
            state.workbench.push(tab);
        },
        WORKBENCH_REMOVE(state,tab){
            let index=state.workbench.indexOf(tab);
            if(index===-1){
                return;
            }
            state.workbench.splice(index,1);
        },
        WORKBENCH_CLEAR(state){
            state.workbench=[];
        }
    },
    getters: {
        currentTheme: state => {
            let currentTheme = localStorage.getItem('dx_ls_theme');
            if (currentTheme == null) {
                currentTheme = "default";
            }
            return currentTheme;
        },
        workbench:state=>{
            return state.workbench;
        }
    }
})
export default store;
