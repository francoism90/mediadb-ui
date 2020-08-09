<template>
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
      :model="model"
      :playing="playing"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
    Playback: () => import('components/player/controls/Playback'),
    Seeker: () => import('components/player/controls/Seeker')
  },

  computed: {
    ...mapState('player', [
      'buffered',
      'currentTime',
      'duration',
      'model',
      'playing',
      'tracks'
    ])
  }
}
</script>
