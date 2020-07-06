<template>
  <div
    class="player-seeker"
    :style="cssVars"
  >
    <div
      v-if="seekerHover"
      class="player-tooltip"
      :style="tooltip"
    >
      <span class="q-py-xs q-px-sm text-caption bg-grey-11">
        {{ getTimeByPct(seekerHoverPercent) | timestamp }}
      </span>
    </div>

    <div
      ref="seeker"
      @mousemove="onSeekerHover"
      @mouseleave="onSeekerLeave"
    >
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
  </div>
</template>

<script>
import { dom } from 'quasar'
import { mapActions } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      seekerHover: false,
      seekerHoverPercent: 0,
      seekerHoverPosition: 0
    }
  },

  computed: {
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
        return this.data.currentTime
      },

      set (value) {
        this.callback({
          type: 'currentTime',
          value: value
        })
      }
    },

    tooltip () {
      return {
        marginLeft: (this.seekerHoverPosition - 80) + 'px' // width % 2
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

    onSeekerHover (event) {
      const seekerWidth = dom.width(this.$refs.seeker)
      const seekerOffset = dom.offset(this.$refs.seeker)
      const position = event.clientX - seekerOffset.left
      const percent = (position) / seekerWidth * 100

      this.seekerHoverPercent = percent
      this.seekerHoverPosition = position
      this.seekerHover = percent > 0
    },

    onSeekerLeave () {
      this.seekerHover = false
    }
  }
}
</script>
