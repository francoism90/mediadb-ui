<template>
  <q-page class="container fluid">
    <q-btn-group class="q-py-md" unelevated>
      <filters :namespace="namespace" field="sort" :options="sorters" />
    </q-btn-group>

    <infinite
      :namespace="namespace"
      :api-route="apiRoute"
      :refreshable="true"
      item-component="User"
      row-class="row q-col-gutter-md"
      column-class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
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

  meta () {
    return {
      title: 'Profiles'
    }
  },

  data () {
    return {
      namespace: 'users',
      apiRoute: {
        path: 'user',
        'page[size]': 30
      },
      sorters: [
        { label: 'Popular this week', value: 'popular-week' },
        { label: 'Popular this month', value: 'popular-month' },
        { label: 'Most viewed', value: 'views' }
      ]
    }
  },

  created () {
    if (!this.$store.state.users) {
      this.$store.registerModule('users', paginateModule)
    }
  }
}
</script>
