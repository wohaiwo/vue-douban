import mainVue from '../App.vue';

const NotFoundComponent = {
	template: `<h1>404 - no found!</h1>`
}


// 定义路由
const routes = [
	{path: '/movie', name: 'movie', component: resolve => require(['../App.vue'], resolve)},
	{path: '/movie/hotmovies', name: 'hotmovies', component: resolve => require(['../components/hotMovies.vue'], resolve)},
	{path: '/movie/comingmovies', name: 'comingmovies', component: resolve => require(['../components/comingMovies.vue'], resolve)},
	{path: '/movie/top', name: 'topmovie', component: resolve => require(['../components/topMovies.vue'], resolve)},
	{path: '/movie/search', name: 'search', component: resolve => require(['../components/movieSearch.vue'], resolve)},
	{path: '/movie/subject/:id', name: 'detail', component: resolve => require(['../components/detail.vue'], resolve)},
	{ path: '*', component: NotFoundComponent }
]
export default routes;