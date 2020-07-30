<template>
  <q-page class="container fluid">
    <h1 class="text-h6 text-grey-5 q-py-md">
      Watch History
    </h1>

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
    if (!store.hasModule('history')) {
      store.registerModule('history', paginateModule)
    }
  },

  components: {
    Infinite: () => import('components/paginate/Infinite')
  },

  meta () {
    return {
      title: 'History'
    }
  },

  data () {
    return {
      namespace: 'history',
      apiRoute: {
        preFetch: true,
        path: 'media',
        params: {
          append: 'preview_url,thumbnail_url',
          include: 'model,tags',
          'filter[history]': 1,
          'page[size]': 12,
          sort: 'relevance'
        }
      }
    }
  },

  async created () {
    await this.$store.dispatch('history/create', this.apiRoute)
  }
}
</script>
