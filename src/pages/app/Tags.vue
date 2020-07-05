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
      item-component="Tag"
      row-class="row q-col-gutter-md"
      column-class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
    />
  </q-page>
</template>

<script>
import paginateModule from 'src/store/paginate'

export default {
  preFetch ({ store, currentRoute }) {
    if (!store.hasModule('tags')) {
      store.registerModule('tags', paginateModule)
    }
  },

  components: {
    Infinite: () => import('components/paginate/Infinite'),
    Filters: () => import('components/paginate/Filters')
  },

  data () {
    return {
      namespace: 'tags',
      apiRoute: {
        path: 'tags',
        params: {
          append: 'media',
          'page[size]': 30
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

  async created () {
    await this.$store.dispatch('tags/create', this.apiRoute)
  }
}
</script>
