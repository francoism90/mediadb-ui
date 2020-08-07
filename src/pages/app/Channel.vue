<template>
  <q-page
    v-if="isReady"
    :key="data.id"
  >
    <info />
    <items :namespace="itemsNamespace" />
  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import modelModule from 'src/store/model'
import paginateModule from 'src/store/paginate'
import Channel from 'src/models/Channel'

export default {
  async preFetch ({ store, currentRoute }) {
    const routeId = currentRoute.params.id

    if (!store.hasModule('channel')) {
      store.registerModule('channel', modelModule)
    }

    if (!store.hasModule(['channel', `${routeId}/items`])) {
      store.registerModule(['channel', `${routeId}/items`], paginateModule)
    }

    store.dispatch(
      'channel/setModel',
      await Channel.find(routeId)
    )
  },

  components: {
    Info: () => import('components/channel/Info'),
    Items: () => import('components/channel/Items')
  },

  computed: {
    ...mapState('channel', [
      'data'
    ]),

    ...mapGetters('channel', [
      'isReady'
    ]),

    itemsNamespace () {
      return `${this.data.id}/items`
    }
  },

  meta () {
    return {
      title: this.data.name || '404 - Not Found'
    }
  }
}
</script>
