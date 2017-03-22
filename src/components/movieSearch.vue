<style scoped lang="scss">
	.movieRank {
		margin: 20px auto 10px;
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
		box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, .5);
	}
</style>
<template>
	<div>
		<div class="search">
			<input type="text" v-model.trim="query" @keyup.enter="search" placeholder="请输入搜索内容">
		</div>
		<div class="movie">
			<h2>{{ message }}</h2>
			<ul class="movieRank">
				<li v-for="item in items">
					<h3>{{ item.title }}&nbsp;<span>( {{ item.year }} )</span></h3>
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
		<v-loading :show="done"></v-loading>
	</div>
</template>
<script>
	import vLoading from './loading.vue'
	export default {
		data() {
			return {
				done: false,
				query: '',
				message: '',
				items: []
			}
		},
		components:  {
			vLoading
		},
		mounted() {
			
		},
		methods: {
			search() {
				if(!!this.query) {
					this.done = true;
					let movieSearchUrl = `https://api.douban.com/v2/movie/search?q=${this.query}`;
					this.$http.jsonp(movieSearchUrl).then(function(response) {
						this.items = response.body.subjects;
						this.message = response.body.title;
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