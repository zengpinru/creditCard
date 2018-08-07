<template>
  <div class="error-tip">
    {{errorTipMsg}}
  </div>
</template>

<script>
  export default {
    props: ['errorTipMsg']
  }
</script>

<style scoped>
  .error-tip {
    position: relative;
    width: 60%;
    height: .28rem;
    padding: 0 .1rem;
    border: 1px solid #bbb;
    border-radius: .05rem;
    box-shadow: .01rem .01rem #ccc;
    font-size: .14rem;
    line-height: .28rem;
    background: #fff;
  }

  .error-tip:before {
    content: '';
    position: absolute;
    top: -.1rem;
    left: 8%;
    border-bottom: .1rem solid #ccc;
    border-left: .1rem solid transparent;
    border-right: .1rem solid transparent;
  }

  .error-tip:after {
    content: '';
    position: absolute;
    top: -.09rem;
    left: 8%;
    border-bottom: .1rem solid #fff;
    border-left: .1rem solid transparent;
    border-right: .1rem solid transparent;
  }
</style>
