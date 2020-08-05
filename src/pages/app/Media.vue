<template>
  <q-page
    v-if="media"
    :key="media.id"
  >
    <player :media="media" />
    <info :media="media" />
    <next :media="media" />
  </q-page>
</template>

<script>
import Media from 'src/models/Media'
import paginateModule from 'src/store/paginate'

export default {
  preFetch ({ store, currentRoute }) {
    if (!store.hasModule('next')) {
      store.registerModule('next', paginateModule)
    }
  },

  components: {
    Player: () => import('components/player/Video'),
    Info: () => import('components/media/Info'),
    Next: () => import('components/media/Next')
  },

  data () {
    return {
      title: null,
      media: null
    }
  },

  meta () {
    return {
      title: this.title
    }
  },

  created () {
    this.getModel(this.$route.params.id)
  },

  beforeRouteUpdate (to, from, next) {
    this.getModel(to.params.id)
    next()
  },

  methods: {
    async getModel (id) {
      this.media = await Media.$find(id)
      this.title = this.media.name || '404'
    }
  }
}
</script>
