import Vue from 'vue'
import Vuex from 'vuex'

// Vuex plugins
import createPersistedState from 'vuex-persistedstate'

// Vuex modules
import session from './session'

// Register plugins
const persistedState = createPersistedState({
  key: 'persist',
  paths: ['session'] // allow-list
})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      session
    },
    plugins: [persistedState],
    strict: process.env.DEV
  })

  return Store
}
