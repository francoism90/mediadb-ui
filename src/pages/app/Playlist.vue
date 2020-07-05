<template>
  <q-page
    v-if="ready"
    :key="data.id"
  >
    <info
      :data="data"
      :meta="meta"
    />
    <items
      :data="data"
      :meta="meta"
    />
  </q-page>
</template>

<script>
import modelModule from 'src/store/model'
import { mapGetters } from 'vuex'

export default {
  async preFetch ({ store, currentRoute }) {
    if (!store.hasModule('playlist')) {
      store.registerModule('playlist', modelModule)
    }

    await store.dispatch('playlist/fetch', {
      path: 'playlist/' + currentRoute.params.id
    })
  },

  meta () {
    return {
      title: this.data.name
    }
  },

  components: {
    Info: () => import('components/playlist/Info'),
    Items: () => import('components/playlist/Items')
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
    ...mapGetters('playlist', {
      ready: 'isReady',
      data: 'getData',
      meta: 'getMeta'
    })
  }
}
</script>
