<template>
  <q-layout view="hHh Lpr lff">
    <q-dialog v-model="dialog" v-bind="dialogProps">
      <component :is="dialogComponent" :props="dialogData" />
    </q-dialog>

    <q-header class="header bg-black q-py-xs" height-hint="58">
      <q-toolbar class="toolbar">
        <q-btn flat dense round icon="menu" @click="drawer = !drawer" />

        <router-link v-if="$q.screen.gt.xs" to="/" class="q-ml-md text-body2 text-grey-5">
          <q-toolbar-title shrink class="text-weight-bold">
            MediaDB
          </q-toolbar-title>
        </router-link>

        <q-space />

        <finder class="q-mx-lg" />

        <q-space />

        <div class="row no-wrap items-center">
          <q-btn class="q-mr-sm" dense flat round icon="add">
            <q-tooltip>Upload video</q-tooltip>
          </q-btn>

          <q-btn dense flat round>
            <q-avatar size="28px" icon="account_circle" />

            <q-menu auto-close dark square content-class="text-weight-light" max-width="400px">
              <q-list bordered padding dark dense>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>
                      Signed in as <span class="text-weight-medium">{{ user.name }}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator dark spaced />

                <q-item clickable dark>
                  <q-item-section>Your profile</q-item-section>
                </q-item>
                <q-item clickable dark>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-item clickable dark>
                  <q-item-section>Help</q-item-section>
                </q-item>

                <q-separator dark spaced />

                <q-item clickable dark @click="logout">
                  <q-item-section>Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      dark
      bordered
      show-if-above
      v-model="drawer"
      :mini="miniDrawer"
      @mouseover="miniDrawer = false"
      @mouseout="miniDrawer = true"
      :width="240"
      content-class="bg-black-1"
    >
      <q-list v-for="(link, index) in links" :key="index">
        <q-item :to="{ name: link.name }" exact v-ripple>
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            {{ link.label }}
          </q-item-section>
        </q-item>

        <q-separator v-if="link.separator" spaced />
      </q-list>
    </q-drawer>

    <q-page-container class="q-pb-lg">
      <router-view />

      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[32, 32]">
        <q-btn icon="expand_less" dense unelevated color="black" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  components: {
    Finder: () => import('components/search/Finder'),
    CollectEdit: () => import('components/collection/Edit'),
    VideoCollect: () => import('components/video/Collection'),
    VideoEdit: () => import('components/video/Edit')
  },

  data () {
    return {
      drawer: true,
      miniDrawer: true,
      hideDrawer: ['video'],
      links: [
        { label: 'Library', name: 'home', icon: 'video_library', separator: false },
        { label: 'Collections', name: 'collections', icon: 'collections', separator: false },
        { label: 'Subscriptions', name: 'profiles', icon: 'subscriptions', separator: true },
        { label: 'History', name: 'profiles', icon: 'history', separator: false },
        { label: 'Watch later', name: 'profiles', icon: 'watch_later', separator: false },
        { label: 'Favorites', name: 'profiles', icon: 'favorite', separator: false },
        { label: 'Your videos', name: 'profiles', icon: 'cloud_upload', separator: false }
      ]
    }
  },

  computed: {
    dialog: {
      get () {
        return this.$store.getters['dialog/getModel']
      },

      set (value) {
        this.$store.commit('dialog/setModel', value)
      }
    },

    dialogProps () {
      return this.$store.getters['dialog/getProps']
    },

    dialogComponent () {
      return this.$store.getters['dialog/getComponent']
    },

    dialogData () {
      return this.$store.getters['dialog/getData']
    },

    user () {
      return this.$store.getters['user/getData']
    }
  },

  watch: {
    $route: function (route) {
      this.showHideDrawer(route)
    }
  },

  created () {
    this.showHideDrawer(this.$route)
  },

  methods: {
    showHideDrawer (route = {}) {
      if (
        (route.name && this.hideDrawer.includes(route.name)) ||
        this.$q.screen.lt.sm
      ) {
        this.drawer = false
      } else {
        this.drawer = true
      }
    },

    async logout () {
      try {
        await this.$store.dispatch('user/logout')

        this.$router.go('/')
      } catch (e) {
        alert(e || 'Unable to logout. Please try again later.')
      }
    }
  }
}
</script>
