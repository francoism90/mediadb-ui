<template>
  <div>
    <q-btn-group
      class="q-py-md"
      unelevated
    >
      <q-select
        v-model="type"
        :options="types"
        :loading="!isReady"
        class="q-ml-lg"
        dropdown-icon="keyboard_arrow_down"
        dense
        square
      />
    </q-btn-group>

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
          class="col-xs-12 col-sm-6 col-md-4 col-lg-2 collection-item"
        >
          {{ item }}
        </q-intersection>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import NotificationModel from 'src/models/Notification'

const { mapFields } = createHelpers({
  getterType: 'notifications/getOption',
  mutationType: 'notifications/setOption'
})

export default {
  components: {
    // NotificationItem: () => import('components/notifications/Item')
  },

  data () {
    return {
      types: [
        { label: 'All Types', value: '*' },
        { label: 'Unread', value: 'unread' }
      ]
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
    ]),

    ...mapFields([
      'type'
    ])
  },

  created () {
    this.initialize({
      options: {
        type: this.types[0]
      }
    })
  },

  methods: {
    ...mapActions('notifications', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await NotificationModel
        .where('type', this.type.value)
        .page(this.page)
        .limit(12)
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
