import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'
import createdPersistedState from 'vuex-persistedstate'

import * as modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  plugins: [
    pathify.plugin,
    createdPersistedState({
      storage: window.sessionStorage
    })
  ]
})

export default store