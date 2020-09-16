<template>
  <q-layout view="hHh Lpr lff">
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
            <q-tooltip>Notifications</q-tooltip>
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
              square
              max-width="400px"
            >
              <q-list
                bordered
                padding
                dense
              >
                <q-item>
                  <q-item-section no-wrap>
                    <q-item-label caption>
                      Signed in as <span class="text-weight-medium">{{ $auth.user().name }}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item clickable>
                  <q-item-section no-wrap>
                    Your profile
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section no-wrap>
                    Settings
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section no-wrap>
                    Help
                  </q-item-section>
                </q-item>

                <q-separator spaced />

                <q-item
                  clickable
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
      bordered
      persistent
      :mini="miniDrawer"
      :width="240"
      :breakpoint="breakpoint"
      :overlay="overlay"
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
    Search: () => import('components/ui/Search')
  },

  data () {
    return {
      drawer: true,
      miniDrawer: true,
      overlay: false,
      breakpoint: 600,
      links: [
        { label: 'Library', name: 'home', icon: 'video_library', separator: false },
        { label: 'Collections', name: 'collections', icon: 'collections', separator: false },
        { label: 'Tags', name: 'tags', icon: 'label', separator: true },
        { label: 'My Subscriptions', name: '404', icon: 'subscriptions', separator: false },
        { label: 'Watch Later', name: '404', icon: 'watch_later', separator: false },
        { label: 'Favorites', name: '404', icon: 'favorite', separator: false },
        { label: 'History', name: '404', icon: 'history', separator: false }
      ]
    }
  },

  created () {
    this.showHideDrawer()
  },

  methods: {
    showHideDrawer () {
      this.drawer = (this.$q.screen.width > this.breakpoint)
      this.miniDrawer = (this.$q.screen.width > this.breakpoint)
      this.overlay = (this.$q.screen.width < this.breakpoint)
    },

    async logout () {
      await this.$auth
        .logout({
          makeRequest: true,
          redirect: {
            name: 'login'
          }
        })
    }
  }
}
</script>
