<template>
  <div class="absolute fit player-container">
    <div class="absolute fit player-directives">
      <directives :data="data" />
    </div>

    <div class="absolute-bottom block full-width q-px-md player-controls">
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
import { mapGetters } from 'vuex'

export default {
  components: {
    Directives: () => import('./Directives'),
    Seeker: () => import('./Seeker'),
    Playback: () => import('./Playback'),
    Settings: () => import('./Settings')
  },

  computed: {
    ...mapGetters('player', {
      data: 'getData',
      meta: 'getMeta'
    })
  }
}
</script>
