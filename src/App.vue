<template>
  <div
    v-if="$auth.ready()"
    id="q-app"
  >
    <component
      :is="layout || 'Auth'"
      v-if="$auth.ready()"
    >
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
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
