import testDemo from '../components/test-demo.vue';
import mainVue from '../App.vue';


const user = {
	template: `<div class="user">
				<h3>user - {{ $route.params.id }}</h3>
				<router-view></router-view>
			   </div>`	
}


const UserProfile = {
	template: '<div class="root"><style>.root { color: red; }</style><div>这里是user-profile的路由界面</div>console.log(111);</div>'
}

const UserPosts = {
	template: ` <div>
				<p>asdfadfa</p>
				<div>这里是user-post的路由界面 </div>
				</div>
				`
}

const UserHome = {
	template: '<div>这里是没有匹配的界面</div>'
}

const Foo = {
	template: '<p style="color: red">hello world</p>'
}

const post = {
	template: '<h3>匹配vue-router中输出的$route.params {{ $route }}</h3>'
}

const nameA = {
	template: 	`
				<transition name="fadeLeft">
				<p style="color: green">hello -- world</p>
				</transition>
				`
}

const nameB = {
	template: 	`
				<transition name="fadeRight">
				<p style="color: blue">hello world</p>
				</transition>
				`
}

const NotFoundComponent = {
	template: `<h1>404 - no found!</h1>`
}




// 定义路由
const routes = [
	{path: '/movie', name: 'movie', component: resolve => require(['../App.vue'], resolve)},
	{path: '/bar', component: resolve => require(['../components/test-demo.vue'], resolve)},
	{path: '/book', component: resolve => require(['../components/login.vue'], resolve)},
	{path: '/getpost', component: resolve => require(['../components/getPost.vue'], resolve)},
	{path: '/douban', component: resolve => require(['../components/douban.vue'], resolve)},
	// 动态路径参数 以冒号开头
	{path: '/user/:id', component: user,
		children: [
			{
				// 当 /user/:id/profile 匹配成功，
          		// UserProfile 会被渲染在 User 的 <router-view> 中
				path: 'profile',
				component: UserProfile
			},{
				path: 'posts',
				component: UserPosts
			},{
				path: '*',
				component: UserHome
			}
		]
	},
	{path: '/blog/:id/title/:posts', component: post},
	// 重定向路由
	{path: '/redirect', redirect: '/user/重定向/posts'},
	// 命名路由，自定义路由名字
	{path: '/bar', name: 'jay', component: testDemo},
	// 设置路由中的别名
	{path: '/alias', component: mainVue, alias: '/movie'},
	{
		path: '/zhan',
		components: {
			default: Foo,
			a: nameA,
			b: nameB
		}
	},
	{ path: '*', component: NotFoundComponent }
]
export default routes;