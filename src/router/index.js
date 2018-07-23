import Vue from 'vue'
import Router from 'vue-router'
import CreditCardBox from '@/components/CreditCardBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CreditCardBox',
      component: CreditCardBox
    }
  ]
})
