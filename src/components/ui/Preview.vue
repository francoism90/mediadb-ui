<template>
  <div
    ref="element"
    v-touch-swipe.mouse.right="handleSwipe"
    @mouseover="startPreview"
    @mouseout="stopPreview"
  >
    <q-img
      :alt="name"
      :src="poster"
      :ratio="1"
      img-class="relative-position item-cover"
      position="100% 100%"
      placeholder-src="~assets/placeholders/320x480.png"
      width="100%"
      height="160px"
      loading="lazy"
    />

    <video
      v-show="previewShow"
      ref="instance"
      playsinline
      preload="metadata"
      width="100%"
      height="160px"
      class="absolute-center item-cover"
      muted
      disablePictureInPicture
      disableRemotePlayback
      @abort="stopPreview"
      @ended="stopPreview"
    />
  </div>
</template>

<script>
import { Player } from 'shaka-player'

export default {
  props: {
    name: {
      type: String,
      required: true
    },

    poster: {
      type: String,
      default: null
    },

    src: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      instance: null,
      previewShow: false,
      previewReady: false,
      playerSettings: {
        streaming: {
          rebufferingGoal: 2,
          bufferingGoal: 10,
          bufferBehind: 30,
          jumpLargeGaps: true,
          ignoreTextStreamFailures: true
        }
      }
    }
  },

  computed: {
    element () {
      return this.$refs.element
    },

    player () {
      return this.$refs.instance
    }
  },

  async beforeDestroy () {
    if (this.instance) {
      await this.instance.unload()
      await this.instance.destroy()
    }
  },

  methods: {
    async handleSwipe ({ evt, ...info }) {
      if (this.previewShow) {
        await this.stopPreview()
        return
      }
      await this.startPreview()
    },

    async startPreview () {
      // show player element
      this.previewShow = true

      // Init player
      await this.setPlayer()

      // Start playback
      await this.player.play()
    },

    async stopPreview () {
      // Pause playback
      await this.player.pause()

      // Hide player element
      this.previewShow = false
    },

    async setPlayer () {
      if (this.previewReady) {
        return
      }

      if (!Player.isBrowserSupported()) {
        alert('Browser is not supported')
      }

      this.instance = new Player(this.player)

      // Load player settings
      await this.instance.configure(this.playerSettings)
      await this.instance.load(this.src)

      this.previewReady = true
    }
  }
}
</script>
