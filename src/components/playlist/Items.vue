<template>
  <div class="container fluid">
    <q-btn-group class="q-pb-md" unelevated>
      <filters :namespace="namespace" field="sort" :options="sorters" />
    </q-btn-group>

    <infinite
      :namespace="namespace"
      :api-route="apiRoute"
      item-component="Video"
    />
  </div>
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
      namespace: `playlist_${this.data.id}`,
      apiRoute: {
        path: 'media',
        params: {
          include: 'model,tags',
          'filter[playlist]': this.data.id,
          'page[size]': 12,
          sort: 'recent'
        }
      },
      sorters: [
        { label: 'Most recent', value: 'recent' },
        { label: 'Most viewed', value: 'views' },
        { label: 'Popular this week', value: 'popular-week' },
        { label: 'Popular this month', value: 'popular-month' },
        { label: 'Recommended for You', value: 'recommended' }
      ]
    }
  },

  props: {
    data: {
      type: Object,
      required: true
    },

    meta: {
      type: Object,
      required: true
    }
  },

  created () {
    if (!this.$store.state[this.namespace]) {
      this.$store.registerModule(this.namespace, paginateModule)
    }
  }
}
</script>
