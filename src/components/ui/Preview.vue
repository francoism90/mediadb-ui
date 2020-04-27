<template>
  <div
    class="preview"
    @mouseover.prevent="onHover"
    @mouseout.prevent="onHover"
    v-intersection="onIntersection"
  >
    <video
      ref="player"
      class="fit"
      preload="metadata"
      playsinline
      loop
      muted
      disableRemotePlayback
      :poster="poster"
      :src="src"
    />
      <source ref="source" :src="src" :type="mimetype" />
  </div>
</template>

<script>
export default {
  props: {
    poster: {
      type: String,
      default: null
    },

    src: {
      type: String,
      default: null
    },

    mimetype: {
      type: String,
      default: 'video/mp4'
    }
  },

  computed: {
    player () {
      return this.$refs.player
    },

    source () {
      return this.$refs.source
    }
  },

  beforeDestroy () {
    this.player.pause()
  },

  methods: {
    onHover () {
      if (this.$q.screen.lt.md) {
        return
      }

      this.playPreview()
    },

    onIntersection (entry) {
      if (this.$q.screen.gt.xs) {
        return
      }

      if (entry.isIntersecting) {
        setTimeout(() => {
          this.playPreview()
        }, 3000)
      } else {
        this.player.pause()
      }
    },

    playPreview () {
      if (this.player.readyState > 2 && this.player.paused === true) {
        this.player.play()
      } else {
        this.player.pause()
      }
    }
  }
}
</script>
