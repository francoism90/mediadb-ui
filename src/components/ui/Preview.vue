<template>
  <div
    ref="element"
    v-touch-swipe.left.right="handleSwipe"
    @mouseover="showPreview"
    @mouseleave="hidePreview"
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
      v-show="previewActive"
      ref="instance"
      preload="metadata"
      muted
      playsinline
      disablePictureInPicture
      disableRemotePlayback
      width="100%"
      height="160px"
      class="absolute-center item-cover"
      @abort="hidePreview"
      @ended="hidePreview"
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
      previewActive: false,
      playerReady: false,
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
    await this.hidePreview()

    if (this.instance) {
      await this.instance.detach()
      await this.instance.destroy()
    }
  },

  methods: {
    handleSwipe ({ evt, ...info }) {
      this.showPreview()
    },

    async showPreview () {
      await this.setPlayer()

      if (!this.previewActive) {
        await this.player.play()

        this.previewActive = true
      }
    },

    async hidePreview () {
      await this.player.pause()

      this.previewActive = false
    },

    async setPlayer (showPreview = false) {
      if (!Player.isBrowserSupported()) {
        alert('Browser is not supported.')
        return
      }

      if (this.playerReady) {
        return
      }

      this.instance = new Player(this.player)

      await this.instance.configure(this.playerSettings)
      await this.instance.load(this.src)

      this.playerReady = true
    }
  }
}
</script>
