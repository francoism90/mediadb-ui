<template>
  <q-layout view="hHh Lpr lff">
    <q-header
      class="header bg-grey-14 row items-center no-wrap"
      height-hint="58"
    >
      <q-toolbar class="container horizontal fluid">
        <q-btn
          class="lt-md q-mr-sm"
          flat
          dense
          round
          icon="menu"
          @click="drawer = !drawer"
        />

        <router-link
          :to="{ name: 'home' }"
          class="gt-sm text-body2 text-grey-5"
        >
          MediaDB
        </router-link>

        <q-space />

        <search class="q-mx-lg" />

        <q-space />

        <notifications />
        <account />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      bordered
      content-class="bg-grey-12"
      :breakpoint="breakpoint"
      :width="100"
    >
      <q-scroll-area class="fit">
        <q-tabs
          vertical
          no-caps
          active-color="primary bg-grey-10"
          class="drawer-tabs"
          indicator-color="transparent"
        >
          <q-route-tab
            v-for="(link, index) in links"
            :key="index"
            content-class="drawer-tab-item"
            :icon="link.icon"
            :label="link.label"
            :to="{ name: link.name }"
            :exact="link.name === 'home'"
          />
        </q-tabs>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  components: {
    Account: () => import('components/toolbar/Account'),
    Notifications: () => import('components/toolbar/Notifications'),
    Search: () => import('components/toolbar/Search')
  },

  data () {
    return {
      drawer: false,
      breakpoint: 1023,
      links: [
        { label: 'Home', name: 'home', icon: 'o_home' },
        { label: 'Video', name: 'video', icon: 'o_theaters' },
        { label: 'Browse', name: 'collection', icon: 'o_folder' },
        { label: 'Tags', name: 'tag', icon: 'o_label' },
        { label: 'Settings', name: '404', icon: 'o_settings' }
      ]
    }
  },

  computed: {
    userId () {
      return this.$auth.user().id
    }
  },

  watch: {
    '$q.screen.width' () {
      this.setVisibility()
    }
  },

  created () {
    this.setPusher()
  },

  mounted () {
    this.setListener()
    this.setVisibility()
  },

  beforeDestroy () {
    try {
      this.$echo.leave(`user.${this.id}`)
    } catch {
      //
    }
  },

  methods: {
    setPusher () {
      const userToken = this.$auth.token() || null
      this.$echo.connector.pusher.config.auth.headers.Authorization = `Bearer ${userToken}`
    },

    setListener () {
      this.$echo.private(`user.${this.userId}`)
        .notification((notification = {}) => {
          this.$q.notify({
            type: notification.type || 'primary',
            message: notification.message || null,
            avatar: notification.avatar || null,
            progress: notification.progress || true,
            timeout: notification.timeout || 1500,
            position: 'top'
          })
        })
    },

    setVisibility () {
      const screenWidth = this.$q.screen.width
      this.drawer = (screenWidth > this.breakpoint)
    }
  }
}
</script>
