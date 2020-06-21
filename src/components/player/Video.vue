<template>
  <div
    ref="element"
    class="relative-position window-height player"
    :class="isFullscreen ? 'fullscreen' : null"
    v-shortkey="keys"
    @shortkey="eventHandler"
    @wheel="onWheel"
    @mousemove="showControls"
    @mouseleave="hideControls"
  >
    <video
      ref="instance"
      class="absolute fit"
      playsinline
      preload="auto"
      :poster="data.thumbnail"
      :height="data.properties.height || 360"
      :width="data.properties.width || 480"
    />

    <transition v-if="controlsActive" name="fade">
      <keep-alive>
        <controls />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { Player } from 'shaka-player'
import { mapActions, mapGetters } from 'vuex'

export default {
  timers: {
    hideControls: { time: 3500, autostart: true }
  },

  components: {
    Controls: () => import('./controls/Container')
  },

  props: {
    data: {
      type: Object,
      required: true
    },

    meta: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      instance: null,
      controlsActive: false,
      isFullscreen: false
    }
  },

  watch: {
    '$q.fullscreen.isActive' (value) {
      this.isFullscreen = value
    }
  },

  computed: {
    ...mapGetters('player', {
      events: 'getEventListeners',
      options: 'getShakaOptions',
      props: 'getPropsBindings',
      keys: 'getKeyBindings'
    }),

    element () {
      return this.$refs.element
    },

    player () {
      return this.$refs.instance
    }
  },

  mounted () {
    this.initialize()

    // Subscribe to callbacks
    this.$store.subscribeAction((action) => {
      if (action.type === 'player/callback') {
        this.eventHandler(action.payload)
      }
    })
  },

  beforeDestroy () {
    for (const event of this.events) {
      this.player.removeEventListener(event, this.dispatch)
    }

    this.detach()
  },

  methods: {
    ...mapActions('player', [
      'create',
      'thumbnail',
      'update'
    ]),

    async initialize () {
      if (!Player.isBrowserSupported()) {
        alert('Browser is not supported')
      }

      try {
        this.instance = new Player(this.player)

        await this.instance.configure(this.options)
        await this.instance.load(this.meta.stream_url)

        // Add event listeners
        for (const event of this.events) {
          this.player.addEventListener(event, this.dispatch)
        }
      } catch (e) {}

      // Init player store
      this.create({ data: this.data, meta: this.meta })
    },

    async detach () {
      try {
        await this.instance.detach()
        await this.instance.destroy()
      } catch (e) {}
    },

    dispatch () {
      if (!this.player) {
        return
      }

      // Get current player data
      const data = {}

      for (const prop of this.props) {
        data[prop] = this.player[prop] || null
      }

      this.update(data)
    },

    async eventHandler (payload) {
      const { srcKey = null, type = null, value = null } = payload

      switch (srcKey || type) {
        case 'currentTime':
          this.player.currentTime = value
          break

        case 'togglePlay':
          if (
            this.player.readyState > 1 &&
            (this.player.paused === true || this.player.ended === true)) {
            this.player.play()
          } else {
            this.player.pause()
          }
          break

        case 'toggleFullscreen':
          this.$q.fullscreen.toggle(this.element)
          break

        case 'download':
          this.player.pause()
          window.location.href = this.meta.download_url || ''
          break

        case 'edit':
          this.$store.dispatch('dialog/open', {
            component: 'VideoEdit',
            data: { id: this.data.id }
          })
          break

        case 'snapshot':
          await this.$store.dispatch('video/update', {
            path: 'media/' + this.data.id,
            body: { snapshot: this.player.currentTime }
          })

          this.$q.notify({
            progress: true,
            position: 'top',
            message: `${this.data.name} has been updated.`,
            type: 'positive'
          })
          break
      }
    },

    onWheel (event) {
      if (event.deltaX < 0) {
        this.eventHandler(
          { type: 'currentTime', value: this.player.currentTime - 10 }
        )
      } else if (event.deltaX > 0) {
        this.eventHandler(
          { type: 'currentTime', value: this.player.currentTime + 10 }
        )
      }
    },

    hideControls () {
      this.controlsActive = false
    },

    showControls () {
      this.controlsActive = true
      this.$timer.restart('hideControls')
    }
  }
}
</script>
