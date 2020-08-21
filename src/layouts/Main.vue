<template>
  <q-layout view="hHh Lpr lff">
    <dialogs />

    <q-header
      class="header bg-grey-14 q-py-xs"
      height-hint="58"
    >
      <q-toolbar class="toolbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="drawer = !drawer"
        />

        <router-link
          v-if="$q.screen.gt.xs"
          to="/"
          class="q-ml-md text-body2 text-grey-5"
        >
          <q-toolbar-title shrink>
            MediaDB
          </q-toolbar-title>
        </router-link>

        <q-space />

        <search class="q-mx-lg" />

        <q-space />

        <div class="row no-wrap items-center">
          <q-btn
            class="q-mr-sm"
            dense
            flat
            round
            icon="notifications"
          >
            <q-tooltip>Add Items</q-tooltip>
          </q-btn>

          <q-btn
            dense
            flat
            round
          >
            <q-avatar
              size="28px"
              icon="account_circle"
            />

            <q-menu
              auto-close
              dark
              square
              max-width="400px"
            >
              <q-list
                bordered
                padding
                dark
                dense
              >
                <q-item dark>
                  <q-item-section no-wrap>
                    <q-item-label caption>
                      Signed in as <span class="text-weight-medium">{{ $auth.user().name }}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator
                  dark
                  spaced
                />

                <q-item
                  clickable
                  dark
                >
                  <q-item-section no-wrap>
                    Your profile
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  dark
                >
                  <q-item-section no-wrap>
                    Settings
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  dark
                >
                  <q-item-section no-wrap>
                    Help
                  </q-item-section>
                </q-item>

                <q-separator
                  dark
                  spaced
                />

                <q-item
                  clickable
                  dark
                  @click="logout"
                >
                  <q-item-section no-wrap>
                    Sign out
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      dark
      bordered
      persistent
      :mini="miniDrawer"
      :width="240"
      :breakpoint="500"
      content-class="bg-grey-12"
      @mouseover="miniDrawer = false"
      @mouseout="miniDrawer = true"
    >
      <q-list
        v-for="(link, index) in links"
        :key="index"
      >
        <q-item
          v-ripple
          :to="{ name: link.name }"
          exact
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            {{ link.label }}
          </q-item-section>
        </q-item>

        <q-separator
          v-if="link.separator"
          spaced
        />
      </q-list>
    </q-drawer>

    <q-page-container class="q-pb-lg">
      <router-view />

      <q-page-scroller
        position="bottom-right"
        :scroll-offset="175"
        :offset="[32, 32]"
      >
        <q-btn
          icon="expand_less"
          dense
          unelevated
          color="black"
        />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  components: {
    Dialogs: () => import('components/ui/Dialog'),
    Search: () => import('components/ui/Search')
  },

  data () {
    return {
      drawer: true,
      miniDrawer: true,
      hideDrawer: ['video'],
      links: [
        { label: 'Library', name: 'home', icon: 'video_library', separator: false },
        { label: 'Collections', name: 'collections', icon: 'collections', separator: false },
        { label: 'Tags', name: 'tags', icon: 'label', separator: true },
        { label: 'My Subscriptions', name: 'history', icon: 'subscriptions', separator: false },
        { label: 'Watch Later', name: 'history', icon: 'watch_later', separator: false },
        { label: 'Favorites', name: 'history', icon: 'favorite', separator: false },
        { label: 'History', name: 'history', icon: 'history', separator: false }
      ]
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
    showHideDrawer (route = null) {
      if (
        (route && route.name && this.hideDrawer.includes(route.name)) ||
        this.$q.screen.lt.md
      ) {
        this.drawer = false
      } else {
        this.drawer = true
      }
    },

    async logout () {
      try {
        await this.$auth
          .logout({
            makeRequest: true,
            redirect: { name: 'login' }
          })

        // Reload app
        this.$router.go('/')
      } catch (e) {
        alert(e || 'Unable to logout.')
      }
    }
  }
}
</script>
