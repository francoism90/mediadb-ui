<template>
  <div
    v-if="!error"
    class="absolute-center player-playback"
  >
    <q-btn
      v-shortkey="['space']"
      dense
      round
      unelevated
      size="36px"
      text-color="white"
      :disable="isLoading"
      :loading="isLoading"
      :icon="paused ? 'o_play_arrow' : 'o_pause'"
      @click="togglePlay"
      @shortkey="togglePlay"
    />
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'player/getState',
  mutationType: 'player/setState'
})

export default {
  computed: {
    ...mapFields({
      buffered: 'data.buffered',
      error: 'data.error',
      metadata: 'data.metadata',
      paused: 'data.paused',
      play: 'data.play',
      waiting: 'data.waiting'
    }),

    isLoading () {
      return !this.buffered || !this.metadata || this.waiting
    }
  },

  methods: {
    togglePlay () {
      this.play = !this.play
    }
  }
}
</script>
