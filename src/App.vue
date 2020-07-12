<template>
  <div id="q-app">
    <component :is="layout || 'Auth'">
      <router-view />
    </component>
  </div>
</template>

<script>
import paginateModule from 'src/store/paginate'

export default {
  async preFetch ({ store }) {
    for (const searchModule of store.getters['search/getStores']) {
      if (!store.hasModule(searchModule.namespace)) {
        store.registerModule(searchModule.namespace, paginateModule)

        // Register search stores
        await store.dispatch(
          searchModule.namespace + '/create',
          searchModule.apiRoute
        )
      }
    }
  },

  meta: {
    title: '',
    titleTemplate: title => `${title} | MediaDB`
  },

  components: {
    Auth: () => import('layouts/Auth'),
    Error: () => import('layouts/Error'),
    Main: () => import('layouts/Main')
  },

  computed: {
    layout () {
      return this.$route.meta.layout
    }
  }
}
</script>
