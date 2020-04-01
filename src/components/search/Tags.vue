<template>
  <div>
    <q-btn-group class="q-py-md" unelevated>
      <filters class="q-pr-md" :namespace="namespace" field="filter[type]" :options="options" />
    </q-btn-group>

    <infinite
      :namespace="namespace"
      :api-route="apiRoute"
      item-component="Tag"
      row-class="row q-col-gutter-md"
      column-class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
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
      namespace: 'tags_search',
      apiRoute: {
        path: 'tags',
        params: {
          append: 'media',
          'page[size]': 14
        }
      },
      options: [
        { label: 'All Tags', value: '*' },
        { label: 'Genres', value: 'genre' },
        { label: 'Languages', value: 'language' },
        { label: 'People', value: 'person' }
      ]
    }
  },

  created () {
    if (!this.$store.state.tags_search) {
      this.$store.registerModule('tags_search', paginateModule)
    }
  }
}
</script>
