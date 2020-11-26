<template>
  <div
    v-if="$auth.ready()"
    id="q-app"
  >
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  components: {
    Auth: () => import('layouts/Auth'),
    Error: () => import('layouts/Error'),
    Main: () => import('layouts/Main')
  },

  meta: {
    title: '',
    titleTemplate: title => `${title} | MediaDB`
  },

  computed: {
    layout () {
      return this.$route.meta.layout || 'Auth'
    }
  },

  watch: {
    '$q.fullscreen.isActive' (val) {
      this.setFullscreen(val)
    }
  },

  created () {
    this.initialize()

    // Set watches
    this.$watch(() => this.$auth.user(), this.initialize)
  },

  methods: {
    initialize () {
      const user = this.$auth.user()

      if (!user) {
        this.resetStores()
      }

      // Set pusher
      const userToken = this.$auth.token() || null
      this.$echo.connector.pusher.config.auth.headers.Authorization = `Bearer ${userToken}`
    },

    resetStores () {
      const stores = [
        'collections',
        'notifications',
        'player',
        'session',
        'tags',
        'videos'
      ]

      for (const store of stores) {
        if (this.$store.hasModule(store)) {
          this.$store.dispatch(`${store}/reset`)
        }
      }
    },

    setFullscreen (active = false) {
      if (!this.$q.platform.is.cordova) {
        return
      }

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
