<template>
  <q-page
    v-if="isReady"
    :key="data.id"
  >
    <player
      :model="data"
    />
    <info />
    <collections :namespace="collectionsNamespace" />
    <videos :namespace="videosNamespace" />
  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import modelModule from 'src/store/model'
import paginateModule from 'src/store/paginate'
import Video from 'src/models/Video'

export default {
  async preFetch ({ store, currentRoute }) {
    const routeId = currentRoute.params.id

    if (!store.hasModule('video')) {
      store.registerModule('video', modelModule)
    }

    if (!store.hasModule(['video', `${routeId}/videos`])) {
      store.registerModule(['video', `${routeId}/videos`], paginateModule)
    }

    if (!store.hasModule(['video', `${routeId}/collections`])) {
      store.registerModule(['video', `${routeId}/collections`], paginateModule)
    }

    store.dispatch(
      'video/setModel',
      await Video.find(routeId)
    )
  },

  components: {
    Player: () => import('components/player/Video'),
    Info: () => import('components/video/Info'),
    Collections: () => import('components/video/Collections'),
    Videos: () => import('components/video/Videos')
  },

  computed: {
    ...mapState('video', [
      'data'
    ]),

    ...mapGetters('video', [
      'isReady'
    ]),

    collectionsNamespace () {
      return `${this.data.id}/collections`
    },

    videosNamespace () {
      return `${this.data.id}/videos`
    }
  },

  beforeDestroy () {
    this.$store.unregisterModule('video')
  },

  meta () {
    return {
      title: this.data.name || '404 - Not Found'
    }
  }
}
</script>
