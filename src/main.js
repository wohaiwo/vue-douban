// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import routes from './router/router.js';


Vue.use(VueRouter);		// 加载vue-router插件
Vue.use(VueResource);
Vue.use(Vuex);			// 加载vuex插件


// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({ 
	mode: 'history',
	routes,
	scrollBehavior(to, from, savePostion) {
		return savePostion ? savePostion : {x: 0, y: 300};
	}
});

// 首次加载自动跳转到movie页面上去
router.push({name: 'movie'});
// 创建和挂载根实例	
var vm =  new Vue({
	router,
	components: { App}
}).$mount('#app')
