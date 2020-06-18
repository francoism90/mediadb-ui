<template>
  <q-page v-if="ready" :key="data.id">
    <info :data="data" :meta="meta" />
    <items :data="data" :meta="meta" />
  </q-page>
</template>

<script>
import modelModule from 'src/store/model'
import { mapGetters } from 'vuex'

export default {
  meta () {
    return {
      title: this.title
    }
  },

  data () {
    return {
      title: '',
      namespace: `channel_${this.id}`
    }
  },

  components: {
    Info: () => import('components/channel/Info'),
    Items: () => import('components/channel/Items')
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters('channel', {
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
    if (!this.$store.state.channel) {
      this.$store.registerModule('channel', modelModule)
    }
  },

  methods: {
    async fetch (id) {
      await this.$store.dispatch('channel/fetch', {
        path: 'channel/' + id
      })

      this.title = this.data.name
    }
  }
}
</script>
