<style scoped>
	
</style>
<template>
	<form action="" class="login" @submit.prevent="submit">
		<div class="remind-line" v-show="btn && !form.name">用户名不能为空</div>
		<input type="text" v-model="form.name" placeholder="请输入您的用户名" >
		<div class="remind-line" v-show="btn && !form.passward">密码不能为空</div>
		<input type="passward" v-model="form.passward" placeholder="请输入您的密码" >
		<button>登录</button>
	</form>
</template>
<script>
	export default {
		data() {
			return {
				btn: false,
				form: {
					name: '',
					passward: ''
				}
			}
		},
		methods: {
			submit() {
				this.btn = true;
				if(!this.form.name || !this.form.passward) return false;
				console.log('用户名: ' +	 this.form.name + ' ---' + '密码: ' + this.form.passward);
				this.$router.push({path: '/foo'});
			}
		}
	}
</script>