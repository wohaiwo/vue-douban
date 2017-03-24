<style scoped lang="scss">
	.addData {
		margin-bottom: 20px;
	}
	.addData > button:first-child {
		margin-right: 10px;
	}
	.btn {
		display: inline-block;
		color: #fff;
		background: #4db3ff;
		border: 1px solid #bfcbd9;
		white-space: nowrap;
		cursor: pointer;
		line-height: 1;
		text-align: center;
		font-size: 14px;
		border-radius: 4px;
		padding: 10px 15px;
		margin: 0;
		outline: none;
		box-sizing: border-box;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		-webkit-appearance: none;
	}
	.btn:hover {
		background: #4db3ff;
		border-color: #4db3ff;
		color: #fff;
	}
	.btn:active {
		background: #1d90e6;
		border-color: #1d90e6;
		color: #fff;
	}

</style>

<template>
	<div>
		<v-header></v-header>
		<movie-list :message="movieListTitle" :items="movieListData"></movie-list>
		<div class="addData" v-show="isShow">
			<button class="btn" v-show="isShowPrev" @click="addMore('prev')">上一页</button>
			<button class="btn" @click="addMore('next')">下一页</button>
		</div>
	    <loading :show="done"></loading>
	</div>
</template>

<script>
	import vHeader from './header.vue';
	import movieList from './movieListTpl.vue';
	import loading from './loading.vue';
	export default {
		data() {
			return {
				done: false,
				isShowPrev: false,
				isShow: false,
				start: 0,
				movieListData: [],
				movieListTitle: ''
			}
		},
		components: {
			vHeader, loading, movieList
		},
		mounted() {
				// 页面初始化时加载数据
				this.getTopMovieData();
		},
		methods: {
			addMore(option = 'next') {
				this.$data.isAdd = false;
				if(option === 'prev') {
					if(this.$data.start === 10) {
						this.$data.isShowPrev = false;
					}
					this.$data.start -= 10;
				} else {
					this.$data.isShowPrev = true;
					this.$data.start += 10;
				}
				this.getTopMovieData(this.$data.start);
			},
			jsonp() {
				// 这里必须是一个window定义的全局函数 才能被调用
				window.handleDate = response => { 
					console.log(response);  
					this.$data.items = response.subjects
				};
		
				var script = document.createElement('script');
				script.src = "https://api.douban.com/v2/movie/top250?count=10&callback=handleDate";
				document.body.insertBefore(script, document.body.firstChild);
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
						console.error('访问失败' + error);
					});
			},
			getTopMovieData(start = 0, count = 10) {
				let movieTopUrl = `https://api.douban.com/v2/movie/top250?start=${start}&count=${count}`
				this.$data.done = true;
				this.$http.jsonp(movieTopUrl, {}, {
						headers: {

						},
							emulateJSON: true
						}
				).then(function(response) {
					this.$data.movieListTitle = response.data.title;
					this.$data.movieListData = response.data.subjects;
					this.$data.done = false;
					this.$data.isShow = true;
				}, function(response) {
					console.log('opps Is Error: ' + response);
					this.$data.done = false;;
				})
			}
		}
	}
</script>