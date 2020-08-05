<template>
  <q-page
    v-if="channel"
    :key="channel.id"
  >
    <info :channel="channel" />

    <items
      :channel="channel"
      :namespace="channelModule"
    />
  </q-page>
</template>

<script>
import Channel from 'src/models/Channel'
import paginateModule from 'src/store/paginate'

export default {
  preFetch ({ store, currentRoute }) {
    const channelModule = 'channel_' + currentRoute.params.id

    if (!store.hasModule(channelModule)) {
      store.registerModule(channelModule, paginateModule)
    }
  },

  components: {
    Info: () => import('components/channel/Info'),
    Items: () => import('components/channel/Items')
  },

  data () {
    return {
      title: null,
      channel: null
    }
  },

  computed: {
    channelModule () {
      return 'channel_' + this.channel.id
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
      this.channel = await Channel.$find(id)
      this.title = this.channel.name || '404'
    }
  }
}
</script>
