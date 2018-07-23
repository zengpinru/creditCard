<template>
	<div class="creditCard-box">
		<credit-card :showFront="showFront"
					 :cardNum="cardNum"
					 :userName="userName"
					 :validThru="validThru"
					 :cvc="cvc"
					 :numStyle="numStyle"
					 :nameStyle="nameStyle"
					 :validThruStyle="validThruStyle">
		</credit-card>
		<div class="card-info">
			<div class="validate">
				<validate :validateMsg="validateMsg" v-show="isPass"></validate>
			</div>
			<div class="card-num">
				<input type="text" class="input-card-num" placeholder="Card Number" maxlength="19" name="cardNum"
					:value="cardNum"
					@input="replace"
					@click="showFront=true"
					@focus="numStyle = !numStyle"
					@blur="numStyle = !numStyle"/>
				<p>Eg: 49... Or 51... Or 36... Or 37...</p>
			</div>
			<div class="userName">
				<input type="text" class="input-userName" placeholder="userName" 
					v-model="userName"
					@click="showFront=true"
					@focus="nameStyle = !nameStyle"
					@blur="nameStyle = !nameStyle"/>
			</div>
			<div class="validThru-cvc clearFix">
				<div class="valid-thru">
					<input type="text" class="input-valid-thru" placeholder="validThru" maxlength="5" name="validThru"
						:value="validThru"
						@input="replace"
						@click="showFront=true"
						@focus="validThruStyle = !validThruStyle"
						@blur="validThruStyle = !validThruStyle"/>
				</div>
				<div class="cvc">
					<input type="text" class="input-cvc" placeholder="CVC" maxlength="4" name="cvc"
						:value="cvc"
						@input="replace"
						@click="showFront=false"/>
				</div>
			</div>
		</div>
		<div class="pay">
	       <button class="pay-btn" type="submit" @click="pay">Pay</button>
	       <div class="pay-card-info" v-show="showResult">
	           number: {{cardNum}}<br>
	           name: {{userName}}<br>
	           expiry: {{validThru}}<br>
	           cvc: {{cvc}}<br>
	       </div>
    	</div>
	</div>
</template>

<script>
	import CreditCard from "@/components/CreditCard";
	import Validate from "@/components/Validate";
	export default {
		name: 'CreditCardBox',
		data: function() {
			return {
				showFront: true,
				cardNum: '',
				userName: '',
				validThru: '',
				cvc: '',
				numStyle: false,
				nameStyle: false,
				validThruStyle: false,
				validateMsg: '',
				isPass: false,
				showResult: false
			}
		},
		components: {
			'credit-card': CreditCard,
			'validate': Validate
		},
		methods: {
			pay: function() {
				this.showFront = true;
				var cardInfo = [this.cardNum, this.userName, this.validThru, this.cvc];
				//card num
				if(cardInfo[0].length < 1) {
					this.isPass = true;
					this.validateMsg = "Please enter the card number.";
					return;
				} else if(cardInfo[0].length != 19) {
					this.isPass = true;
					this.validateMsg = "Please keep consistent with the required length";
					return;
				} else {
					this.isPass = false;
				}
				//userName
				if(cardInfo[1].length < 1) {
					this.isPass = true;
					this.validateMsg = "Please enter your name.";
					return;
				} else {
					this.isPass = false;
				}
				// valid thru
				if(cardInfo[2].length < 1) {
					this.isPass = true;
					this.validateMsg = "Please enter the valid thru.";
					return;
				} else if(cardInfo[2].length != 5) {
					this.isPass = true;
					this.validateMsg = "Please keep consistent with the required length.";
					return
				} else {
					this.isPass = false;
				}
				// cvc
				if(cardInfo[3].length < 1) {
					this.isPass = true;
					this.validateMsg = "Please enter the cvc.";
					return;
				} else if(cardInfo[3].length != 4) {
					this.isPass = true;
					this.validateMsg = "Please keep consistent with the required length.";
					return;
				} else {
					this.isPass = false;
				}
				if(!this.isPass) {
					this.showResult = true;
					console.log(this.cardNum);
				}
			},
			replace:function(e){
				var inputName=e.target.name;
				switch(inputName){
					case 'cardNum':
						this[inputName]=e.target.value.replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ');
						break;
					case 'validThru':
						this[inputName]=e.target.value.replace(/[^\d]/g,'').replace(/(\d{2})(?=\d)/g,'$1/');
						break;
					case 'cvc':
						this[inputName]= e.target.value.replace(/[^\d]/g,'');
						break;
				}
				e.target.value=this[inputName];
			}
		}
	}
</script>

<style scoped="scoped">
	.card-info {
		margin: 20px auto;
		width: 30%;
		height: 190px;
	}
	
	.card-info>div {
		margin-bottom: 10px;
	}
	
	.card-num>p {
		margin: 0 auto;
		width: 90%;
		font-size: 12px;
		color: #333;
	}
	
	.input-card-num,
	.input-userName {
		border: 1px solid #D9D9D9;
		border-radius: 5px;
		padding: 10px 0;
		outline: #80BDFF;
		text-indent: 10px;
		width: 90%;
		margin: 0 auto;
		display: block;
	}
	
	.input-card-num:focus,
	.input-userName:focus,
	.input-valid-thru:focus,
	.input-cvc:focus {
		border-color: #66afe9;
		outline: 0;
		-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
	}
	
	.validThru-cvc {
		width: 90%;
		margin: 0 auto;
	}
	
	.valid-thru {
		float: left;
	}
	
	.cvc {
		float: right;
	}
	
	.input-valid-thru,
	.input-cvc {
		border: 1px solid #D9D9D9;
		border-radius: 5px;
		padding: 10px 0;
		outline: #80BDFF;
		text-indent: 10px;
	}
	
	.clearFix:after {
		content: '';
		display: block;
		clear: both;
		font-size: 0;
	}
	
	.clearFix {
		zoom: 1;
	}
	
	.pay {
		margin: 20px auto;
		width: 30%;
		height: 150px;
	}
	
	.pay-btn {
		border: 0;
		width: 90%;
		height: 38px;
		font-size: 18px;
		font-weight: bold;
		color: #ffffff;
		background-color: #007BFF;
		border: 1px solid #007BFF;
		border-radius: 5px;
		display: block;
		outline: none;
		margin: 0 auto;
		cursor: pointer;
	}
	
	.pay-card-info {
		width: 90%;
		margin: 0 auto;
		line-height: 30px;
		font-size: 14px;
	}
	
	.validate {
		height: 30px;
	}
</style>