<style>
	.movieRank {
		font-family: '微软雅黑, Helvetica,Arial,sans-serif';
		font-size: 16px;
		box-shadow: 0px 0px 1px solid #333;
		list-style: none;
	}
	.movieRank li {
		display: inline-block;
		width: 400px;
		padding: 4px 15px;
		margin: 10px 20px;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, .5);
		box-sizing: border-box;
	}
	.movieRank section img {
		float: left;
		margin-right: 10px;
	}
	.movieRank h3 {
		text-align: left;
		overflow-x: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.movieRank section aside {
		max-width: 280px;
		font-size: 12px;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>

<template>
    <div class="duoban">
		<h2>{{ message }}</h2>
		<button @click="update">update</button>
		<button @click="jsonp">jsonp</button>
		<button @click="getPromise">promise</button>
		<button @click="vueresoure">vueresoure</button>
		<ul class="movieRank">
			<li v-for="item in items">
				<h3>{{ item.title }}&nbsp; {{ item.original_title }}<span>( {{ item.year }} )</span></h3>
				<section>
					<img v-bind:src="item.images.medium" v-bind:alt="item.title">
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
</template>

<script>
	export default {
		data() {
			return {
				message: '',
				items: []
			}
		},
		methods: {
			update() {
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4) {
						if( (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
							console.log(xhr.responseText);
						} else {
							console.log('Request was unsuccessful: ' + xhr.status);
						}
					}
				};
				xhr.open('GET', 'https://api.douban.com/v2/movie/top250?count=10', false);
				// xhr.responseType = 'json';
				// xhr.setRequestHeader('Accept', 'application/json');
				xhr.send(null);
			},

			jsonp() {

				// 这里必须是一个window定义的全局函数 才能被调用
				window.handleDate = response => { console.log(response);  this.$data.items = response.subjects};
		
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
						// xhr.responseType = 'json';
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
				this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
						headers: {

						},
							emulateJSON: true
						}
				).then(function(response) {
					this.$data.message = response.data.title;
					this.$data.items = response.data.subjects;
				}, function(response) {
					console.log('opps Is Error: ' + response);
				})
			}
		}
	}



</script>
