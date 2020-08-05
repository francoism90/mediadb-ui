<template>
  <q-page
    v-if="collection"
    :key="collection.id"
  >
    <info :collection="collection" />

    <items
      :collection="collection"
      :namespace="collectionModule"
    />
  </q-page>
</template>

<script>
import Collection from 'src/models/Collection'
import paginateModule from 'src/store/paginate'

export default {
  preFetch ({ store, currentRoute }) {
    const collectionModule = 'collection_' + currentRoute.params.id

    if (!store.hasModule(collectionModule)) {
      store.registerModule(collectionModule, paginateModule)
    }
  },

  components: {
    Info: () => import('components/collection/Info'),
    Items: () => import('components/collection/Items')
  },

  data () {
    return {
      title: null,
      collection: null
    }
  },

  computed: {
    collectionModule () {
      return 'collection_' + this.collection.id
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
      this.collection = await Collection.$find(id)
      this.title = this.collection.name || '404'
    }
  }
}
</script>
