<style scoped lang="scss">
	.movieRank {
		margin: 10px auto;
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
		<div class="movie">
			<h2>{{ message }}</h2>
			<ul class="movieRank">
				<li v-for="item in items">
					<router-link  :to="{name: 'detail', params: {id: item.id}}">
						<h3>{{ item.title }}&nbsp;<span>( {{ item.year }} )</span></h3>
						<section>
							<img v-bind:src="item.images.small" v-bind:alt="item.title">
							<aside>
								<p>导演:&nbsp;&nbsp;<a v-for="(director, index) in item.directors" :href="director.alt">{{ director.name }} {{ index == (item.directors.length - 1) ? '' : '/' }}</a>
								</p>
								<p>主演:&nbsp;&nbsp;<a v-for="(cast, index) in item.casts" :href="cast.alt">{{ cast.name }} {{ index == (item.casts.length - 1) ? '' : '/ ' }}</a></p>
								<p>类型:&nbsp;&nbsp;<span v-for="(genre, index) in item.genres">{{ genre }} {{ index == (item.genres.length - 1) ? '' : '/' }}</span></p>
								<p>豆瓣评分:&nbsp;&nbsp;<span>{{ item.rating.average }}分</span></p>
							</aside>
						</section>
					</router-link>
				</li>
			</ul>
	    </div>
	</div>
</template>

<script>
	export default {
		props: {
			message: {
				type: String,
           		default: function() {
                return '抱歉, 没有查询到您所要的数据'
            	}
			},
			items: {
				type: Array,
				default: []
			}

		}
	}		
</script>
