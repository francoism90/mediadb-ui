export default ({ router, store, Vue }) => {
  router.beforeEach(async (to, from, next) => {
  // Handle rate limiting errors
    if (['/429'].includes(to.path)) {
      next()
    }

    // Handle user auth
    await store.dispatch('session/fetch')

    const isAuthenticated = store.getters['session/isAuthenticated']

    if (to.name !== 'login' && to.meta.auth === true && !isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    } else if (['join', 'login'].includes(to.name) && isAuthenticated) {
      next({ name: 'home' })
    } else {
      next()
    }
  })
}
