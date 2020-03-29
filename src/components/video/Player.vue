<template>
  <div
    ref="element"
    class="player"
    :class="fullscreen ? 'fullscreen' : null"
    v-shortkey="keys"
    @shortkey="eventHandler"
    @mousemove="showControls"
    @mouseleave="hideControls"
  >
   <video
      ref="instance"
      playsinline
      preload="auto"
      :poster="data.placeholder"
      :height="data.properties.height || 360"
      :width="data.properties.width || 480"
      @dblclick.prevent="eventHandler({ type: 'toggleFullscreen' })"
    />

    <transition v-if="ready && controlsActive" name="fade">
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
    hideControls: { time: 3000, autostart: true }
  },

  components: {
    Controls: () => import('components/video/Controls')
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
      fullscreen: false
    }
  },

  watch: {
    '$q.fullscreen.isActive' (value) {
      this.fullscreen = value
    }
  },

  computed: {
    ...mapGetters('player', {
      events: 'getEventListeners',
      options: 'getShakaOptions',
      keys: 'getKeyBindings',
      ready: 'isReady'
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

      this.update({
        buffered: this.player.buffered,
        current: this.player.currentTime,
        duration: this.player.duration,
        ended: this.player.ended,
        error: this.player.error,
        paused: this.player.paused,
        readyState: this.player.readyState,
        volume: this.player.volume
      })
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

        case 'toggleMute':
          this.player.volume = (this.player.volume === 0) ? 1 : 0
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

        case 'save':
          this.$store.dispatch('dialog/open', {
            component: 'VideoCollect',
            data: { id: this.data.id }
          })
          break

        case 'snapshot':
          // Update model
          await this.$store.dispatch('model/update', {
            path: 'media/' + this.data.id,
            body: { snapshot: this.player.currentTime }
          })

          // Notifiy
          this.$q.notify({
            progress: true,
            position: 'top',
            message: `${this.data.name} has been updated.`,
            type: 'positive'
          })
          break
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
