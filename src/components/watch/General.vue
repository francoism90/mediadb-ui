<template>
  <q-card-section class="q-px-none">
    <q-list dense>
      <q-item-label header>
        Playback Speed
      </q-item-label>

      <q-item>
        <q-item-section side>
          <q-icon name="speed" />
        </q-item-section>

        <q-item-section>
          <q-slider
            v-model="playbackRate"
            :min="0.25"
            :max="2"
            :step="0.25"
            markers
            snap
            label
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import VideoModel from 'src/models/Video'

const { mapFields } = createHelpers({
  getterType: 'player/getState',
  mutationType: 'player/setState'
})

export default {
  props: {
    video: {
      type: VideoModel,
      required: true
    }
  },

  computed: {
    ...mapFields([
      'playbackRate'
    ])
  }
}
</script>
