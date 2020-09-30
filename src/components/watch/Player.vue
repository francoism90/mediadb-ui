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
        @error="errored = true"
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
          :kind="track.type || 'subtitles'"
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
        <controls
          v-if="controlsActive"
          :video="video"
          :buffered="buffered"
          :current-time="currentTime"
          :duration="duration"
          :errored="errored"
          :metadata="metadata"
          :paused="paused"
          :text-tracks="textTracks"
          :waiting="waiting"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { get, inRange } from 'lodash'
import { createHelpers } from 'vuex-map-fields'
import { Player } from 'shaka-player'
import VideoModel from 'src/models/Video'

const { mapFields } = createHelpers({
  getterType: 'session/getDataField',
  mutationType: 'session/updateDataField'
})

export default {
  timers: {
    hideControls: { time: 2000, autostart: true }
  },

  components: {
    Controls: () => import('components/watch/Controls')
  },

  props: {
    timecode: {
      type: Number,
      default: null
    },

    video: {
      type: VideoModel,
      required: true
    }
  },

  data () {
    return {
      instance: null,
      controlsActive: true,
      settingsInterval: null,
      buffered: null,
      currentTime: 0,
      duration: 0,
      errored: false,
      metadata: false,
      paused: true,
      waiting: true,
      events: [
        { name: 'setCurrentTime', listener: 'setCurrentTime' },
        { name: 'setFrameshot', listener: 'setFrameshot' },
        { name: 'setPlaybackRate', listener: 'setPlaybackRate' },
        { name: 'setTextTracks', listener: 'setTextTracks' },
        { name: 'hideControls', listener: 'hideControls' },
        { name: 'showControls', listener: 'showControls' },
        { name: 'toggleFullscreen', listener: 'toggleFullscreen' },
        { name: 'togglePlayback', listener: 'togglePlayback' }
      ],
      settings: {
        streaming: {
          bufferingGoal: 30,
          jumpLargeGaps: true,
          ignoreTextStreamFailures: true
        }
      }
    }
  },

  computed: {
    ...mapFields({
      playbackRate: 'video.playbackRate',
      videoSettings: 'video.settings'
    }),

    element () {
      return this.$refs.element
    },

    player () {
      return this.$refs.player
    },

    textTracks () {
      if ((!this.instance || !this.player) || !this.player.textTracks) {
        return null
      }

      return this.player.textTracks
    },

    currentSettings () {
      return this.videoSettings[this.video.id] || {}
    },

    startTime () {
      return get(this.currentSettings, 'timecode', 0)
    }
  },

  async mounted () {
    try {
      if (!Player.isBrowserSupported()) {
        alert('Browser is not supported.')
        return
      }

      this.instance = new Player(this.player)

      await this.instance.configure(this.settings)
      await this.instance.load(this.video.stream_url)

      this.setCurrentTime(this.timecode || this.startTime)
      this.setPlaybackRate(this.playbackRate)

      for (const event of this.events) {
        this.$root.$on(event.name, this[event.listener])
      }

      this.settingsInterval = setInterval(() => this.setSettings(), 1000)
    } catch {
      this.$q.notify({
        progress: true,
        position: 'top',
        message: 'Unable to load video',
        type: 'negative'
      })
    }
  },

  async beforeDestroy () {
    await this.$q.fullscreen.exit()

    clearInterval(this.settingsInterval)

    for (const event of this.events) {
      this.$root.$off(event.name, this[event.listener])
    }

    if (this.instance) {
      await this.instance.detach()
      await this.instance.destroy()
    }
  },

  methods: {
    showControls () {
      this.controlsActive = true
      this.$timer.restart('hideControls')
    },

    hideControls () {
      if (!this.metadata || this.waiting) {
        this.showControls()
        return
      }

      this.controlsActive = false
    },

    setCurrentTime (value = 0) {
      this.player.currentTime = value
    },

    setPlaybackRate (value = 0) {
      if (!inRange(value, 0.25, 2)) {
        return
      }

      this.showControls()
      this.player.playbackRate = value
    },

    setSettings () {
      if (this.errored || !this.metadata) {
        return
      }

      const settings = {
        [this.video.id]: {
          timecode: this.currentTime
          // tracks: this.tracks
        }
      }

      this.videoSettings = { ...this.videoSettings, ...settings }
    },

    setTextTracks (tracks = []) {
      for (const textTrack of this.textTracks) {
        const showTrack = tracks.includes(textTrack.id)

        textTrack.mode = showTrack ? 'showing' : 'hidden'
      }
    },

    async setFrameshot (value = 0) {
      await this.$axios.patch(`videos/${this.video.id}/frameshot`, {
        timecode: this.currentTime
      })

      this.$q.notify({
        progress: true,
        message: `${this.video.name} has been frameshot.`,
        type: 'positive'
      })
    },

    async toggleFullscreen () {
      await this.$q.fullscreen.toggle()
    },

    async togglePlayback () {
      if (!this.waiting && this.paused) {
        await this.player.play()
        return
      }

      await this.player.pause()
    }
  }
}
</script>
