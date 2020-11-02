<template>
  <q-layout view="hHh Lpr lff">
    <q-header
      class="header bg-grey-14 row items-center no-wrap"
      height-hint="58"
    >
      <q-toolbar class="container fluid">
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
          class="gt-sm text-weight-medium text-grey-5"
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

    <q-footer class="footer transparent">
      <div class="container fluid horizontal" />
    </q-footer>
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
      drawer: true,
      breakpoint: 1023,
      links: [
        { label: 'Home', name: 'home', icon: 'o_home' },
        { label: 'Video', name: 'video', icon: 'o_theaters' },
        { label: 'Browse', name: 'collection', icon: 'o_folder' },
        { label: 'Tags', name: 'tag', icon: 'o_label' }
      ]
    }
  },

  watch: {
    '$q.screen.width' () {
      this.setDrawer()
    }
  },

  created () {
    this.initialize()
  },

  mounted () {
    this.setDrawer()
  },

  methods: {
    initialize () {
      const userToken = this.$auth.token() || null

      this.$echo.connector.pusher.config.auth.headers.Authorization = `Bearer ${userToken}`
    },

    setDrawer () {
      this.drawer = (this.$q.screen.width > this.breakpoint)
    }
  }
}
</script>
