<style scoped lang="scss">
	.movieRank {
		margin: 20px auto 40px;
		box-shadow: 0px 0px 1px solid #333;
		list-style: none;
		li {
			display: inline-block;
			width: 90%;
			padding: 4px 2%;
			margin: 2% 4%;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, .5);
			box-sizing: border-box;
			 h3 {
			 	margin-bottom: 10px;
				text-align: left;
				overflow-x: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			section {
				overflow: hidden;
				img {
					float: left;
					margin-right: 10px;
				}
				aside {
					max-width: 280px;
					font-size: 14px;
					text-align: left;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					p {
						margin-bottom: 8px;
					}
				}
			}
		}
	}
</style>

<template>
	<div>
		<v-header></v-header>
	    <div class="movie">
			<h2>{{ message }}</h2>
			<button @click="jsonp">jsonp</button>
			<button @click="getPromise">promise</button>
			<button @click="vueresoure">vueresoure</button>
			<ul class="movieRank">
				<li v-for="item in items">
					<h3>{{ item.title }}&nbsp; {{ item.original_title }}<span>( {{ item.year }} )</span></h3>
					<section>
						<img v-bind:src="item.images.small" v-bind:alt="item.title">
						<aside>
							<p>导演:<span v-for="director in item.directors">{{ director.name }}</span>
							</p>
							<p>主演:<span v-for="cast in item.casts">{{ cast.name }}</span></p>
							<p>类型:<span v-for="genre in item.genres">{{ genre }}</span></p>
							<p>豆瓣评分:<span>{{ item.rating.average }}</span></p>
						</aside>
					</section>
				</li>
			</ul>
	    </div>
	    <loading :show="done"></loading>
	</div>
</template>

<script>
	import vHeader from './header.vue';
	import loading from './loading.vue'
	export default {
		data() {
			return {
				done: false,
				message: '',
				items: []
			}
		},
		components: {
			vHeader, loading
		},

		methods: {
			jsonp() {
				// 这里必须是一个window定义的全局函数 才能被调用
				window.handleDate = response => { 
					console.log(response);  
					this.$data.items = response.subjects
				};
		
				var script = document.createElement('script');
				script.src = "https://api.douban.com/v2/movie/top250?count=10&callback=handleDate";
				document.body.insertBefore(script, document.body.firstChild);
				
			    // 因为目标 URL 是一个后台脚本，访问后会被执行，返回的 JSON 被包裹在回调函数中以字符串的形式被返回。
			    // 返回的字符串放入 <script> 中就成为了一个普通的函数调用，执行回调函数，返回的 JSON 数据作为实参被传给了回调函数。

			},

			getPromise() {
				var getJSON = function(url) {
					var promise = new Promise(function(resolve, reject) {
						let xhr = new XMLHttpRequest();
						xhr.open('GET', url, false);
						xhr.onreadystatechange = function() {
							if(xhr.readyState == 4) {
								if( (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
									resolve(xhr.responseText);
								} else {
									reject(new Error(xhr.statusText));
								}
							}
						};
						xhr.send(null);

					});
					return promise;
				};

				getJSON('https://api.douban.com/v2/movie/top250?count=10').then(function(json) {
						console.log('result' + json);
					}, function(error) {
						console.error('出错了' + error);
					});
			},

			vueresoure() {
				this.$data.done = true;
				this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
						headers: {

						},
							emulateJSON: true
						}
				).then(function(response) {
					this.$data.message = response.data.title;
					this.$data.items = response.data.subjects;
					this.$data.done = false;;
				}, function(response) {
					console.log('opps Is Error: ' + response);
					this.$data.done = false;;
				})
			}
		}
	}
</script>