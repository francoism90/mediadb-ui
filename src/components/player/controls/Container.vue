<template>
  <div
    v-if="data"
    class="absolute fit player-container"
    :class="!controls && fullscreen ? 'cursor-none' : null"
    @mouseenter="showControls()"
    @mousemove="showControls()"
    @mouseleave="hideControls()"
  >
    <directives
      :data="data"
      class="absolute fit player-directives"
    />

    <div
      class="absolute-bottom block full-width q-px-md player-controls"
      :class="controls ? null : 'hidden'"
      @mousemove="showControls()"
      @mouseover="showControls()"
    >
      <seeker :data="data" />

      <div class="row no-wrap justify-between items-center q-mb-sm">
        <div class="col">
          <playback :data="data" />
        </div>

        <div class="col-auto">
          <settings :data="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  timers: {
    hideControls: { time: 3500, autostart: true }
  },

  components: {
    Directives: () => import('components/player/controls/Directives'),
    Seeker: () => import('components/player/controls/Seeker'),
    Playback: () => import('components/player/controls/Playback'),
    Settings: () => import('components/player/controls/Settings')
  },

  computed: {
    ...mapState('player', [
      'controls',
      'fullscreen'
    ]),

    ...mapGetters('player', {
      data: 'getData'
    })
  },

  methods: {
    ...mapMutations('player', [
      'setControls'
    ]),

    showControls () {
      this.setControls(true)
      this.$timer.restart('hideControls')
    },

    hideControls () {
      this.setControls(false)
    }
  }
}
</script>
