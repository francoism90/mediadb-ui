<template>
  <div
    ref="element"
    class="relative-position window-height player"
    :class="$q.fullscreen.isActive ? 'fullscreen' : null"
    @mouseleave="hideControls"
    @mousemove="showControls"
    @mouseover="showControls"
    @touchmove="showControls"
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
    >
      <track
        id="sprite"
        default
        kind="metadata"
        srclang="en"
        :src="model.sprite_url"
      >

      <track
        v-for="(track, index) in model.tracks"
        :id="track.uuid"
        :key="index"
        :kind="track.type || 'subtitles'"
        :label="track.name"
        :srclang="track.language || 'en'"
        :src="track.download_url"
      >
    </video>

    <transition name="fade">
      <controls
        v-if="controlsActive"
        key="playerControls"
      />
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { Player } from 'shaka-player'
import { inRange } from 'lodash'

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('video/player')

export default {
  timers: {
    hideControls: { time: 4500, autostart: true }
  },

  components: {
    Controls: () => import('components/player/Controls')
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
        { key: 'videoSetTime', listener: 'overruleTime' },
        { key: 'videoShowTracks', listener: 'showTracks' },
        { key: 'videoToggleFullscreen', listener: 'toggleFullscreen' },
        { key: 'videoTogglePlay', listener: 'togglePlay' }
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
    ...mapState([
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
    for (const event of this.events) {
      this.$root.$on(event.key, this[event.listener])
    }
  },

  async beforeDestroy () {
    // Stop listen for events
    for (const event of this.events) {
      this.$root.$off(event.key, this[event.listener])
    }

    // Destroy player
    if (this.instance) {
      await this.instance.detach()
      await this.instance.destroy()
    }

    this.resetState()
  },

  mounted () {
    this.createPlayer()
  },

  methods: {
    ...mapActions([
      'resetState',
      'setPlayer'
    ]),

    ...mapMutations([
      'setBuffered',
      'setCurrentTime',
      'setDuration',
      'setEnded',
      'setError',
      'setMetadata',
      'setPlaying',
      'setTracks'
    ]),

    async createPlayer () {
      if (!Player.isBrowserSupported()) {
        alert('Browser is not supported.')
        return
      }

      this.instance = new Player(this.player)

      await this.instance.configure(this.settings)
      await this.instance.load(this.model.stream_url)

      this.setPlayer({ tracks: this.player.textTracks })
    },

    showControls () {
      this.controlsActive = true
      this.$timer.restart('hideControls')
    },

    hideControls () {
      this.controlsActive = false
    },

    overruleTime (value = 0) {
      this.showControls()

      if (!inRange(value, 0, this.player.duration)) {
        return
      }

      this.player.currentTime = value
      this.setCurrentTime(value)
    },

    async toggleFullscreen () {
      this.showControls()

      await this.$q.fullscreen.toggle(this.element)
    },

    async autoPlay () {
      if (!this.player.paused || this.player.currentTime > 0) {
        return
      }

      this.showControls()

      await this.player.play()
    },

    async togglePlay () {
      this.showControls()

      if (this.player.paused) {
        await this.player.play()
        return
      }

      await this.player.pause()
    },

    async showTracks (tracks = []) {
      const textTracks = this.player.textTracks

      for (const textTrack of textTracks) {
        const showTrack = tracks.includes(textTrack.id)

        textTrack.mode = showTrack ? 'showing' : 'hidden'
      }

      this.setTracks(this.player.textTracks)
    }
  }
}
</script>
