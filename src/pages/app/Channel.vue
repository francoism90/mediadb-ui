<template>
  <q-page v-if="ready" :key="data.id">
    <info :data="data" :meta="meta" />
    <items :data="data" :meta="meta" />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import modelModule from 'src/store/model'

export default {
  async preFetch ({ store, currentRoute }) {
    if (!store.hasModule('channel')) {
      store.registerModule('channel', modelModule)
    }

    await store.dispatch('channel/fetch', {
      path: 'channel/' + currentRoute.params.id
    })
  },

  meta () {
    return {
      title: this.data.name
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
    },

    slug: {
      type: String,
      default: null
    }
  },

  computed: {
    ...mapGetters('channel', {
      ready: 'isReady',
      data: 'getData',
      meta: 'getMeta'
    })
  }
}
</script>
