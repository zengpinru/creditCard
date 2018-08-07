<template>
  <div class="credit-card">
    <div class="credit-card-box">
      <transition name="front">
        <div class="credit-card-front" v-if="showFront" :style="{background : bgColor}">
          <div class="credit-card-number" :class="{focused : numberStyle}">{{currentNumber}}</div>
          <div class="credit-card-userName" :class="{focused : nameStyle}">{{currentName}}</div>
          <div class="credit-card-valid" :class="{focused : expiryStyle}">
            <div class="valid-thru">valid thru</div>
            <div class="valid-date">{{currentExpiry}}</div>
          </div>
        </div>
      </transition>
      <transition name="back">
        <div class="credit-card-back" v-if="!showFront">
          <div class="stripe"></div>
          <div class="cvc">{{cvc}}</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {replaceStr} from "../../common/common.js"

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState(['number', 'name', 'expiry', 'cvc', 'numberStyle', 'nameStyle', 'expiryStyle', 'showFront']),
      currentNumber: function () {
        return this.number ? replaceStr('●●●● ●●●● ●●●● ●●●●', this.number) : '●●●● ●●●● ●●●● ●●●●';
      },
      currentName: function () {
        return this.name ? this.name : 'YOUR NAME HERE';
      },
      currentExpiry: function () {
        return this.expiry ? replaceStr('●●/●●', this.expiry) : '●●/●●';
      },
      bgColor: function () {
        let value = this.number.substring(0, 2);
        switch (value) {
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

<style scoped>
  .credit-card {
    width: 100%;
    perspective: 1000px;
  }

  .credit-card-box {
    position: relative;
    width: 2.9rem;
    height: 1.8rem;
    margin: 0 auto;
  }

  .credit-card-front, .credit-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: .05rem;
    color: #ddd;
    background: linear-gradient(25deg, #999, #999);
    transform: translate3d(0, 0, 0);
    transform-style: preserve-3d;
    transition: transform .2s linear;
  }

  .credit-card-number {
    position: absolute;
    left: 10%;
    top: 45%;
    font-size: .2rem;
  }

  .credit-card-userName {
    position: absolute;
    left: 10%;
    top: 70%;
    width: 60%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: .16rem;
  }

  .credit-card-valid {
    position: absolute;
    right: 10%;
    bottom: 15%;
    font-size: .16rem;
    text-align: center;
  }

  .valid-thru {
    font-size: .13rem;
  }

  .stripe {
    position: absolute;
    top: 9%;
    left: 0;
    width: 100%;
    height: 22%;
    background: #000;
  }

  .cvc {
    position: absolute;
    left: 25%;
    top: 42%;
    width: 70%;
    height: 18%;
    line-height: .3239rem;
    text-align: right;
    font-size: .14rem;
    color: #000;
    background: repeating-linear-gradient(0.1deg, #fff 20%, #fff 40%, #fea 40%, #fea 44%, #fff 44%);;
  }

  .focused {
    color: #fff;
  }

  .front-enter-active,
  .front-leave-active {
    transform: rotateY(90deg);
  }

  .back-enter-active,
  .back-leave-active {
    transform: rotateY(-90deg);
  }
</style>
