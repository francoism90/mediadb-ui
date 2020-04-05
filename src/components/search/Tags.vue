<template>
  <div>
    <q-btn-group class="q-py-md" unelevated>
      <filters :namespace="namespace" field="sort" :options="sorters" class="q-mr-lg" />
      <filters :namespace="namespace" field="filter[type]" :options="types" />
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
      sorters: [
        { label: 'Alphabetical', value: 'name' },
        { label: 'Number of Items', value: 'media' }
      ],
      types: [
        { label: 'All Types', value: '*' },
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
