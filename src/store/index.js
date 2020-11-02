import Vue from 'vue'
import Vuex from 'vuex'

// Vuex modules
import notifications from './paginate'
import player from './player'
import session from './session'

// Vuex plugins
import createPersistedState from 'vuex-persistedstate'

// Register plugins
const persistedState = createPersistedState({
  paths: [
    'player.captionLocale',
    'player.subtitleLocale',
    'player.playbackRate',
    'player.settings',
    'session'
  ]
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
      notifications,
      player,
      session
    },
    plugins: [persistedState],
    strict: process.env.DEV
  })

  return Store
}
