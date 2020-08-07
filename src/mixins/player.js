export const playerHandler = {
  props: {
    model: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      instance: null
    }
  },

  computed: {
    element () {
      return this.$refs.element
    },

    player () {
      return this.$refs.instance
    }
  },

  mounted () {
    this.$root.$on('player_event', this.playerListener)
  },

  methods: {
    async playerListener (payload) {
      const { srcKey = null, type = null, value = null } = payload

      switch (srcKey || type) {
        case 'togglePlay':
          if (
            this.player.readyState > 1 &&
            (this.player.paused === true || this.player.ended === true)) {
            this.player.play()
          } else {
            this.player.pause()
          }
          break

        case 'toggleFullscreen':
          this.$q.fullscreen.toggle(this.element)
          break

        case 'currentTime':
          this.player.currentTime = value
          break

        case 'rewind':
          this.player.currentTime = this.player.currentTime - 5
          break

        case 'forward':
          this.player.currentTime = this.player.currentTime + 5
          break

        case 'download':
          this.player.pause()
          window.location.href = this.model.download_url || ''
          break

        case 'edit':
          this.$store.dispatch('dialog/open', {
            component: 'MediaEdit',
            data: {
              id: this.model.id
            }
          })
          break

        case 'save':
          this.$store.dispatch('dialog/open', {
            component: 'MediaSave',
            data: {
              id: this.model.id
            }
          })
          break

        case 'info':
          this.$store.dispatch('dialog/open', {
            component: 'PlayerInfo',
            data: {
              id: this.model.id
            }
          })
          break

        case 'frameshot':
          await this.$axios.patch(`api/v1/media/${this.model.id}/frameshot`, {
            timecode: this.player.currentTime
          })

          this.$q.notify({
            progress: true,
            position: 'top',
            message: `${this.model.name} has been updated.`,
            type: 'positive'
          })
          break
      }
    }
  }
}
