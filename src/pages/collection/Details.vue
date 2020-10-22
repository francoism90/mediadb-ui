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
    $route: 'setModel'
  },

  meta () {
    return {
      title: this.title
    }
  },

  created () {
    this.setModel()
  },

  beforeDestroy () {
    this.unsubscribe()
  },

  methods: {
    async setModel () {
      // Reset on navigation changes
      if (this.collection && this.collection.id !== this.id) {
        this.unsubscribe()
        this.collection = this.error = this.title = null

        // Reset related store
        this.$store.dispatch('collection-videos/resetState')
      }

      try {
        // Set model
        this.collection = await CollectionModel.$find(this.id)
        this.title = this.collection.name

        // Subscribe to events
        this.subscribe()
      } catch {
        this.error = 'Unable to load collection'
      }
    },

    subscribe () {
      this.$echo.private(`collection.${this.id}`)
        .listen('.collection.updated', (e) => {
          this.setModel()

          this.$q.notify({
            type: 'info',
            message: 'Collection has been updated.',
            progress: true,
            timeout: 5000,
            position: 'top'
          })
        })
    },

    unsubscribe () {
      try {
        this.$echo.leave(`collection.${this.collection.id || this.id}`)
      } catch {
        //
      }
    }
  }
}
</script>
