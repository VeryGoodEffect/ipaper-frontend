import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  actions: {
  },
  mutations: {
    setIsLoggedIn(state, value) {
      state.isLoggedIn = value
    }
  }
})