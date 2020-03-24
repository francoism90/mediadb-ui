<template>
  <div @mouseover.prevent="onHover" @mouseout.prevent="onHover">
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
      @contextmenu.prevent
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
      if (this.player.readyState > 2 && this.player.paused === true) {
        this.player.play()
      } else {
        this.player.pause()
      }
    }
  }
}
</script>
