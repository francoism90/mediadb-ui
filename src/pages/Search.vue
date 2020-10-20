<template>
  <q-page
    :key="id"
    class="container horizontal fluid"
  >
    <template v-if="query">
      <component
        :is="typeComponent"
        :query="query"
      />
    </template>

    <template v-else>
      <div class="fixed-center text-center text-grey">
        <div>
          <q-icon
            name="o_search"
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
import { get } from 'lodash'

const { mapFields } = createHelpers({
  getterType: 'session/getState',
  mutationType: 'session/setState'
})

export default {
  components: {
    Overview: () => import('components/search/Overview'),
    Collections: () => import('components/search/Collections'),
    Videos: () => import('components/search/Videos')
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

  data () {
    return {
      types: {
        collection: 'Collections',
        tag: 'Tags',
        video: 'Videos'
      }
    }
  },

  computed: {
    ...mapFields({
      id: 'search.id',
      type: 'search.type',
      query: 'search.query'
    }),

    typeComponent () {
      return get(this.types, this.type, 'Overview')
    }
  },

  meta () {
    return {
      title: this.query || 'Search'
    }
  },

  methods: {
    setQuery (route) {
      this.id = this.$sanitize(route.query.id || +new Date())
      this.type = this.$sanitize(route.query.t || '')
      this.query = this.$sanitize(route.query.q || '')
    }
  }
}
</script>
