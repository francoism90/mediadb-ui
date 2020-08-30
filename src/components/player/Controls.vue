<template>
  <div class="player-controls">
    <directives
      :current-time="currentTime"
    />

    <div class="absolute-bottom block full-width q-px-md player-controls">
      <seeker
        :buffered="buffered"
        :current-time="currentTime"
        :duration="duration"
        :tracks="tracks"
      />

      <playback
        :current-time="currentTime"
        :duration="duration"
        :playing="playing"
      />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('video/player')

export default {
  components: {
    Directives: () => import('components/player/Directives'),
    Playback: () => import('components/player/Playback'),
    Seeker: () => import('components/player/Seeker')
  },

  computed: {
    ...mapState([
      'buffered',
      'currentTime',
      'duration',
      'playing',
      'tracks'
    ])
  }
}
</script>
