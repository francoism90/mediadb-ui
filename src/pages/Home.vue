<template>
  <q-page
    :key="refreshed"
    class="container fluid"
  >
    <q-pull-to-refresh
      scroll-target="body"
      @refresh="refreshed = +new Date()"
    >
      <videos :refreshed-at="refreshed" />
      <collections :refreshed-at="refreshed" />
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import PaginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('new-videos')) {
      store.registerModule('new-videos', PaginateModule)
    }

    if (!store.hasModule('new-collections')) {
      store.registerModule('new-collections', PaginateModule)
    }
  },

  components: {
    Videos: () => import('components/home/Videos'),
    Collections: () => import('components/home/Collections')
  },

  data () {
    return {
      refreshed: 0
    }
  },

  meta () {
    return {
      title: 'Home'
    }
  }
}
</script>
