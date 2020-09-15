<template>
  <q-page class="container fluid">
    <items />
  </q-page>
</template>

<script>
import PaginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('library')) {
      store.registerModule('library', PaginateModule)
    }
  },

  components: {
    Items: () => import('components/videos/Items')
  },

  meta () {
    return {
      title: 'Library'
    }
  }
}
</script>
