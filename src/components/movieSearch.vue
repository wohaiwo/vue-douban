<style scoped lang="scss">
	.search {
		margin: 10px 0;
		input {
			position: relative;
			width: 100%;
			height: 35px;
			padding-left: 2%;
			color: #333;
			background: #f5f5f5;
			border: 0;
			outline: 0;
		}
	}
	.search:hover {
		box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, .3);
	}
</style>
<template>
	<div>
		<div class="search">
			<input type="text" v-model.trim="query" @keyup.enter="search" placeholder="请输入搜索内容">
		</div>
		<movie-list :message="movieListTitle" :items="movieListData"></movie-list>
		<v-loading :show="done"></v-loading>
	</div>
</template>
<script>
	import vLoading from './loading.vue';
	import movieList from './movieListTpl.vue';
	export default {
		data() {
			return {
				done: false,
				query: '',
				movieListTitle: '',
				movieListData: []
			}
		},
		components:  {
			vLoading, movieList
		},
		mounted() {
			
		},
		methods: {
			search() {
				if(!!this.query) {
					this.done = true;
					let movieSearchUrl = `https://api.douban.com/v2/movie/search?q=${this.query}`;
					this.$http.jsonp(movieSearchUrl).then(function(response) {
					this.$data.movieListTitle = response.data.title;
					this.$data.movieListData = response.data.subjects;
						this.done = false;
					}, function(response) {
						console.error('访问失败' + response);
						this.done = false;
					});
       				this.query = '';
				}
			}
		}
	} 
</script>