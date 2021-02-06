import { dom } from 'quasar'
import { filter, head, inRange } from 'lodash'

export const playerHandler = {
  data () {
    return {
      seekerHover: false,
      seekerHoverFrame: null,
      seekerHoverPercent: 0,
      seekerHoverPosition: 0,
      seekerHoverTime: null
    }
  },

  computed: {
    seeker: {
      get () {
        return this.currentTime
      },

      set (value = 0) {
        this.requestTime = value
      }
    },

    hasSprites () {
      return this.model.sprite.length
    },

    tooltipPosition () {
      if (!this.seekerHoverFrame) {
        return '0'
      }

      return `-${this.seekerHoverFrame.x}px -${this.seekerHoverFrame.y}px`
    },

    tooltipStyle () {
      if (this.seekerHoverPercent <= 5) {
        return { margin: '0' }
      } else if (this.seekerHoverPercent >= 95) {
        return { margin: '0 0 0 auto' }
      }

      return { margin: `0 ${this.seekerHoverPosition - 80}px` }
    }
  },

  methods: {
    getSpriteFrame (timeCode = 0) {
      if (!this.hasSprites) {
        return null
      }

      const frame = filter(
        this.model.sprite,
        frame => inRange(timeCode, frame.start, frame.end)
      )

      return head(frame)
    },

    onSeekerHover (event) {
      const seekerWidth = dom.width(this.$refs.seeker)
      const seekerOffset = dom.offset(this.$refs.seeker)

      this.seekerHoverPosition = event.clientX - seekerOffset.left
      this.seekerHoverPercent = (this.seekerHoverPosition) / seekerWidth * 100
      this.seekerHoverTime = this.getTimeByPct(this.seekerHoverPercent)
      this.seekerHoverFrame = this.getSpriteFrame(this.seekerHoverTime)
      this.seekerHover = true
    }
  }
}
