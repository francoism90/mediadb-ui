<template>
  <div
    v-if="metadata && model"
    class="player-element"
  >
    <q-img
      v-if="seekerHover"
      :position="tooltipPosition"
      :style="tooltipStyle"
      :src="model.sprite_url"
      class="player-tooltip"
      img-class="player-frame"
      height="90px"
      width="160px"
    >
      <div class="absolute-bottom text-center">
        <span class="q-py-xs q-px-sm text-caption text-white transparent-4">
          {{ seekerFrameTime | timestamp }}
        </span>
      </div>
    </q-img>

    <div class="full-width row no-wrap justify-between items-center content-center q-pt-sm">
      <div class="col">
        {{ currentTime | timestamp }}
      </div>

      <div class="col-auto">
        {{ duration | timestamp }}
      </div>
    </div>

    <div
      ref="seeker"
      class="player-seeker"
      @mousemove="onSeekerHover"
      @mouseleave="onSeekerLeave"
    >
      <q-slider
        v-model="seeker"
        :style="bufferedStyle"
        :min="0.0"
        :max="duration"
        :step="0"
        color="primary"
      />
    </div>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { dom } from 'quasar'
import { filter, inRange } from 'lodash'

const { mapFields } = createHelpers({
  getterType: 'player/getState',
  mutationType: 'player/setState'
})

export default {
  data () {
    return {
      seekerHover: false,
      seekerFrame: null,
      seekerFramePercent: 0,
      seekerFramePosition: 0,
      seekerFrameTime: null
    }
  },

  computed: {
    ...mapFields({
      currentTime: 'data.currentTime',
      duration: 'data.duration',
      metadata: 'data.metadata',
      model: 'data.model',
      seekTime: 'data.seekTime'
    }),

    seeker: {
      get () {
        return this.currentTime
      },

      set (value = 0) {
        this.seekTime = value
      }
    },

    bufferedStyle () {
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

    tooltipPosition () {
      return `-${this.seekerFrame.x}px -${this.seekerFrame.y}px`
    },

    tooltipMargin () {
      if (this.seekerFramePercent <= 5) {
        return '0'
      } else if (this.seekerFramePercent >= 95) {
        return '0 0 0 auto'
      }

      return `0 ${this.seekerFramePosition - 80}px`
    },

    tooltipStyle () {
      return {
        margin: this.tooltipMargin
      }
    }
  },

  methods: {
    getTimeByPct (percent = 0) {
      return this.duration * (percent / 100)
    },

    getSpriteFrame (timeCode = 0) {
      return filter(this.model.sprite, frame => inRange(timeCode, frame.start, frame.end))
    },

    onSeekerHover (event) {
      if (!this.model.sprite.length) {
        return
      }

      const seekerWidth = dom.width(this.$refs.seeker)
      const seekerOffset = dom.offset(this.$refs.seeker)
      const position = event.clientX - seekerOffset.left
      const percent = (position) / seekerWidth * 100

      const timeCode = this.getTimeByPct(percent)
      const frame = this.getSpriteFrame(timeCode)

      this.seekerFrame = frame[0] || null
      this.seekerFramePercent = percent
      this.seekerFramePosition = position
      this.seekerFrameTime = timeCode
      this.seekerHover = true
    },

    onSeekerLeave () {
      this.seekerHover = false
    }
  }
}
</script>
