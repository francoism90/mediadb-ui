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
  },

  watch: {
    '$q.fullscreen.isActive' (val) {
      // OS fullscreen handling
      if (!this.$q.platform.is.cordova) {
        return
      }

      if (val) {
        // Hide navigationsbars on fullscreen
        window.NavigationBar.hide()
        window.StatusBar.hide()

        // Lock screen orientation
        window.screen.orientation.lock('landscape')
      } else {
        // Show navigationsbars on fullscreen
        window.NavigationBar.show()
        window.StatusBar.show()

        // Allow screen orientation
        window.screen.orientation.unlock()
      }
    }
  }
}
</script>
