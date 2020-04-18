<template>
  <div id="q-app">
    <component :is="layout || 'Auth'">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  name: 'App',

  meta: {
    title: '',
    titleTemplate: title => `${title} | MediaDB`
  },

  components: {
    Auth: () => import('layouts/Auth'),
    Main: () => import('layouts/Main')
  },

  computed: {
    layout () {
      return this.$route.meta.layout
    }
  }
}
</script>
