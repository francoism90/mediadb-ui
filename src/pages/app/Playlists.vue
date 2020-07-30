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
        class="q-mr-lg"
      />
      <filters
        :namespace="namespace"
        field="filter[type]"
        :options="types"
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
          append: 'thumbnail_url,items',
          include: 'model,tags',
          'filter[type]': 'user',
          'page[size]': 16
        }
      },
      sorters: [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Trending', value: 'trending' },
        { label: 'Alphabetical', value: 'name' },
        { label: 'Most Recent', value: 'recent' },
        { label: 'Most Viewed', value: 'views' }
      ],
      types: [
        { label: 'My Playlists', value: 'user' },
        { label: 'Community', value: 'community' }
      ]
    }
  },

  async created () {
    await this.$store.dispatch('playlists/create', this.apiRoute)
  }
}
</script>
