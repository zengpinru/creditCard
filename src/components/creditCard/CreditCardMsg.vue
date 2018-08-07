<template>
  <div class="credit-card-msg">
    <div>number: {{number}}</div>
    <div>name: {{name}}</div>
    <div>expiry: {{expiry}}</div>
    <div>cvc: {{cvc}}</div>
    <div>isLegal: {{getLegalRes}}</div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapState(['number', 'name', 'expiry', 'cvc']),
      ...mapGetters(['getLegalRes'])
    }
  }
</script>

<style scoped>
  .credit-card-msg {
    font-size: .16rem;
  }

  .credit-card-msg div {
    max-width: 4rem;
    margin: 0 auto;
    line-height: .24rem;
  }
</style>
