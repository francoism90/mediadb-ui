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
        loading="lazy"
        class="no-border fit"
      />
    </template>

    <template v-else>
      <video
        ref="player"
        :src="src"
        class="no-border fit"
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
