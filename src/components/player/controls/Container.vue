<template>
  <div class="absolute player-controls q-px-md">
    <seeker :data="data" />

    <div class="full-width row justify-between items-center content-center no-wrap q-mb-sm">
      <div class="col">
        <playback :data="data" />
      </div>

      <div class="col-auto">
        <settings :data="data" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
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
