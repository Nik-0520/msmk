import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginData:{}
  },
  mutations: {
    loginData(state,data){
      state.loginData = data
      console.log(state);
    }
  },
  actions: {
  },
  modules: {
  },
  
  plugins: [createPersistedState()]
})
