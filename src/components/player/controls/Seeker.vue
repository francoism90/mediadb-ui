<template>
  <div
    v-if="data && model"
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
    },

    model: {
      type: Object,
      required: true
    },

    tracks: {
      type: Array,
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
    ...mapActions('player', [
      'callback'
    ]),

    getTimeByPct (percent = 0) {
      return this.data.duration * (percent / 100)
    },

    setTrackCue (percent = 0) {
      const tracks = this.tracks['metadata-sprite']

      const cues = tracks.cues || null
      const time = Math.floor(this.getTimeByPct(percent))

      if (!tracks || !cues) {
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
