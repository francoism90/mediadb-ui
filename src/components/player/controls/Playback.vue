<template>
  <div class="playback">
    <q-btn
      flat
      dense
      color="white"
      :icon="playPauseIcon"
      @click="callback({ type: 'togglePlay' })"
    />

    <q-btn
      flat
      dense
      color="white"
      icon="replay_5"
      @click="callback({ type: 'rewind' })"
    />

    <q-btn
      flat
      dense
      color="white"
      icon="forward_5"
      @click="callback({ type: 'forward' })"
    />

    <span class="q-px-sm text-white">
      {{ Number(data.currentTime) | timestamp }} / {{ Number(data.duration) | timestamp }}
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    playPauseIcon () {
      if (this.data.readyState === 0 || this.data.ended || this.data.paused) {
        return 'play_arrow'
      }

      return 'pause'
    }
  },

  methods: {
    ...mapActions('player', [
      'callback'
    ])
  }
}
</script>
