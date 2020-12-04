<template>
  <q-page class="container fluid">
    <q-pull-to-refresh
      scroll-target="body"
      class="q-pt-lg"
      @refresh="refreshStores"
    >
      <videos />
      <collections />
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import PaginateModule from 'src/store/paginate'

export default {
  components: {
    Collections: () => import('components/feed/Collections'),
    Videos: () => import('components/feed/Videos')
  },

  data () {
    return {
      id: +new Date(),
      stores: [
        { name: 'feed-collections', module: PaginateModule },
        { name: 'feed-videos', module: PaginateModule }
      ]
    }
  },

  meta () {
    return {
      title: 'Home'
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
          this.$store.dispatch(`${store.name}/initialize`)
        }
      }
    },

    refreshStores (done) {
      for (const store of this.stores) {
        if (this.$store.hasModule(store.name)) {
          this.$store.dispatch(`${store.name}/resetItems`)
        }
      }

      done()
    }
  }
}
</script>
