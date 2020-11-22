<template>
  <div
    class="fixed-full player"
    @mousemove="showControls"
    @touchmove="showControls"
  >
    <instance />

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <controls v-show="controls" />
    </transition>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'player/getState',
  mutationType: 'player/setState'
})

export default {
  timers: {
    hideControls: { time: 2000, autostart: true }
  },

  components: {
    Instance: () => import('components/player/Instance'),
    Controls: () => import('components/player/Controls')
  },

  computed: {
    ...mapFields([
      'controls',
      'fullscreen'
    ])
  },

  watch: {
    fullscreen (value) {
      this.setFullscreen(value)
    }
  },

  beforeDestroy () {
    this.setFullscreen(false)
  },

  methods: {
    async setFullscreen (payload = false) {
      if (!this.$q.fullscreen.isCapable) {
        alert('Fullscreen is not supported')
        return
      }

      try {
        if (payload === true) {
          await this.$q.fullscreen.request()
        } else {
          await this.$q.fullscreen.exit()
        }
      } catch {
        console.error('Unable to toggle fullscreen')
      }
    },

    showControls () {
      this.controls = true
      this.$timer.restart('hideControls')
    },

    hideControls () {
      this.controls = false
    }
  }
}
</script>
