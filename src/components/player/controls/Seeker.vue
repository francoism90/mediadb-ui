<template>
  <div
    class="player-seeker"
    :style="cssVars"
  >
    <div
      v-show="seekerHover"
      class="player-tooltip desktop-only"
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
        :max="duration"
        :step="0"
        dark
        dense
        color="primary"
      />
    </div>
  </div>
</template>

<script>
import { find } from 'lodash'
import { dom } from 'quasar'

export default {
  props: {
    buffered: {
      type: TimeRanges,
      default: null
    },

    currentTime: {
      type: Number,
      default: 0
    },

    duration: {
      type: Number,
      default: 0
    },

    tracks: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      activeCue: { url: '', x: 0, y: 0 },
      seekerHover: false,
      seekerHoverPercent: 0,
      seekerHoverPosition: 0
    }
  },

  computed: {
    cssVars () {
      return {
        '--buffered': `${this.bufferedPct}%`,
        '--buffer': `${this.bufferPct}%`
      }
    },

    bufferedPct () {
      const buffered = this.buffered
      const duration = this.duration

      if (!buffered || !buffered.length) {
        return 0
      }

      const r = buffered
      r.start(0)

      const end = r.end(0)

      return Math.round((end / duration) * 100)
    },

    bufferPct () {
      return Math.round(100 - this.bufferedPct)
    },

    step: {
      get () {
        return this.currentTime
      },

      set (value) {
        this.$root.$emit('playerSetTime', value)
      }
    },

    tooltipMargin () {
      if (this.seekerHoverPercent <= 5) {
        return 0
      }

      if (this.seekerHoverPercent >= 95) {
        return '0 0 0 auto'
      }

      return `0 ${this.seekerHoverPosition - 80}px`
    },

    tooltip () {
      return {
        backgroundImage: `url(${this.activeCue.url})`,
        backgroundPosition: `-${this.activeCue.x}px -${this.activeCue.y}px`,
        margin: this.tooltipMargin
      }
    }
  },

  methods: {
    getTimeByPct (percent = 0) {
      return this.duration * (percent / 100)
    },

    setTrackCue (percent = 0) {
      const track = find(this.tracks, { id: 'sprite' })
      const cues = track.cues || null
      const time = Math.floor(this.getTimeByPct(percent))

      if (!track || !cues) {
        return
      }

      for (const cue in cues) {
        const vttCue = cues[cue]

        if (!vttCue.startTime || !vttCue.endTime || !vttCue.text) {
          continue
        }

        if (vttCue.startTime >= time && time <= vttCue.endTime) {
          const metadata = JSON.parse(vttCue.text)

          this.activeCue = {
            url: metadata.url,
            x: metadata.x,
            y: metadata.y
          }
          break
        }
      }
    },

    onSeekerHover (event) {
      const seekerWidth = dom.width(this.$refs.seeker)
      const seekerOffset = dom.offset(this.$refs.seeker)
      const position = event.clientX - seekerOffset.left
      const percent = (position) / seekerWidth * 100

      this.setTrackCue(percent)

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
