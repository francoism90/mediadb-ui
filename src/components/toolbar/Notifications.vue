<template>
  <q-icon
    :name="unread ? 'notifications_active' : 'notifications_none'"
    size="28px"
    class="cursor-pointer"
    dark
  >
    <dropdown>
      <template #toolbar-title>
        Notifications
      </template>

      <q-separator />

      <div
        class="notifications"
        style="width: 300px; max-width: 100vw;"
      >
        <q-list
          ref="scrollTarget"
          class="text-weight-regular"
          style="max-height: 200px; overflow: auto;"
        >
          <q-infinite-scroll
            :disable="!isReady"
            :offset="200"
            :scroll-target="$refs.scrollTarget"
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
    </dropdown>
  </q-icon>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Notification from 'src/models/Notification'

export default {
  components: {
    Dropdown: () => import('components/ui/Dropdown'),
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

      const response = await Notification
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
