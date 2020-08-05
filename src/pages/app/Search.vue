<template>
  <q-page
    :key="id"
    class="container fluid"
  >
    <intro v-if="query === ''" />

    <overview
      v-else-if="query && !type"
      :query="query"
    />

    <component
      :is="getComponentType"
      v-else-if="query && type"
      :query="query"
    />
  </q-page>
</template>

<script>
import paginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    const searchStores = [
      'search_media',
      'search_channels',
      'search_collections',
      'search_tags'
    ]

    for (const searchStore of searchStores) {
      if (!store.hasModule(searchStore)) {
        store.registerModule(searchStore, paginateModule)
      }
    }
  },

  components: {
    Intro: () => import('components/search/Intro'),
    Overview: () => import('components/search/Overview'),
    Media: () => import('components/search/Media'),
    Collections: () => import('components/search/Collections'),
    Tags: () => import('components/search/Tags')
  },

  data () {
    return {
      id: null,
      query: '',
      type: '',
      componentTypes: {
        media: 'Media',
        collection: 'Collections',
        channel: 'Channels',
        tag: 'Tags'
      }
    }
  },

  computed: {
    getComponentType () {
      const hasComponent = Object.prototype.hasOwnProperty.call(
        this.componentTypes,
        this.type
      )

      return !hasComponent ? this.componentTypes[0] : this.componentTypes[this.type]
    }
  },

  created () {
    this.setQuery(this.$route)
  },

  beforeRouteUpdate (to, from, next) {
    this.setQuery(to)
    next()
  },

  meta () {
    return {
      title: this.query || 'Search'
    }
  },

  methods: {
    setQuery (route = {}) {
      this.id = this.$sanitize(route.query.id || +new Date())
      this.query = this.$sanitize(route.query.q || '')
      this.type = this.$sanitize(route.query.type || '')
    }
  }
}
</script>
