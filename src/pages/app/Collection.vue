<template>
  <q-page
    v-if="isReady"
    :key="data.id"
  >
    <info :model="data" />
    <items :model="data" />
  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { get } from 'lodash'
import modelModule from 'src/store/model'
import paginateModule from 'src/store/paginate'
import Collection from 'src/models/Collection'

export default {
  async preFetch ({ store, currentRoute }) {
    if (!store.hasModule('collection')) {
      store.registerModule('collection', modelModule)
      store.registerModule(['collection', 'videos'], paginateModule)
    }

    const currentModel = get(store.state.collection, 'data')

    if (currentModel && currentModel.id !== currentRoute.params.id) {
      store.dispatch('collection/videos/resetState')
    }

    const model = await Collection.find(currentRoute.params.id)

    store.dispatch('collection/setModel', model)
  },

  components: {
    Info: () => import('components/collection/Info'),
    Items: () => import('components/collection/Items')
  },

  computed: {
    ...mapState('collection', [
      'data'
    ]),

    ...mapGetters('collection', [
      'isReady'
    ])
  },

  meta () {
    return {
      title: this.data.name || '404 - Not Found'
    }
  }
}
</script>
