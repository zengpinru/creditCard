import Vue from 'vue'
import Vuex from 'vuex'
import {isLegal} from '../common/common'

Vue.use(Vuex);

let state = {
  number: '',
  name: '',
  expiry: '',
  cvc: '',
  numberStyle: false,
  nameStyle: false,
  expiryStyle: false,
  showFront: true,
  showMsg: false,
};
let getters = {
  getLegalRes(state) {
    return isLegal(state.number) ? 'YES' : 'NO';
  }
};
let mutations = {
  //change of monitoring number、name、expiry、cvc value
  changeMsg(state, data) {
    state[data.key] = data.value;
  },
  focusStyle(state, key) {
    state[key] = true;
  },
  blurStyle(state, key) {
    state[key] = false;
  },
  showFront(state) {
    state.showFront = true;
  },
  showBack(state) {
    state.showFront = false;
  },
  showMsg(state) {
    state.showMsg = true;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters
})
