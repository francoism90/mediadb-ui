<template>
  <div
    ref="element"
    class="fixed-full player"
    @mousemove="showControls"
    @touchmove="showControls"
  >
    <video
      ref="player"
      class="absolute-center fit player-video"
      :class="{ 'fit': $q.fullscreen.isActive }"
      playsinline
      preload="metadata"
      autoPictureInPicture
      :height="video.height || 360"
      :width="video.width || 480"
      @canplay="playable = true"
      @durationchange="duration = player.duration"
      @ended="ended = true"
      @error="errored = true"
      @pause="playing = false"
      @play="playing = true"
      @playing="playing = true"
      @progress="buffered = player.buffered"
      @seeking="currentTime = player.currentTime"
      @stalled="playing = false"
      @timeupdate="currentTime = player.currentTime"
      @waiting="playing = false"
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
        v-show="controls"
        class="absolute-full player-controls"
        :from-route="fromRoute"
        :video="video"
        :buffered="buffered"
        :current-time="currentTime"
        :duration="duration"
        :ended="ended"
        :playable="playable"
        :playing="playing"
        :text-tracks="textTracks"
      />
    </transition>
  </div>
</template>

<script>
import { Player } from 'shaka-player'
import { get, inRange } from 'lodash'
import VideoModel from 'src/models/Video'

export default {
  timers: {
    hideControls: { time: 5000, autostart: true }
  },

  components: {
    Controls: () => import('components/watch/Controls')
  },

  props: {
    fromRoute: {
      type: Object,
      default: () => {
        return {
          name: 'home'
        }
      }
    },

    toRoute: {
      type: Object,
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
      controls: true,
      events: [
        { name: 'setCurrentTime', listener: 'setCurrentTime' },
        { name: 'setFrameshot', listener: 'setFrameshot' },
        { name: 'setTextTracks', listener: 'setTextTracks' },
        { name: 'toggleFullscreen', listener: 'toggleFullscreen' },
        { name: 'togglePlayback', listener: 'togglePlayback' }
      ],
      settings: {
        streaming: {
          jumpLargeGaps: true,
          ignoreTextStreamFailures: true
        }
      },
      buffered: null,
      currentTime: 0,
      duration: 0,
      ended: false,
      errored: false,
      playable: false,
      playing: false
    }
  },

  computed: {
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
    }
  },

  watch: {
    toRoute: function (value) {
      this.setStartTime(value)
    }
  },

  async mounted () {
    if (!Player.isBrowserSupported()) {
      alert('Browser is not supported.')
      return
    }

    this.instance = new Player(this.player)

    await this.instance.configure(this.settings)
    await this.instance.load(this.video.stream_url)

    this.setStartTime(this.toRoute)

    for (const event of this.events) {
      this.$root.$on(event.name, this[event.listener])
    }
  },

  async beforeDestroy () {
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
      this.controls = true
      this.$timer.restart('hideControls')
    },

    hideControls () {
      this.controls = false
    },

    setStartTime (route = {}) {
      const timecode = get(route, 'query.time')

      if (timecode) {
        this.player.currentTime = timecode
      }
    },

    setCurrentTime (value = 0) {
      this.showControls()

      if (!inRange(value, 0, this.player.duration)) {
        return
      }

      this.player.currentTime = value
    },

    setTextTracks (tracks = []) {
      for (const textTrack of this.textTracks) {
        const showTrack = tracks.includes(textTrack.id)

        textTrack.mode = showTrack ? 'showing' : 'hidden'
      }
    },

    async setFrameshot (value = 0) {
      if (!inRange(value, 0, this.player.duration)) {
        return
      }

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
      this.showControls()

      await this.$q.fullscreen.toggle(this.element)
    },

    async togglePlayback () {
      this.showControls()

      if (this.playable && !this.playing) {
        await this.player.play()
        return
      }

      await this.player.pause()
    }
  }
}
</script>
