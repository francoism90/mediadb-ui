<template>
  <video
    ref="player"
    class="absolute-center fit player-video"
    crossorigin="use-credentials"
    playsinline
    preload="metadata"
    autoPictureInPicture
    :height="model.height || 360"
    :width="model.width || 480"
    @canplay="initialize"
    @durationchange="duration = player.duration"
    @ended="paused = true"
    @error="failed = true"
    @emptied="failed = true"
    @loadedmetadata="metadata = true"
    @pause="paused = player.paused"
    @play="paused = player.paused"
    @playing="paused = player.paused"
    @progress="buffered = player.buffered"
    @seeking="currentTime = player.currentTime"
    @stalled="waiting = true"
    @timeupdate="currentTime = player.currentTime"
    @waiting="waiting = true"
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
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { clamp } from 'lodash'
import { Player } from 'shaka-player'

const { mapFields } = createHelpers({
  getterType: 'player/getState',
  mutationType: 'player/setState'
})

export default {
  data () {
    return {
      initialized: false,
      instance: null,
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
      'playback',
      'playbackRate',
      'seekTime',
      'textTracks',
      'waiting'
    ]),

    player () {
      return this.$refs.player
    }
  },

  watch: {
    playback () {
      this.togglePlayback()
    },

    playbackRate (value) {
      this.setPlaybackRate(value)
    },

    seekTime (value) {
      this.setCurrentTime(value)
    },

    textTracks (value) {
      this.setTextTracks(value)
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
    async initialize () {
      this.setPlayable()

      try {
        if (this.initialized) {
          return
        }

        this.setCurrentTime(this.seekTime)
        this.setPlaybackRate(this.playbackRate)
        this.setTextTracks(this.textTracks)

        await this.player.play()
      } catch {
        console.error('Unable to initialize player')
      } finally {
        this.initialized = true
      }
    },

    async togglePlayback () {
      try {
        if (this.player.paused) {
          await this.player.play()
        } else {
          await this.player.pause()
        }
      } catch {
        console.error('Unable to set playback')
      }
    },

    setPlayable () {
      this.playable = true
      this.failed = this.waiting = false
    },

    setCurrentTime (value = 0) {
      this.player.currentTime = clamp(value, 0, this.duration)
    },

    setPlaybackRate (value = 0) {
      this.player.playbackRate = clamp(value, 0.25, 2)
    },

    setTextTracks (tracks = []) {
      const playerTracks = this.player.textTracks || []

      for (const playerTrack of playerTracks) {
        const activeTrack = tracks.includes(playerTrack.id)

        playerTrack.mode = activeTrack ? 'showing' : 'hidden'
      }
    }
  }
}
</script>
