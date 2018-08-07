<template>
  <div class="creditCard-box">
    <credit-card></credit-card>
    <credit-card-form></credit-card-form>
    <credit-card-msg v-show="showMsg"></credit-card-msg>
  </div>
</template>

<script>
  import CreditCard from './CreditCard';
  import CreditCardForm from './CreditCardForm';
  import CreditCardMsg from './CreditCardMsg';
  import {mapState} from 'vuex';

  export default {
    computed: {
      ...mapState(['showMsg'])
    },
    components: {
      'credit-card': CreditCard,
      'credit-card-form': CreditCardForm,
      'credit-card-msg': CreditCardMsg
    }
  }
</script>

<style scoped>
  .creditCard-box {
    padding: .3rem;
  }
</style>
