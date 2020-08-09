<template>
  <div
    ref="element"
    class="relative-position window-height player"
    :class="$q.fullscreen.isActive ? 'fullscreen' : null"
    @mouseenter="showControls()"
    @mousemove="showControls()"
    @mouseleave="hideControls()"
  >
    <video
      ref="instance"
      class="absolute fit"
      playsinline
      preload="auto"
      :poster="model.thumbnail_url"
      :height="model.metadata.height || 360"
      :width="model.metadata.width || 480"
      @canplay="setPlayable(true)"
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
      playerSettings: {
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
    // Start event bus
    this.$root.$on('playerSetTime', this.setPlayerTime)
    this.$root.$on('playerToggleFullscreen', this.toggleFullscreen)
    this.$root.$on('playerTogglePlay', this.togglePlay)
  },

  async beforeDestroy () {
    if (this.instance) {
      await this.instance.unload()
      await this.instance.destroy()
    }

    // Stop event bus
    this.$root.$off('playerSetTime', this.setPlayerTime)
    this.$root.$off('playerToggleFullscreen', this.toggleFullscreen)
    this.$root.$off('playerTogglePlay', this.togglePlay)
  },

  async mounted () {
    await this.initPlayer()
  },

  methods: {
    ...mapActions('player', [
      'initialize'
    ]),

    ...mapMutations('player', [
      'setBuffered',
      'setCurrentTime',
      'setDuration',
      'setEnded',
      'setError',
      'setMetadata',
      'setPlayable',
      'setPlaying'
    ]),

    async initPlayer () {
      if (!Player.isBrowserSupported()) {
        alert('Browser is not supported')
      }

      this.instance = new Player(this.player)

      // Load player settings
      await this.instance.configure(this.playerSettings)
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

    setPlayerTime (value = 0) {
      if (!inRange(value, 0, this.player.duration)) {
        return
      }

      this.player.currentTime = value
      this.setCurrentTime(value)
    },

    toggleFullscreen () {
      this.$q.fullscreen.toggle(this.element)
    },

    async togglePlay () {
      if (this.player.paused) {
        await this.player.play()
        return
      }

      await this.player.pause()
    }
  }
}
</script>
