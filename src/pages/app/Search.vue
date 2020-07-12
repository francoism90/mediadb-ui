<template>
  <q-page class="container fluid">
    <info
      :ready="ready"
      :items="items"
      :query="query"
      :store="store"
    />

    <template v-if="ready && !store && query">
      <div
        v-for="storeModule in stores"
        :key="storeModule.namespace"
      >
        <items
          :namespace="storeModule.namespace"
          :item-component="storeModule.itemComponent"
          :items="storeItems(storeModule.namespace)"
          :label="storeModule.label"
          :query="query"
          :summary="true"
        />
      </div>
    </template>

    <template v-else-if="ready && store && query">
      <items
        :namespace="store.namespace"
        :item-component="store.itemComponent"
        :items="storeItems(store.namespace)"
        :label="store.label"
        :query="query"
      />
    </template>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    Info: () => import('components/search/Info'),
    Items: () => import('components/search/Items')
  },

  meta () {
    return {
      title: 'Search'
    }
  },

  computed: {
    ...mapGetters('search', {
      items: 'getItemCount',
      query: 'getQuery',
      ready: 'isReady',
      store: 'getStore',
      stores: 'getStores'
    })
  },

  methods: {
    storeItems (namespace = null) {
      return this.$store.getters[namespace + '/getItemCount']
    }
  }
}
</script>
