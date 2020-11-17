<template>
  <div class="fixed-full player">
    <div
      ref="element"
      @mousemove="showControls"
      @touchmove="showControls"
    >
      <video
        ref="player"
        class="absolute-center fit player-video"
        crossorigin="use-credentials"
        playsinline
        preload="metadata"
        autoPictureInPicture
        :height="video.height || 360"
        :width="video.width || 480"
        autoplay
        @canplay="waiting = false"
        @canplaythrough="waiting = false"
        @durationchange="duration = player.duration"
        @emptied="errored = true"
        @ended="paused = true"
        @error="error = true"
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
          v-for="(track, index) in video.tracks"
          :id="track.id"
          :key="index"
          :kind="track.collection || 'subtitles'"
          :label="track.name"
          :srclang="track.language || 'en'"
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
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { clamp, get } from 'lodash'
import { Player } from 'shaka-player'
import VideoModel from 'src/models/Video'

const { mapFields } = createHelpers({
  getterType: 'player/getState',
  mutationType: 'player/setState'
})

export default {
  timers: {
    hideControls: { time: 2000, autostart: true },
    setSettings: { time: 1500, autostart: true, repeat: true }
  },

  components: {
    Controls: () => import('components/watch/Controls')
  },

  props: {
    video: {
      type: VideoModel,
      required: true
    }
  },

  data () {
    return {
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
    ...mapFields({
      // captionLocale: 'captionLocale',
      // subtitleLocale: 'subtitleLocale',
      controls: 'controls',
      fullscreen: 'fullscreen',
      playbackRate: 'playbackRate',
      settings: 'settings',
      buffered: 'data.buffered',
      currentTime: 'data.currentTime',
      duration: 'data.duration',
      error: 'data.error',
      metadata: 'data.metadata',
      model: 'data.model',
      paused: 'data.paused',
      play: 'data.play',
      seekTime: 'data.seekTime',
      tracks: 'data.tracks',
      waiting: 'data.waiting'
    }),

    element () {
      return this.$refs.element
    },

    player () {
      return this.$refs.player
    },

    startTimecode () {
      return get(this.videoSettings, 'timecode', 0)
    },

    textTracks () {
      return get(this.videoSettings, 'textTracks', [])
    },

    videoSettings () {
      return this.settings[this.video.id] || {}
    }
  },

  watch: {
    fullscreen (value) {
      this.setFullscreen(value)
      this.showControls()
    },

    play (value) {
      this.setPlay(value)
      this.showControls()
    },

    playbackRate (value) {
      this.setPlaybackRate(value)
      this.showControls()
    },

    seekTime (value) {
      this.setCurrentTime(value)
      this.showControls()
    },

    tracks (value) {
      this.setTextTracks(value)
    }
  },

  created () {
    this.$store.dispatch('player/initialize', {
      model: this.video
    })
  },

  async mounted () {
    if (!Player.isBrowserSupported()) {
      alert('Browser is not supported.')
      return
    }

    try {
      this.instance = new Player(this.player)

      await this.instance.configure(this.shakaSettings)
      await this.instance.load(this.video.stream_url)

      this.setCurrentTime(this.startTimecode)
      this.setPlaybackRate(this.playbackRate)
      this.setTextTracks(this.textTracks)
    } catch (e) {
      console.error('Error code', e.code, 'object', e)
    }
  },

  async beforeDestroy () {
    await this.$q.fullscreen.exit()

    if (this.instance) {
      await this.instance.detach()
      await this.instance.destroy()
    }
  },

  methods: {
    showControls () {
      this.controls = true
      this.$timer.restart('hideControls')
    },

    hideControls () {
      this.controls = false
    },

    setCurrentTime (value = 0) {
      this.player.currentTime = clamp(value, 0, this.duration)
    },

    setPlaybackRate (value = 0) {
      this.player.playbackRate = clamp(value, 0.25, 2)
    },

    setSettings () {
      const videoSettings = {
        [this.video.id]: {
          timecode: this.currentTime,
          textTracks: this.tracks
        }
      }

      this.settings = { ...this.settings, ...videoSettings }
    },

    setTextTracks () {
      const playerTextTracks = this.player.textTracks || null

      for (const textTrack of playerTextTracks) {
        const showTrack = this.tracks.includes(textTrack.id)

        textTrack.mode = showTrack ? 'showing' : 'hidden'
      }
    },

    async setFullscreen (payload = false) {
      try {
        if (!payload) {
          await this.$q.fullscreen.exit()
          return
        }

        await this.$q.fullscreen.request()
      } catch {
        console.error('Unable to enter fullscreen')
      }
    },

    async setPlay (payload = false) {
      try {
        if (!payload) {
          await this.player.pause()
          return
        }

        await this.player.play()
      } catch {
        console.error('Unable to set playing state')
      }
    }
  }
}
</script>
