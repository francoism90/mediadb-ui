<template>
  <q-page class="container fluid">
    <q-btn-group
      class="q-py-md"
      unelevated
    >
      <filters
        :namespace="namespace"
        field="sort"
        :options="sorters"
      />
    </q-btn-group>

    <infinite
      :namespace="namespace"
      :api-route="apiRoute"
      :refreshable="true"
      item-component="Playlist"
      row-class="row q-col-gutter-md"
      column-class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
    />
  </q-page>
</template>

<script>
import paginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('playlists')) {
      store.registerModule('playlists', paginateModule)
    }
  },

  components: {
    Infinite: () => import('components/paginate/Infinite'),
    Filters: () => import('components/paginate/Filters')
  },

  meta () {
    return {
      title: 'Playlists'
    }
  },

  data () {
    return {
      namespace: 'playlists',
      apiRoute: {
        preFetch: true,
        path: 'playlist',
        params: {
          append: 'thumbnail,items',
          include: 'model,tags',
          'page[size]': 16
        }
      },
      sorters: [
        { label: 'Recommended for You', value: 'recommended' },
        { label: 'Trending', value: 'trending' },
        { label: 'Alphabetical', value: 'name' },
        { label: 'Most recent', value: 'recent' },
        { label: 'Most viewed', value: 'views' }
      ]
    }
  },

  async created () {
    await this.$store.dispatch('playlists/create', this.apiRoute)
  }
}
</script>
