<template>
  <q-page v-if="ready" :key="data.id">
    <player :data="data" :meta="meta" />
    <info :data="data" :meta="meta" />
    <next :data="data" :meta="meta" />
  </q-page>
</template>

<script>
import modelModule from 'src/store/model'
import { mapGetters } from 'vuex'

export default {
  async preFetch ({ store, currentRoute }) {
    if (!store.hasModule('video')) {
      store.registerModule('video', modelModule)
    }

    await store.dispatch('video/fetch', {
      path: 'media/' + currentRoute.params.id
    })
  },

  components: {
    Player: () => import('components/player/Video'),
    Info: () => import('components/video/Info'),
    Next: () => import('components/video/Next')
  },

  meta () {
    return {
      title: this.data.name
    }
  },

  props: {
    id: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      default: null
    }
  },

  computed: {
    ...mapGetters('video', {
      ready: 'isReady',
      data: 'getData',
      meta: 'getMeta'
    })
  }
}
</script>
