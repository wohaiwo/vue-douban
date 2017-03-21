<template>
	<div class="header">
		<header>
			<ul>
				<li><router-link to="/movie">电影</router-link></li>
				<li><router-link to="/book">读书</router-link></li>
				<li><router-link to="/douban">高分电影排行榜</router-link></li>
			</ul>
		</header>
		<div class="search">
			<input type="text" v-model.trim="query" @keyup.enter="search" placeholder="请输入搜索内容">
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
 				query: ''
			}
		},
		methods: {
			search() {
				console.log('开始搜索movie ' + this.query);
				if(!!this.query) {
					this.query = '';
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.header {
		display: flex;
		width: 100%;
		margin: 0 auto 20px;
		flex-direction: column;
		header {
			display: flex;
			width: 90%;
			height: 50px;
			margin: 0 auto;
			ul  {
				display: flex;
				flex-wrap: nowrap;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				li {

					a {
						padding-right: 10px;				
						color: rgb(35, 132, 232);
					}
				}
			}
		}
		.search {
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
	}
</style>