<template>
  <q-page class="container horizontal fluid">
    <q-pull-to-refresh
      :key="id"
      :disable="!isReady"
      @refresh="onRefresh"
    >
      <q-infinite-scroll
        :disable="!isReady"
        class="row wrap justify-start items-start content-start q-col-gutter-md"
        @load="onLoad"
      >
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          :disable="!isReady"
          class="col-12 notification-item"
        >
          <notification-item :notification="item" />
        </q-intersection>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import PaginateModule from 'src/store/paginate'
import NotificationModel from 'src/models/Notification'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('notifications')) {
      store.registerModule('notifications', PaginateModule)
      store.dispatch('notifications/initialize')
    }
  },

  components: {
    NotificationItem: () => import('components/notification/Item')
  },

  meta () {
    return {
      title: 'Notifications'
    }
  },

  computed: {
    ...mapState('notifications', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('notifications', [
      'isLoaded',
      'isReady'
    ])
  },

  methods: {
    ...mapActions('notifications', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await NotificationModel
        .orderBy('-created_at')
        .page(this.page)
        .limit(30)
        .get()

      this.setPage(response)
    },

    async onLoad (index, done) {
      await this.setModels()
      done(this.isLoaded)
    },

    async onRefresh (done) {
      await this.resetItems()
      done()
    }
  }
}
</script>
