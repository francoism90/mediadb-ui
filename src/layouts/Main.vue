<template>
  <q-layout view="hHh Lpr lff">
    <q-header
      class="header bg-grey-14 row items-center no-wrap"
      height-hint="58"
    >
      <q-toolbar class="container fluid">
        <drawer />
        <q-space />
        <search />
        <q-space />

        <div class="row no-wrap q-gutter-sm">
          <notifications />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      height-hint="58"
      class="footer transparent"
    />

    <q-page-scroller
      position="bottom-right"
      :scroll-offset="175"
      :offset="[65, 0]"
      class="page-scroller"
      dense
    >
      <q-btn
        icon="expand_less"
        padding="2px 10px"
        unelevated
        color="grey-10"
      />
    </q-page-scroller>
  </q-layout>
</template>

<script>
import PaginateModule from 'src/store/paginate'
import PlayerModule from 'src/store/player'
import SessionModule from 'src/store/session'

export default {
  components: {
    Drawer: () => import('components/toolbar/Drawer'),
    Search: () => import('components/toolbar/Search'),
    Notifications: () => import('components/toolbar/Notifications')
  },

  data () {
    return {
      stores: [
        { name: 'actors', module: PaginateModule },
        { name: 'genres', module: PaginateModule },
        { name: 'notifications', module: PaginateModule },
        { name: 'player', module: PlayerModule },
        { name: 'session', module: SessionModule },
        { name: 'studios', module: PaginateModule },
        { name: 'videos', module: PaginateModule }
      ]
    }
  },

  created () {
    this.registerStores()
  },

  methods: {
    registerStores () {
      for (const store of this.stores) {
        if (!this.$store.hasModule(store.name)) {
          this.$store.registerModule(store.name, store.module)
        }
      }
    }
  }
}
</script>
