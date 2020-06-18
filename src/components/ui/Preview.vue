<template>
  <div
    class="preview"
    @mouseover="showPreview = true"
    @mouseout="showPreview = false"
    v-touch-pan.horizontal.prevent="onTouch"
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
    }
  },

  beforeDestroy () {
    if (this.player) {
      this.player.pause()
    }
  },

  methods: {
    onTouch () {
      if (this.$q.screen.lt.md) {
        this.showPreview = true
      }
    }
  }
}
</script>
