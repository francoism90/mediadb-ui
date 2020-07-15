<template>
  <div
    v-touch-pan.horizontal.prevent="onTouch"
    @mouseover="showPreview = true"
    @mouseout="showPreview = false"
  >
    <template v-if="!showPreview">
      <q-img
        :alt="name"
        :src="poster"
        :ratio="1"
        placeholder-src="~assets/placeholders/320x480.png"
        position="0 0"
        width="100%"
        height="180px"
        loading="lazy"
      />
    </template>

    <template v-else>
      <video
        ref="player"
        :src="src"
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
      showPreview: false
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
