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
  components: {
    Player: () => import('components/video/Player'),
    Info: () => import('components/video/Info'),
    Next: () => import('components/video/Next')
  },

  meta () {
    return {
      title: this.title
    }
  },

  data () {
    return {
      title: ''
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
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetch(to.params.id)
      next()
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.fetch(to.params.id)
    next()
  },

  created () {
    if (!this.$store.state.video) {
      this.$store.registerModule('video', modelModule)
    }
  },

  methods: {
    async fetch (id) {
      await this.$store.dispatch('video/fetch', {
        path: 'media/' + id,
        params: {
          include: 'model,tags'
        }
      })

      this.title = this.data.name
    }
  }
}
</script>
