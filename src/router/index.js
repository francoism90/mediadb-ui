import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store, ssrContext }) {
  const Router = new VueRouter({
    scrollBehavior (to, from, savedPosition) {
      return savedPosition || { x: 0, y: 0 }
    },
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to, from, next) => {
    // Fetch user info
    await store.dispatch('session/fetch')

    // Is authenticated
    const isAuthenticated = store.getters['session/isAuthenticated']

    // Validate route on auth
    if (to.name !== 'login' && to.meta.auth === true && !isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    } else if (['join', 'login'].includes(to.name) && isAuthenticated) {
      next({ name: 'home' })
    } else {
      next()
    }
  })

  return Router
}
