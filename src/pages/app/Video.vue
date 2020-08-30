<template>
  <q-page
    v-if="isReady"
    :key="data.id"
  >
    <player :model="data" />
    <info :model="data" />
    <collections :model="data" />
    <videos :model="data" />
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import modelModule from 'src/store/model'
import paginateModule from 'src/store/paginate'
import playerModule from 'src/store/player'
import Video from 'src/models/Video'

export default {
  async preFetch ({ store, currentRoute }) {
    if (!store.hasModule('video')) {
      store.registerModule('video', modelModule)
      store.registerModule(['video', 'collections'], paginateModule)
      store.registerModule(['video', 'player'], playerModule)
      store.registerModule(['video', 'related'], paginateModule)
    }

    const model = await Video.find(currentRoute.params.id)

    store.dispatch('video/setModel', model)
  },

  components: {
    Player: () => import('components/video/Player'),
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
    ])
  },

  beforeDestroy () {
    this.resetState()
  },

  methods: {
    ...mapActions('video', [
      'resetState'
    ])
  },

  meta () {
    return {
      title: this.data.name || '404 - Not Found'
    }
  }
}
</script>
