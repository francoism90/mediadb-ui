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
  preFetch ({ store }) {
    for (const type of store.getters['search/getTypes']) {
      if (!store.state[type.module]) {
        store.registerModule(type.module, paginateModule)
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
