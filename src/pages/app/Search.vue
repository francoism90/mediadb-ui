<template>
  <q-page
    :key="id"
    class="container fluid q-py-md"
  >
    <div class="col no-wrap">
      <q-chip
        class="q-mb-md"
        color="grey-8"
        size="12px"
        square
      >
        <q-avatar
          icon="filter_alt"
          color="grey-9"
          text-color="white"
        /> {{ query }}
      </q-chip>
    </div>

    <template v-if="query">
      <panels :query="query" />
    </template>

    <template v-else>
      <div class="fixed-center text-center">
        <div>
          <q-icon
            name="search"
            size="4rem"
          />
        </div>
        <div class="text-h5 q-mb-xs">
          Search MediaDB
        </div>
        <div class="text-body2">
          Find videos, collections and tags.
        </div>
      </div>
    </template>
  </q-page>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import PaginateModule from 'src/store/paginate'

const { mapFields } = createHelpers({
  getterType: 'session/getDataField',
  mutationType: 'session/updateDataField'
})

const paginates = ['sCollections', 'sTags', 'sVideos']

export default {
  preFetch ({ store, currentRoute }) {
    for (const paginate of paginates) {
      if (!store.hasModule(paginate)) {
        store.registerModule(paginate, PaginateModule)
      }
    }
  },

  components: {
    Panels: () => import('components/search/Panels')
  },

  computed: {
    ...mapFields({
      id: 'search.id',
      query: 'search.query'
    })
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.setQuery(to)
    })
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
    setQuery (route) {
      const id = this.$sanitize(route.query.id) || +new Date()
      const query = this.$sanitize(route.query.q) || ''

      this.$store.dispatch('session/setData', {
        search: { id: id, query: query }
      })
    }
  }
}
</script>
