<template>
  <div
    ref="element"
    v-shortkey="getKeyBindings"
    class="relative-position window-height player"
    :class="fullscreen ? 'fullscreen' : null"
    @shortkey="playerListener"
  >
    <video
      ref="instance"
      class="absolute fit"
      playsinline
      preload="auto"
      :poster="model.thumbnail_url"
      :height="model.metadata.height || 360"
      :width="model.metadata.width || 480"
    />

    <control-container v-if="ready" />
  </div>
</template>

<script>
import { playerHandler } from 'src/mixins/player'
import { Player } from 'shaka-player'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  components: {
    ControlContainer: () => import('./controls/Container')
  },

  mixins: [playerHandler],

  computed: {
    ...mapState('player', [
      'controls',
      'data',
      'fullscreen',
      'ready'
    ]),

    ...mapGetters('player', [
      'getDataBindings',
      'getEventListeners',
      'getKeyBindings',
      'getPlayerSettings'
    ])
  },

  watch: {
    '$q.fullscreen.isActive' (value = false) {
      this.setFullscreen(value)
    }
  },

  mounted () {
    this.setPlayer()
  },

  async beforeDestroy () {
    // Remove listeners
    for (const listener of this.getEventListeners) {
      this.player.removeEventListener(listener, this.setPlayerData)
    }

    // Destroy instance
    await this.instance.detach()
    await this.instance.destroy()

    // Reset player state
    this.reset()
  },

  methods: {
    ...mapActions('player', [
      'initialize',
      'reset'
    ]),

    ...mapMutations('player', [
      'setData'
    ]),

    async setPlayer () {
      if (!Player.isBrowserSupported()) {
        alert('Browser is not supported')
      }

      try {
        this.instance = new Player(this.player)

        // Load player settings
        await this.instance.configure(this.getPlayerSettings)
        await this.instance.load(this.model.stream_url)

        // Set sprite metadata track
        const spriteTrack = await this.instance.addTextTrack(
          this.model.sprite_url,
          'eng',
          'metadata',
          'text/vtt'
        )

        await this.instance.selectTextTrack(spriteTrack)

        // Initialize store
        await this.initialize({
          tracks: [
            { key: 'metadata-sprite', value: this.player.textTracks[0] }
          ]
        })

        // Add listeners
        for (const listener of this.getEventListeners) {
          this.player.addEventListener(listener, this.setPlayerData)
        }

        // Autoplay video
        this.player.play()
      } catch (e) {}
    },

    async setPlayerData () {
      if (!this.player) {
        return
      }

      const data = {}

      for (const key of this.getDataBindings) {
        data[key] = this.player[key] || null
      }

      await this.setData(data)
    }
  }

}
</script>
