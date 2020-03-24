<template>
  <div>
    <q-btn-group class="q-py-md" unelevated>
      <filters class="q-pr-md" :namespace="namespace" field="filter[type]" :options="options" />
    </q-btn-group>

    <infinite
      :namespace="namespace"
      :api-route="apiRoute"
      item-component="Topic"
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
      namespace: 'topics',
      apiRoute: {
        path: 'tags',
        params: {
          append: 'media',
          'page[size]': 14
        }
      },
      options: [
        { label: 'All Topics', value: '*' },
        { label: 'Categories', value: 'category' },
        { label: 'Languages', value: 'language' },
        { label: 'People', value: 'people' }
      ]
    }
  },

  created () {
    if (!this.$store.state.topics) {
      this.$store.registerModule('topics', paginateModule)
    }
  }
}
</script>
