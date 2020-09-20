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
      if (this.$q.platform.is.cordova) {
        this.setAppFullscreen(val)
      }
    }
  },

  methods: {
    setAppFullscreen (active = false) {
      if (active) {
        window.NavigationBar.hide()
        window.StatusBar.hide()

        window.screen.orientation.lock('landscape')
      } else {
        window.screen.orientation.unlock()

        window.NavigationBar.show()
        window.StatusBar.show()
      }
    }
  }
}
</script>
