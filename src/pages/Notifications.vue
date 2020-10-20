<template>
  <q-page class="container fluid">
    <items />
  </q-page>
</template>

<script>
import PaginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('notifications')) {
      store.registerModule('notifications', PaginateModule)
    }
  },

  components: {
    Items: () => import('components/notifications/Items')
  },

  meta () {
    return {
      title: 'Notifications'
    }
  }
}
</script>
