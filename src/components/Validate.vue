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
		height: 30px;
		margin: 0 auto;
		padding-left: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		line-height: 30px;
		color: orangered;
		box-sizing: border-box;
		font-size: 12px;
	}
</style>