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
      :refreshable="true"
      item-component="Video"
    />
  </q-page>
</template>

<script>
import paginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('library')) {
      store.registerModule('library', paginateModule)
    }
  },

  components: {
    Infinite: () => import('components/paginate/Infinite'),
    Filters: () => import('components/paginate/Filters')
  },

  meta () {
    return {
      title: 'Library'
    }
  },

  data () {
    return {
      namespace: 'library',
      apiRoute: {
        path: 'media',
        params: {
          append: 'preview,thumbnail',
          include: 'model,tags',
          'page[size]': 12
        }
      },
      sorters: [
        { label: 'Recommended for You', value: 'recommended' },
        { label: 'Trending', value: 'trending' },
        { label: 'Most recent', value: 'recent' },
        { label: 'Most viewed', value: 'views' },
        { label: 'Shortest to Longest', value: 'shortest' },
        { label: 'Longest to Shortest', value: 'longest' }
      ]
    }
  },

  async created () {
    await this.$store.dispatch('library/create', this.apiRoute)
  }
}
</script>
