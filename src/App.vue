<template>
  <div v-if="layout" id="q-app">
    <component :is="layout">
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
    Main: () => import('layouts/Main'),
    User: () => import('layouts/User')
  },

  computed: {
    layout () {
      return this.$route.meta.layout
    }
  }
}
</script>
