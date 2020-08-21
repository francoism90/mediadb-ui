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
      'search_collections',
      'search_tags',
      'search_videos'
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
    Collections: () => import('components/search/Collections'),
    Tags: () => import('components/search/Tags'),
    Videos: () => import('components/search/Videos')
  },

  data () {
    return {
      id: null,
      query: '',
      type: '',
      componentTypes: {
        collections: 'Collections',
        tags: 'Tags',
        videos: 'Videos'
      }
    }
  },

  computed: {
    getComponentType () {
      return this.componentTypes[this.type] || this.componentTypes[0]
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
