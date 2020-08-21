<template>
  <div
    ref="element"
    class="relative-position window-height player"
    :class="$q.fullscreen.isActive ? 'fullscreen' : null"
    @mouseleave="hideControls()"
    @mousemove="showControls()"
    @mouseover="showControls()"
    @touchmove="showControls()"
  >
    <video
      ref="instance"
      class="absolute fit"
      playsinline
      preload="metadata"
      :poster="model.thumbnail_url"
      :height="model.metadata.height || 360"
      :width="model.metadata.width || 480"
      autoPictureInPicture
      @canplay="autoPlay"
      @durationchange="setDuration(player.duration)"
      @ended="setEnded(true)"
      @error="setError(player.error)"
      @loadedmetadata="setMetadata(true)"
      @pause="setPlaying(false)"
      @play="setPlaying(true)"
      @playing="setPlaying(true)"
      @progress="setBuffered(player.buffered)"
      @seeking="setCurrentTime(player.currentTime)"
      @stalled="setPlaying(false)"
      @timeupdate="setCurrentTime(player.currentTime)"
      @waiting="setPlaying(false)"
    />
    <controls v-if="controlsActive" />
    <directives />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { Player } from 'shaka-player'
import { inRange } from 'lodash'

export default {
  timers: {
    hideControls: { time: 4500, autostart: true }
  },

  components: {
    Controls: () => import('./controls/Container'),
    Directives: () => import('./controls/Directives')
  },

  props: {
    model: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      instance: null,
      controlsActive: true,
      events: [
        { key: 'playerTogglePlay', listener: 'togglePlay' },
        { key: 'playerSetTime', listener: 'overruleTime' },
        { key: 'playerEnterFullscreen', listener: 'enterFullscreen' },
        { key: 'playerExitFullscreen', listener: 'exitFullscreen' },
        { key: 'playerToggleFullscreen', listener: 'toggleFullscreen' }
      ],
      settings: {
        streaming: {
          rebufferingGoal: 2,
          bufferingGoal: 10,
          bufferBehind: 30,
          jumpLargeGaps: true,
          ignoreTextStreamFailures: true,
          alwaysStreamText: true
        }
      }
    }
  },

  computed: {
    ...mapState('player', [
      'ready'
    ]),

    element () {
      return this.$refs.element
    },

    player () {
      return this.$refs.instance
    }
  },

  created () {
    // Start listen for events
    for (const event of this.events) {
      this.$root.$on(event.key, this[event.listener])
    }
  },

  async beforeDestroy () {
    // Pause playback
    await this.player.pause()

    this.hideControls()

    // Stop listen for events
    for (const event of this.events) {
      this.$root.$off(event.key, this[event.listener])
    }

    if (this.instance) {
      await this.instance.detach()
      await this.instance.destroy()
    }

    // Reset store
    this.reset()
  },

  async mounted () {
    await this.initPlayer()
  },

  methods: {
    ...mapActions('player', [
      'initialize',
      'reset'
    ]),

    ...mapMutations('player', [
      'setBuffered',
      'setCurrentTime',
      'setDuration',
      'setEnded',
      'setError',
      'setMetadata',
      'setPlaying'
    ]),

    async initPlayer () {
      if (!Player.isBrowserSupported()) {
        alert('Browser is not supported.')
        return
      }

      this.instance = new Player(this.player)

      // Load player settings
      await this.instance.configure(this.settings)
      await this.instance.load(this.model.stream_url)

      // Add sprite track
      const spriteTrack = await this.instance.addTextTrack(
        this.model.sprite_url,
        'eng',
        'metadata',
        'text/vtt'
      )

      await this.instance.selectTextTrack(spriteTrack)

      // Initialize player store
      this.initialize({
        model: this.model,
        tracks: [
          { key: 'metadata-sprite', value: this.player.textTracks[0] }
        ]
      })
    },

    showControls () {
      this.controlsActive = true
      this.$timer.restart('hideControls')
    },

    hideControls () {
      this.controlsActive = false
    },

    overruleTime (value = 0) {
      // Restart control timer
      this.showControls()

      if (!inRange(value, 0, this.player.duration)) {
        return
      }

      this.player.currentTime = value
      this.setCurrentTime(value)
    },

    async enterFullscreen () {
      await this.$q.fullscreen.request(this.element)
    },

    async exitFullscreen () {
      await this.$q.fullscreen.exit(this.element)
    },

    async toggleFullscreen () {
      // Restart control timer
      this.showControls()

      // Toggle fullscreen
      await this.$q.fullscreen.toggle(this.element)
    },

    async autoPlay () {
      if (!this.player.paused || this.player.currentTime > 0) {
        return
      }

      // Restart control timer
      this.showControls()

      await this.player.play()
    },

    async togglePlay () {
      // Restart control timer
      this.showControls()

      // Resume/pause playback
      if (this.player.paused) {
        await this.player.play()
        return
      }

      await this.player.pause()
    }
  }
}
</script>
