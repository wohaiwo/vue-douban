<style scoped lang="scss">
	.reviews {
		h4 {
			margin: 10px 0;
			padding: 8px 12px;
		}
		section {
			display: flex;
			flex-direction: column;

			background: #fff;
			margin-bottom: 10px;
			text-align: justify;
			box-sizing: border-box;
			border-radius: 4%;
			box-shadow: 0 0 5px 0 rgba(0, 0, 0, .6);
			.reviews-header {
				font-size: 14px;
				padding: 5px 10px 0 10px; 
				span:first-child {
					color: #ff9900;
					margin-right:  10px;
				}
			}
			.reviews-body {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				font-size: 14px;
				figure {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin: 0;
					padding: 10px;
					figcaption { 
						max-width: 50px;
						margin-top: 5px;
						word-wrap: break-word;
						font-size: 12px;
						color: #999;
					}
					img {
						border: 2px solid rgba(0, 0, 0, .3 );
						border-radius: 50%;
					}
				}
				aside {
					font-size: 14px;
					padding: 5px 5px 5px 0;
					.reviews-count {
						padding: 5px 10px 5px 0;
						text-align: right;
					}
				}
			}
				
		}
	}
</style>

<template>
	<div class="reviews" v-show="show">
		<h4>热门评论</h4>
		<section v-for="(item, index) in movieReviewsData.reviews">
			<div class="reviews-header">评级:&nbsp;<span>{{ showRate(item.rating.value) }}</span><span>{{ item.updated_at }}</span></div>
			<div class="reviews-body">
				<figure>
					<img :src="item.author.avatar" alt="" title="用户名">
					<figcaption>{{ item.author.name }}</figcaption>
				</figure>
				<aside>
					<h5>{{ item.title }}</h5>
					<p>{{ item.summary }}</p>
					<p class="reviews-count">
						<span>{{ item.useful_count }}赞同</span>&nbsp;&nbsp;<span>{{ item.useless_count }}反对</span>
					</p>
				</aside>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		props: ['id', 'show'],
		data() {
			return {
				movieReviewsData: {}
			}
		},
		mounted() {
	        let movieReviewsUrl = `https://api.douban.com/v2/movie/subject/${this.id}/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=20&client=something&udid=dddddddddddddddddddddd`;
	        this.$http.jsonp(movieReviewsUrl).then(function(response) {
	          this.movieReviewsData = response.body;
	        }, function(response) {
	          console.log('opps Is Error: ' + response);
        	})
		},
		methods: {
			showRate(rate) {
				return "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
			}
		}
	}
</script>