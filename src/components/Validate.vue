<template>
	<div class="validateMsg">
    	{{validateMsg}}
	</div>
</template>
<script>
	export default {
		name:'Validate',
		props: {
	      validateMsg: {
	        type: String
      	  }
    	}
	}
</script>

<style scoped="scoped">
	.validateMsg {
		width: 90%;
		margin: 0 auto;
		border: 1px solid #ccc;
		height: 30px;
		line-height: 30px;
		color: orangered;
		box-sizing: border-box;
		border-radius: 5px;
		padding-left: 10px;
		font-size: 12px;
	}
</style>