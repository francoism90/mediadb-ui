<template>
  <div class="container fluid">
    <q-btn-group class="q-pb-md" unelevated>
      <filters :namespace="namespace" field="sort" :options="sorters" />
    </q-btn-group>

    <infinite :namespace="namespace" item-component="Video" />
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
      namespace: `channel_${this.data.id}`,
      apiRoute: {
        path: 'media',
        params: {
          include: 'model,tags',
          'filter[channel]': this.data.id,
          'page[size]': 12,
          sort: 'recent'
        }
      },
      sorters: [
        { label: 'Most recent', value: 'recent' },
        { label: 'Recommended for You', value: 'recommended' },
        { label: 'Most viewed', value: 'views' },
        { label: 'Trending', value: 'trending' },
        { label: 'Alphabetical', value: 'name' },
        { label: 'Duration', value: 'duration' }
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

  async created () {
    if (!this.$store.hasModule(this.namespace)) {
      this.$store.registerModule(this.namespace, paginateModule)

      // Fetch first page
      await this.$store.dispatch(this.namespace + '/create', this.apiRoute)
    }
  }
}
</script>
