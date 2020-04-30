<template>
  <div
    class="preview"
    @mouseover.prevent="onHover"
    @mouseout.prevent="onHover"
    v-intersection="onIntersection"
  >
    <template v-if="!showPreview">
      <q-img
        :src="poster"
        width="100%"
        height="100%"
        loading="lazy"
        spinner-color="white"
      />
    </template>

    <template v-else>
      <video
        ref="player"
        :src="src"
        class="fit"
        autoplay
        playsinline
        muted
        disableRemotePlayback
        @abort="showPreview = false"
        @ended="showPreview = false"
      />
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showPreview: false
    }
  },

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
    if (this.player) {
      this.player.pause()
    }
  },

  methods: {
    onHover () {
      if (this.$q.screen.gt.xs) {
        setTimeout(() => {
          this.showPreview = true
        }, 100)
      }
    },

    onIntersection (entry) {
      if (entry.isIntersecting && this.$q.screen.lt.md) {
        setTimeout(() => {
          this.showPreview = true
        }, 3000)
      }
    }
  }
}
</script>
