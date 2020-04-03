<template>
  <div :style="cssVars" class="player-controls q-px-md">
    <div v-if="sliderHover" class="player-thumbnail" :style="tooltip">
      <span class="q-py-xs q-px-sm text-caption bg-black-2">
        {{ getTimeByPct(sliderHoverPercent) | timestamp }}
      </span>
    </div>

    <div ref="slider" @mousemove="onSliderHover" @mouseleave="onSliderLeave">
      <q-slider
        v-model="step"
        :min="0.0"
        :max="data.duration"
        :step="0"
        dark
        dense
        color="primary"
      />
    </div>

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
          icon="replay_10"
          @click="callback({ type: 'currentTime', value: data.current - 10 })"
        />

        <q-btn
          flat
          dense
          color="white"
          icon="forward_10"
          @click="callback({ type: 'currentTime', value: data.current + 10 })"
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
  data () {
    return {
      sliderHover: false,
      sliderHoverPercent: 0,
      sliderHoverPosition: 0
    }
  },

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
        this.callback({
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
    },

    tooltip () {
      return {
        marginLeft: (this.sliderHoverPosition - 80) + 'px' // width % 2
      }
    }
  },

  methods: {
    ...mapActions('player', [
      'callback'
    ]),

    getTimeByPct (percent = 0) {
      return this.data.duration * (percent / 100)
    },

    onSliderHover (event) {
      const sliderWidth = this.$refs.slider.clientWidth
      const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left
      const position = event.clientX - sliderOffsetLeft
      const percent = (position) / sliderWidth * 100

      // Set sliderHover
      this.sliderHoverPercent = percent
      this.sliderHoverPosition = position
      this.sliderHover = true
    },

    onSliderLeave () {
      this.sliderHover = false
    }
  }
}
</script>
