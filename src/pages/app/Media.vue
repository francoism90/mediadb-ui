<template>
  <q-page
    v-if="isReady"
    :key="data.id"
  >
    <player
      :model="data"
    />
    <info />
    <next :namespace="nextNamespace" />
  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import modelModule from 'src/store/model'
import paginateModule from 'src/store/paginate'
import Media from 'src/models/Media'

export default {
  async preFetch ({ store, currentRoute }) {
    const routeId = currentRoute.params.id

    if (!store.hasModule('media')) {
      store.registerModule('media', modelModule)
    }

    if (!store.hasModule(['media', `${routeId}/next`])) {
      store.registerModule(['media', `${routeId}/next`], paginateModule)
    }

    store.dispatch(
      'media/setModel',
      await Media.find(routeId)
    )
  },

  components: {
    Player: () => import('components/player/Video'),
    Info: () => import('components/media/Info'),
    Next: () => import('components/media/Next')
  },

  computed: {
    ...mapState('media', [
      'data'
    ]),

    ...mapGetters('media', [
      'isReady'
    ]),

    nextNamespace () {
      return `${this.data.id}/next`
    }
  },

  beforeDestroy () {
    this.$store.unregisterModule('media')
  },

  meta () {
    return {
      title: this.data.name || '404 - Not Found'
    }
  }
}
</script>
