<template>
	<div class="credit-card">
		<transition name="front">
			<div class="card-front"  v-if="showFront" :style="{background : changeBgColor}">
				<div class="card-num" :class="{focused : numStyle}">
          			{{editCardNum}}
        		</div>
        		<div class="userName" :class="{focused : nameStyle}">
          			{{editUserName}}
        		</div>
		        <div class="validThru" :class="{focused : validThruStyle}">
		          valid thru<br>
		          {{editValidThru}}
		        </div>
			</div>
		</transition>
		<transition name="back">
	      <div class="card-back" v-if="!showFront">
	        <div class="card-back-bg"></div>
	        <div class="card-back-content">
	          {{cvc}}
	        </div>
	      </div>
    	</transition>
	</div>
</template>

<script>
	import { replaceStr } from "../common/common.js"
	export default {
		name: 'CreditCard',
		data: function() {
			return {

			}
		},
		props: {
			showFront: {
				type: Boolean,
				value: true
			},
			cardNum: {
				type: String,
				value: ''
			},
			userName: {
				type: String,
				value: ''
			},
			validThru: {
				type: String,
				value: ''
			},
			cvc: {
				type: [Number, String],
				value: ''
			},
			numStyle: {
				type: Boolean,
				value: false
			},
			nameStyle: {
				type: Boolean,
				value: false
			},
			validThruStyle: {
				type: Boolean,
				value: false
			},
		},
		computed: {
			editCardNum: function() {
				return !this.cardNum ? '●●●● ●●●● ●●●● ●●●●' : replaceStr('●●●● ●●●● ●●●● ●●●●', this.cardNum);
			},
			editUserName: function() {
				return !this.userName ? 'userName' : this.userName;
			},
			editValidThru: function() {
				return !this.validThru ? '●●/●●' : replaceStr('●●/●●', this.validThru);
			},
			changeBgColor: function() {
				var value = this.cardNum.substring(0, 2);
				switch(value) {
					case '49':
						return 'rgb(17, 122, 185)';
					case '51':
						return 'rgb(248, 156, 44)';
					case '36':
						return 'rgb(7, 220, 0)';
					case '37':
						return 'rgb(76, 165, 129)';
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.credit-card {
		width: 22%;
		height: 180px;
		margin: 20px auto;
		position: relative;
		perspective: 1000px;
	}
	
	.card-front,
	.card-back {
		position: absolute;
		width: 100%;
		height: 180px;
		background: rgb(153, 153, 153);
		border-radius: 10px;
		background-color: rgb(153, 153, 153);
		transform: translate3d(0, 0, 0);
		transform-style: preserve-3d;
		transition: transform .2s linear;
	}
	
	.card-num,
	.userName,
	.validThru {
		font-size: 14px;
		letter-spacing: 2px;
		color: #ccc;
		position: absolute;
	}
	
	.card-num {
		left: 20%;
		top: 35%;
	}
	
	.userName {
		left: 10%;
		top: 60%;
	}
	
	.validThru {
		left: 60%;
		top: 60%;
	}
	
	.card-back-bg {
		position: absolute;
		width: 100%;
		height: 40px;
		top: 30px;
		background-color: #000000;
	}
	
	.card-back-content {
		position: absolute;
		width: 60px;
		height: 20px;
		right: 10px;
		top: 50%;
		letter-spacing: 5px;
		background: #CCCC77;
	}
	
	.front-enter-active,
	.front-leave-active {
		transform: rotateY(90deg);
	}
	
	.back-enter-active,
	.back-leave-active {
		transform: rotateY(-90deg);
	}
	
	.focused {
		color: #fff;
	}
</style>