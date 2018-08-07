<template>
  <form class="credit-card-form">
    <div class="form-group">
      <input type="text" name="number" class="form-control" placeholder="Card Number" maxlength="19"
             @input="replace"
             @focus="changeStyle"
             @blur="changeStyle"
             @click="showFront();hideErrorTip()">
      <span>E.g.: 49..., 51..., 36..., 37...</span>
      <div class="error-tip1" v-show="numberErrorTip">
        <error-tip :errorTipMsg="errorTipMsg"></error-tip>
      </div>
    </div>
    <div class="form-group">
      <input type="text" name="name" class="form-control" placeholder="Name"
             @input="replace"
             @focus="changeStyle"
             @blur="changeStyle"
             @click="showFront();hideErrorTip()">
      <div class="error-tip1" v-show="nameErrorTip">
        <error-tip :errorTipMsg="errorTipMsg"></error-tip>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <input type="text" name="expiry" class="form-control" placeholder="Valid Thru" maxlength="5"
               @input="replace"
               @focus="changeStyle"
               @blur="changeStyle"
               @click="showFront();hideErrorTip()">
        <div class="error-tip1" v-show="expiryErrorTip">
          <error-tip :errorTipMsg="errorTipMsg"></error-tip>
        </div>
      </div>
      <div class="col-6">
        <input type="text" name="cvc" class="form-control" placeholder="CVC" maxlength="4"
               @input="replace"
               @click="showBack();hideErrorTip()">
        <div class="error-tip1" v-show="cvcErrorTip">
          <error-tip :errorTipMsg="errorTipMsg"></error-tip>
        </div>
      </div>
    </div>
    <div class="form-actions">
      <button class="btn" @click.prevent="pay">PAY</button>
    </div>
  </form>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import ErrorTip from './ErrorTip'
  import {Validator} from '../../common/validate.js'

  export default {
    data() {
      return {
        numberErrorTip: false,
        nameErrorTip: false,
        expiryErrorTip: false,
        cvcErrorTip: false,
        errorTipMsg: 'test'
      }
    },
    components: {
      'error-tip': ErrorTip
    },
    computed: {
      ...mapState(['number', 'name', 'expiry', 'cvc']),
    },
    methods: {
      ...mapMutations(['changeMsg', 'focusStyle', 'blurStyle', 'showFront', 'showBack', 'showMsg']),
      //filter user input
      replace(e) {
        let inputName = e.target.name,
          data = {};
        switch (inputName) {
          case 'number':
            e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
            break;
          case 'expiry':
            e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(\d{2})(?=\d)/g, '$1/');
            break;
          case 'cvc':
            e.target.value = e.target.value.replace(/[^\d]/g, '');
            break;
        }
        data.key = inputName;
        data.value = e.target.value;
        //update state value
        this.changeMsg(data);
      },
      //Change the color of the font on the credit card
      changeStyle(e) {
        let name = e.target.name;
        if (e.type === 'focus') {
          this.focusStyle(name + 'Style');
        } else if (e.type === 'blur') {
          this.blurStyle(name + 'Style');
        }
      },
      //when click input,hide error tip
      hideErrorTip() {
        this.numberErrorTip = false;
        this.nameErrorTip = false;
        this.expiryErrorTip = false;
        this.cvcErrorTip = false;
      },
      //show result
      pay() {
        let res = this.validate();
        if (res) {//fail
          this[res.field + 'ErrorTip'] = true;
          this.errorTipMsg = res.errorMsg;
        } else {
          this.showMsg();
        }
      },
      //validate the field of input
      validate() {
        let v = new Validator(),
            str1='This field can not be empty',
            str2='Please keep consistent with the required length',
            numValidateRule = [
              {strategy: 'isNonEmpty', errorMsg: str1},
              {strategy: 'isEqualLength:19', errorMsg: str2},
            ],
            nameValidateRule = [
              {strategy: 'isNonEmpty', errorMsg: str1}
            ],
            expiryValidateRule = [
              {strategy: 'isNonEmpty', errorMsg: str1},
              {strategy: 'isEqualLength:5', errorMsg: str2},
            ],
            cvcValidateRule = [
              {strategy: 'isNonEmpty', errorMsg: str1},
              {strategy: 'isEqualLength:4', errorMsg: str2},
            ];
        v.add(this.number, numValidateRule, 'number');
        v.add(this.name, nameValidateRule, 'name');
        v.add(this.expiry, expiryValidateRule, 'expiry');
        v.add(this.cvc, cvcValidateRule, 'cvc');
        let res = v.start();
        return res;
      }
    },
  }
</script>

<style scoped>
  .credit-card-form {
    max-width: 4rem;
    padding: .2rem 0;
    margin: 0 auto;
    font-size: .16rem;
  }

  .form-group {
    position: relative;
  }

  .form-group:not(:first-child) {
    margin-top: .1rem;
  }

  .form-group input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: .36rem;
    padding: 0 .1rem;
    margin: 0 auto;
    border: .01rem solid #ccc;
    border-radius: .05rem;
    line-height: .36rem;
    color: #495057;
  }

  .form-group input:focus, .col-6 input:focus {
    outline: 0;
    border-color: #66afe9;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
  }

  .form-group span {
    display: block;
    line-height: .2rem;
    font-size: .12rem;
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-top: .15rem;
  }

  .col-6 {
    position: relative;
  }

  .col-6 input {
    height: .36rem;
    padding: 0 .1rem;
    margin: 0 auto;
    border: .01rem solid #ccc;
    border-radius: .05rem;
    line-height: .36rem;
    color: #495057;
  }

  .form-actions {
    width: 100%;
    height: .36rem;
    margin-top: .15rem;
  }

  .form-actions .btn {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border: .01rem solid #007bff;
    border-radius: .03rem;
    color: #fff;
    background: #007bff;
  }

  .error-tip1 {
    position: absolute;
    z-index: 1;
    left: 10%;
    top: .44rem;
    width: 100%;
  }
</style>
