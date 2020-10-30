<template>
  <div
    v-if="!error"
    class="absolute-center container fluid player-playback"
  >
    <div class="row no-wrap">
      <q-btn
        v-shortkey="['arrowleft']"
        flat
        dense
        size="24px"
        color="white"
        icon="o_replay_10"
        :disable="isLoading"
        @click="replay"
        @shortkey="replay"
      />

      <q-btn
        v-shortkey="['space']"
        dense
        size="36px"
        text-color="white"
        :icon="paused ? 'o_play_arrow' : 'o_pause'"
        :disable="isLoading"
        :loading="isLoading"
        @click="togglePlay"
        @shortkey="togglePlay"
      />

      <q-btn
        v-shortkey="['arrowright']"
        flat
        dense
        size="24px"
        color="white"
        icon="o_forward_10"
        :disable="isLoading"
        @click="forward"
        @shortkey="forward"
      />
    </div>
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
      currentTime: 'data.currentTime',
      error: 'data.error',
      metadata: 'data.metadata',
      paused: 'data.paused',
      play: 'data.play',
      seekTime: 'data.seekTime',
      waiting: 'data.waiting'
    }),

    isLoading () {
      return !this.buffered || !this.metadata || this.waiting
    }
  },

  methods: {
    replay () {
      this.seekTime = this.currentTime - 10
    },

    forward () {
      this.seekTime = this.currentTime + 10
    },

    togglePlay () {
      this.play = !!this.paused
    }
  }
}
</script>
