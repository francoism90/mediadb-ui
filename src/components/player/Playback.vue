<template>
  <div
    v-if="metadata && model"
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
        :disable="!playable"
        @click="replay"
        @shortkey="replay"
      />

      <q-btn
        v-shortkey="['space']"
        flat
        dense
        size="36px"
        text-color="white"
        :icon="paused ? 'o_play_arrow' : 'o_pause'"
        :disable="!playable"
        :loading="waiting"
        @click="togglePlayback"
        @shortkey="togglePlayback"
      />

      <q-btn
        v-shortkey="['arrowright']"
        flat
        dense
        size="24px"
        color="white"
        icon="o_forward_10"
        :disable="!playable"
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
    ...mapFields([
      'currentTime',
      'metadata',
      'model',
      'playback',
      'playable',
      'paused',
      'seekTime',
      'waiting'
    ])
  },

  methods: {
    replay () {
      this.seekTime = this.currentTime - 10
    },

    forward () {
      this.seekTime = this.currentTime + 10
    },

    togglePlayback () {
      this.playback = !this.playback
    }
  }
}
</script>
