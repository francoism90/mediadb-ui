<template>
  <q-page v-if="isReady">
    <info />
    <items />
  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import modelModule from 'src/store/model'
import Collection from 'src/models/Collection'

export default {
  async preFetch ({ store, currentRoute }) {
    if (!store.hasModule('collection')) {
      store.registerModule('collection', modelModule)
    }

    store.dispatch(
      'collection/setModel',
      await Collection.find(currentRoute.params.id)
    )
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
