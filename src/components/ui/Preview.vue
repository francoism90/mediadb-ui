<template>
  <div
    v-touch-pan.horizontal.prevent="handleSwipe"
    @mouseover="showPreview = true"
    @mouseout="showPreview = false"
  >
    <template v-if="!showPreview">
      <q-img
        :alt="name"
        :src="poster"
        :ratio="1"
        img-class="item-cover"
        placeholder-src="~assets/placeholders/320x480.png"
        width="100%"
        height="180px"
        loading="lazy"
      />
    </template>

    <template v-else>
      <video
        ref="player"
        :src="src"
        class="item-cover"
        autoplay
        playsinline
        muted
        disablePictureInPicture
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
    handleSwipe ({ evt, ...info }) {
      this.showPreview = true
    }
  }
}
</script>
