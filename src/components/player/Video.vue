<template>
  <div
    v-if="data && meta"
    ref="element"
    v-shortkey="keyBindings"
    class="relative-position window-height player"
    :class="fullscreen ? 'fullscreen' : null"
    @shortkey="eventHandler"
  >
    <video
      ref="instance"
      class="absolute fit"
      playsinline
      preload="auto"
      :poster="data.thumbnail_url"
      :height="data.properties.height || 360"
      :width="data.properties.width || 480"
    />

    <control-container />
  </div>
</template>

<script>
import { Player } from 'shaka-player'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {
    ControlContainer: () => import('./controls/Container')
  },

  props: {
    data: {
      type: Object,
      required: true
    },

    meta: {
      type: Object,
      default: null
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
          jumpLargeGaps: true,
          ignoreTextStreamFailures: true,
          alwaysStreamText: true
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
        rewind: ['arrowleft'],
        forward: ['arrowright'],
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

  async beforeDestroy () {
    for (const listener of this.listeners) {
      this.player.removeEventListener(listener, this.dispatchEvents)
    }

    await this.detach()
  },

  methods: {
    ...mapActions('player', [
      'create',
      'update'
    ]),

    ...mapMutations('player', [
      'setFullscreen',
      'setTrack'
    ]),

    async initialize () {
      if (!Player.isBrowserSupported()) {
        alert('Browser is not supported')
      }

      try {
        this.instance = new Player(this.player)

        await this.instance.configure(this.settings)
        await this.instance.load(this.data.stream_url)

        // Add sprite metadata
        const metadata = await this.instance.addTextTrack(
          this.data.sprite_url,
          'eng',
          'metadata',
          'text/vtt'
        )

        await this.instance.selectTextTrack(metadata)

        // Add listeners
        for (const listener of this.listeners) {
          this.player.addEventListener(listener, this.dispatchEvents)
        }

        // Active text tracks
        this.setTrack({
          key: 'metadata-sprite',
          value: this.player.textTracks[0]
        })

        // Start the video
        this.player.play()
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

        case 'currentTime':
          this.player.currentTime = value
          break

        case 'rewind':
          this.player.currentTime = this.player.currentTime - 5
          break

        case 'forward':
          this.player.currentTime = this.player.currentTime + 5
          break

        case 'download':
          this.player.pause()
          window.location.href = this.data.download_url || ''
          break

        case 'edit':
          this.$store.dispatch('dialog/open', {
            component: 'VideoEdit',
            data: { id: this.data.id }
          })
          break

        case 'save':
          this.$store.dispatch('dialog/open', {
            component: 'VideoSave',
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
    }
  }
}
</script>
