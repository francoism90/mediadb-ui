<template>
  <q-page class="container fluid">
    <q-btn-group class="q-py-md" unelevated>
      <filters class="q-pr-md" :namespace="namespace" field="sort" :options="sorters" />
    </q-btn-group>

    <infinite
      :namespace="namespace"
      :api-route="apiRoute"
      item-component="Collect"
      row-class="row q-col-gutter-md"
      column-class="col-xs-12 col-sm-4 col-md-3 col-lg-2"
    />
  </q-page>
</template>

<script>
import paginateModule from 'src/store/paginate'

export default {
  components: {
    Infinite: () => import('components/paginate/Infinite'),
    Filters: () => import('components/paginate/Filters')
  },

  data () {
    return {
      namespace: 'collects',
      apiRoute: {
        path: 'collect',
        params: {
          include: 'user,tags'
        }
      },
      sorters: [
        { label: 'Recommended for You', value: 'recommended' },
        { label: 'Trending', value: 'trending' },
        { label: 'Most recent', value: 'recent' },
        { label: 'Most viewed', value: 'views' },
        { label: 'Popular this week', value: 'popular-week' },
        { label: 'Popular this month', value: 'popular-month' }
      ]
    }
  },

  created () {
    if (!this.$store.state.collects) {
      this.$store.registerModule('collects', paginateModule)
    }
  }
}
</script>
