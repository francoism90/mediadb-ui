<template>
  <div
    ref="container"
    v-touch-repeat.mouse="handleRepeat"
    class="absolute fit player-directives"
  />
</template>

<script>
import { mapState } from 'vuex'
import { dom } from 'quasar'
import { inRange } from 'lodash'

export default {
  computed: {
    ...mapState('player', [
      'currentTime',
      'duration'
    ])
  },

  methods: {
    handleRepeat ({ evt, ...info }) {
      const containerWidth = dom.width(this.$refs.container)

      this.togglePlayback(containerWidth, info.position.left)
      this.toggleSeek(containerWidth, info.position.left)
    },

    togglePlayback (containerWidth = 0, offsetLeft = 0) {
      const center = containerWidth / 2
      const centerMargin = center / 2

      if (inRange(offsetLeft, center - centerMargin, center + centerMargin)) {
        this.$root.$emit('playerTogglePlay')
      }
    },

    toggleSeek (containerWidth = 0, offsetLeft = 0) {
      const seekMargin = containerWidth / 4

      // Left/right side
      if (inRange(offsetLeft, 0, seekMargin)) {
        this.$root.$emit('playerSetTime', this.currentTime - 10)
      } else if (inRange(offsetLeft, containerWidth - seekMargin, containerWidth)) {
        this.$root.$emit('playerSetTime', this.currentTime + 10)
      }
    }
  }
}
</script>
