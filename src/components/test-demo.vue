<template>
	<p>{{ greeting }} world!</p>
</template>

<script>
export default {
	data() {
		return {
			greeting: 'hellasdasdfasdfo zhan'
		}
	},
	mounted() {
        setTimeout(() => {
         console.log(1111);
        }, 2000);
    }
}

</script>

<style scoped>
	p {
		font-size: 2em;
		font-color: red;
		text-align: center;
	}
</style>