<template>
  <q-btn
    dense
    flat
    unelevated
    :icon="unread ? 'o_notifications_active' : 'o_notifications_none'"
    :ripple="false"
    @click="unread = false"
  >
    <q-menu
      auto-close
      cover
      anchor="top right"
      :dark="false"
      :transition-show="null"
      :transition-hide="null"
    >
      <q-toolbar
        class="dropdown q-pa-md"
      >
        <q-toolbar-title class="text-black text-weight-light">
          Notifications
        </q-toolbar-title>

        <q-btn
          v-close-popup
          flat
          dense
          color="black"
          icon="o_close"
          size="xs"
        />
      </q-toolbar>

      <q-separator color="grey-2" />

      <div class="notifications scroll">
        <q-list
          :dark="false"
          class="text-black text-weight-light"
        >
          <q-infinite-scroll
            :disable="!isReady"
            class="row wrap q-col-gutter-y-md"
            @load="onLoad"
          >
            <q-intersection
              v-for="(item, index) in data"
              :key="index"
              :disable="!isReady"
              class="col-12 notification-item"
            >
              <item :notification="item" />
            </q-intersection>
          </q-infinite-scroll>
        </q-list>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import NotficationModel from 'src/models/Notification'

export default {
  components: {
    Item: () => import('components/notification/Item')
  },

  data () {
    return {
      unread: false
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

    userId () {
      return this.$auth.user().id
    }
  },

  created () {
    this.initialize({
      name: +new Date()
    })
  },

  mounted () {
    this.subscribe()
  },

  beforeDestroy () {
    try {
      this.$echo.leave(`user.${this.userId}`)
    } catch {
      //
    }
  },

  methods: {
    ...mapActions('notifications', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      if (this.page >= 4) {
        return
      }

      const response = await NotficationModel
        .orderBy('-created_at')
        .page(this.page)
        .limit(6)
        .get()

      this.setPage(response)
    },

    async onLoad (index, done) {
      await this.setModels()
      done(this.isLoaded)
    },

    subscribe () {
      this.$echo.private(`user.${this.userId}`)
        .notification((notification = {}) => {
          this.unread = true
        })
    }
  }
}
</script>
