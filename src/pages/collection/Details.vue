<template>
  <q-page :key="id">
    <template v-if="error">
      {{ error }}
    </template>

    <template v-if="collection">
      <collection-title :collection="collection" />
      <collection-videos :collection="collection" />
    </template>
  </q-page>
</template>

<script>
import CollectionModel from 'src/models/Collection'
import PaginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('collection-videos')) {
      store.registerModule('collection-videos', PaginateModule)
    }
  },

  components: {
    CollectionTitle: () => import('components/collection/Title'),
    CollectionVideos: () => import('components/collection/Videos')
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

  data () {
    return {
      collection: null,
      error: null,
      title: null
    }
  },

  watch: {
    $route: 'fetchModel'
  },

  meta () {
    return {
      title: this.title
    }
  },

  created () {
    this.fetchModel()
  },

  methods: {
    async fetchModel () {
      try {
        if (this.collection && this.collection.id !== this.id) {
          this.collection = this.error = this.title = null
          this.$store.dispatch('collection-videos/resetState')
        }

        this.collection = await CollectionModel.$find(this.id)
        this.title = this.collection.name
      } catch {
        this.error = 'Unable to load collection'
      }
    }
  }
}
</script>
