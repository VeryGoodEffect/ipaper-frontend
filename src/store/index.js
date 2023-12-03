import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    isLoggedIn: true
  },
  actions: {
  },
  mutations: {
    setIsLoggedIn(state, value) {
      state.isLoggedIn = value
    }
  }
})