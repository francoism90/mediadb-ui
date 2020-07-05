<template>
  <div
    ref="element"
    v-shortkey="keyBindings"
    class="relative-position window-height player"
    :class="fullscreen ? 'fullscreen' : null"
    @shortkey="eventHandler"
    @wheel="onWheel"
    @mousemove="showControls()"
  >
    <video
      ref="instance"
      class="absolute fit"
      playsinline
      preload="auto"
      autoplay
      :poster="data.thumbnail"
      :height="data.properties.height || 360"
      :width="data.properties.width || 480"
    />

    <transition
      v-if="controls"
      name="fade"
    >
      <keep-alive>
        <video-container />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { Player } from 'shaka-player'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  timers: {
    hideControls: { time: 3500, autostart: true }
  },

  components: {
    VideoContainer: () => import('./Container')
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
      settings: {
        streaming: {
          rebufferingGoal: 2,
          bufferingGoal: 10,
          bufferBehind: 30,
          jumpLargeGaps: true
        }
      },
      bindings: [
        'buffered', 'currentTime', 'duration', 'ended',
        'error', 'muted', 'paused', 'readyState'
      ],
      listeners: [
        'durationchange', 'emptied', 'error', 'ended',
        'loadedmetadata', 'pause', 'play', 'playing',
        'progress', 'seeked', 'seeking', 'stalled',
        'suspend', 'timeupdate', 'waiting'
      ],
      keyBindings: {
        edit: ['c'],
        info: ['d'],
        save: ['a'],
        snapshot: ['s'],
        toggleFullscreen: ['f'],
        togglePlay: ['space']
      }
    }
  },

  computed: {
    ...mapState('player', [
      'controls',
      'fullscreen'
    ]),

    element () {
      return this.$refs.element
    },

    player () {
      return this.$refs.instance
    }
  },

  watch: {
    '$q.fullscreen.isActive' (value = false) {
      this.setFullscreen(value)
    }
  },

  async created () {
    await this.create({ data: this.data, meta: this.meta })
  },

  async mounted () {
    await this.initialize()

    this.$store.subscribeAction((action) => {
      if (action.type === 'player/callback') {
        this.eventHandler(action.payload)
      }
    })
  },

  beforeDestroy () {
    for (const listener of this.listeners) {
      this.player.removeEventListener(listener, this.dispatchEvents)
    }

    this.detach()
  },

  methods: {
    ...mapActions('player', [
      'create',
      'thumbnail',
      'update'
    ]),

    ...mapMutations('player', [
      'setControls',
      'setFullscreen'
    ]),

    async initialize () {
      if (!Player.isBrowserSupported()) {
        alert('Browser is not supported')
      }

      try {
        this.instance = new Player(this.player)

        await this.instance.configure(this.settings)
        await this.instance.load(this.meta.stream_url)

        // Add event listeners
        for (const listener of this.listeners) {
          this.player.addEventListener(listener, this.dispatchEvents)
        }
      } catch (e) {}
    },

    async detach () {
      try {
        await this.instance.detach()
        await this.instance.destroy()
      } catch (e) {}
    },

    async dispatchEvents () {
      if (!this.player) {
        return
      }

      const data = {}

      for (const key of this.bindings) {
        data[key] = this.player[key] || null
      }

      await this.update(data)
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

        case 'info':
          this.$store.dispatch('dialog/open', {
            component: 'PlayerInfo',
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

    hideControls () {
      this.setControls(false)
    },

    showControls () {
      this.setControls(true)
      this.$timer.restart('hideControls')
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
    }
  }
}
</script>
