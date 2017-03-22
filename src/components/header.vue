<template>
	<div class="header">
		<header>
			<ul>
				<li><router-link to="/movie">电影</router-link></li>
				<li><router-link to="/douban">高分电影排行榜</router-link></li>
			</ul>
		</header>
	</div>
</template>

<script>
	export default {
		data() {
			return {
 				
			}
		}
	}
</script>

<style scoped lang="scss">
	.header {
		display: flex;
		width: 100%;
		margin: 0 auto 10px;
		flex-direction: column;
		background: #efefef;
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
		
	}
</style>