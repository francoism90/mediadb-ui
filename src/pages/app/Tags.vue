<template>
  <q-page class="container fluid">
    <items />
  </q-page>
</template>

<script>
import PaginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('tags')) {
      store.registerModule('tags', PaginateModule)
    }
  },

  components: {
    Items: () => import('components/tag/Items')
  },

  meta () {
    return {
      title: 'Tags'
    }
  }
}
</script>
