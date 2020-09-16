<template>
  <q-page class="container fluid">
    <items />
  </q-page>
</template>

<script>
import PaginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('collections')) {
      store.registerModule('collections', PaginateModule)
    }
  },

  components: {
    Items: () => import('components/collections/Items')
  },

  meta () {
    return {
      title: 'Collections'
    }
  }
}
</script>
