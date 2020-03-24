<template>
  <div :style="cssVars" class="player-controls q-px-md">
    <q-slider
      v-model="step"
      :min="0.0"
      :max="data.duration"
      :step="0"
      dark
      dense
      color="primary"
    />

    <div class="row items-center no-wrap q-mb-sm">
      <div class="col">
        <q-btn
          flat
          dense
          color="white"
          :icon="playbackIcon"
          @click="callback({ type: 'togglePlay' })"
        />

        <q-btn
          flat
          dense
          color="white"
          @click="callback({ type: 'toggleMute' })"
          :icon="data.volume <= 0 ? 'volume_off' : 'volume_up'"
        />

        <span class="q-px-sm text-white">
          {{ Number(data.current) | timestamp }} / {{ Number(data.duration) | timestamp }}
        </span>
      </div>

      <div class="col-auto">
        <q-btn
          flat
          dense
          color="white"
          @click="callback({ type: 'toggleFullscreen' })"
          icon="settings"
        />

        <q-btn
          flat
          dense
          color="white"
          @click="callback({ type: 'toggleFullscreen' })"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('player', {
      data: 'getData'
    }),

    cssVars () {
      return {
        '--buffered': `${this.buffered}%`,
        '--buffer': `${this.buffer}%`
      }
    },

    buffered () {
      const buffered = this.data.buffered
      const duration = this.data.duration

      if (!buffered || !buffered.length) {
        return 0
      }

      const r = buffered
      r.start(0)

      const end = r.end(0)

      return Math.round((end / duration) * 100)
    },

    buffer () {
      return Math.round(100 - this.buffered)
    },

    step: {
      get () {
        return this.data.current
      },

      set (value) {
        this.$store.dispatch('player/callback', {
          type: 'currentTime',
          value: value
        })
      }
    },

    playbackIcon () {
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
