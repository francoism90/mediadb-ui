<template>
  <div
    ref="container"
    class="player-container relative-position window-height window-width overflow-hidden"
    @mousemove="showControls"
    @touchmove="showControls"
  >
    <video
      ref="player"
      crossorigin="use-credentials"
      playsinline
      preload="metadata"
      autoPictureInPicture
      class="relative-position"
      :height="model.height || 480"
      :width="model.width || 320"
      @loadedmetadata="setMetadata"
      @durationchange="setMetadata"
      @canplay="setPlayable"
      @error="setFailed"
      @ended="setEnded"
      @pause="setPaused"
      @play="setPlaying"
      @playing="setPlaying"
      @progress="setMetadata"
      @ratechange="setPlaybackRate"
      @seeked="setCurrentTime"
      @stalled="setStalled"
      @timeupdate="setCurrentTime"
      @waiting="setStalled"
    >
      <track
        v-for="(track, index) in model.tracks"
        :id="track.id"
        :key="index"
        :kind="track.kind"
        :label="track.name"
        :srclang="track.locale || 'en'"
        :src="track.download_url"
      >
    </video>

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <controls v-show="controls" />
    </transition>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { Player } from 'shaka-player'
import { clamp } from 'lodash'

const { mapFields } = createHelpers({
  getterType: 'player/getState',
  mutationType: 'player/setState'
})

export default {
  components: {
    Controls: () => import('components/player/Controls')
  },

  timers: {
    hideControls: { time: 2000, autostart: true }
  },

  data () {
    return {
      instance: null,
      controls: true,
      shakaSettings: {
        streaming: {
          jumpLargeGaps: true,
          ignoreTextStreamFailures: true
        }
      }
    }
  },

  computed: {
    ...mapFields([
      'buffered',
      'currentTime',
      'duration',
      'failed',
      'metadata',
      'model',
      'paused',
      'playable',
      'playing',
      'playbackRate',
      'requestFullscreen',
      'requestPlayback',
      'requestRate',
      'requestTracks',
      'requestTime',
      'textTracks',
      'waiting'
    ]),

    container () {
      return this.$refs.container
    },

    player () {
      return this.$refs.player
    }
  },

  watch: {
    requestFullscreen (payload = false) {
      this.setFullscreen(payload)
      this.showControls()
    },

    requestPlayback (payload = false) {
      this.togglePlayback(payload)
      this.showControls()
    },

    requestRate (payload = 1.0) {
      this.setRate(payload)
      this.showControls()
    },

    requestTime (payload = 0) {
      this.setTime(payload)
      this.showControls()
    },

    requestTracks (payload = []) {
      this.setTracks(payload)
      this.showControls()
    }
  },

  async mounted () {
    if (!Player.isBrowserSupported()) {
      alert('Browser is not supported.')
      return
    }

    try {
      this.instance = new Player(this.player)

      await this.instance.configure(this.shakaSettings)
      await this.instance.load(this.model.stream_url)

      this.setRate(this.requestRate)
      this.setTime(this.requestTime)
      this.setTracks(this.requestTracks)
    } catch (e) {
      console.error('Error code', e.code, 'object', e)
    }
  },

  async beforeDestroy () {
    if (this.instance) {
      await this.instance.detach()
      await this.instance.destroy()
    }
  },

  methods: {
    hideControls () {
      this.controls = false
    },

    showControls () {
      this.controls = true
      this.$timer.restart('hideControls')
    },

    setMetadata () {
      this.buffered = this.player.buffered
      this.duration = this.player.duration
      this.textTracks = this.player.textTracks
    },

    setCurrentTime () {
      this.currentTime = this.player.currentTime
    },

    setEnded () {
      this.failed = this.waiting = false
      this.playing = false
    },

    setFullscreen (value) {
      if (!this.$q.fullscreen.isCapable) {
        alert('Fullscreen is not supported')
        return
      }

      this.$q.fullscreen.toggle(this.container)
    },

    setFailed () {
      this.failed = true
      this.playable = false
    },

    setPaused () {
      this.playing = false
    },

    setPlayable () {
      this.failed = this.waiting = false
      this.playable = true
    },

    setPlaying () {
      this.playing = true
    },

    setPlaybackRate () {
      this.playbackRate = this.player.playbackRate
    },

    setRate (value) {
      this.player.playbackRate = clamp(value, 0.25, 2)
    },

    setStalled () {
      this.waiting = true
    },

    setTime (value = 0) {
      this.player.currentTime = clamp(value, 0, this.duration)
    },

    setTracks (value = []) {
      const playerTracks = this.player.textTracks || []

      for (const playerTrack of playerTracks) {
        const activeTrack = value.includes(playerTrack.id)

        playerTrack.mode = activeTrack ? 'showing' : 'hidden'
      }
    },

    togglePlayback (value) {
      if (value && this.player.paused === true) {
        this.player.play()
        return
      }

      this.player.pause()
    }
  }
}
</script>
