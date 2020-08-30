<template>
  <q-page class="container fluid">
    <template v-if="query && !filter">
      <component
        :is="type.component"
        v-for="(type, index) in types"
        :key="index"
        :query="query"
        summary
      />
    </template>

    <template v-else-if="query && filter">
      <component
        :is="getFilter.component"
        :query="query"
      />
    </template>

    <template v-else>
      <div class="fixed-center text-center">
        <p>
          <q-icon
            name="search"
            style="font-size: 4rem;"
          />
        </p>
        <p class="text-h5 q-mb-xs">
          Search MediaDB
        </p>
        <p class="text-body2">
          Find videos, collections and tags.
        </p>
      </div>
    </template>
  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import paginateModule from 'src/store/paginate'

export default {
  preFetch ({ store, currentRoute }) {
    const searchStores = store.state.search.types

    for (const searchStore of searchStores) {
      if (!store.hasModule(['search', searchStore.key])) {
        store.registerModule(['search', searchStore.key], paginateModule)
      }
    }
  },

  components: {
    Collections: () => import('components/search/Collections'),
    Tags: () => import('components/search/Tags'),
    Videos: () => import('components/search/Videos')
  },

  computed: {
    ...mapState('search', [
      'filter',
      'query',
      'types'
    ]),

    ...mapGetters('search', [
      'getFilter'
    ])
  },

  meta () {
    return {
      title: this.query || 'Search'
    }
  }
}
</script>
