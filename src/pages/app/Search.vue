<template>
  <q-page class="container fluid">
    <template v-if="ready && !type && query">
      <div
        v-for="type in modules"
        :key="type.namespace"
      >
        <items
          v-if="hasItems(type.namespace)"
          :namespace="type.namespace"
          :item-component="type.itemComponent"
          :label="type.label"
          :summary="true"
          :query="query"
        />
      </div>
    </template>

    <template v-else-if="ready && type && query">
      <items
        :namespace="type.namespace"
        :item-component="type.itemComponent"
        :label="type.label"
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
          Find videos, channels, playlists and tags.
        </p>
      </div>
    </template>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    Items: () => import('components/search/Items')
  },

  meta () {
    return {
      title: 'Search'
    }
  },

  computed: {
    ...mapGetters('search', {
      modules: 'getModules',
      query: 'getQuery',
      ready: 'isReady',
      type: 'getType'
    })
  },

  methods: {
    hasItems (namespace = null) {
      return (this.$store.getters[namespace + '/getTotal'] > 0)
    }
  }
}
</script>
