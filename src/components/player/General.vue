<template>
  <q-card-section class="q-px-sm">
    <q-list
      dense
      dark
    >
      <q-item-label header>
        Playback Speed
      </q-item-label>

      <q-item dark>
        <q-item-section side>
          <q-icon name="speed" />
        </q-item-section>

        <q-item-section>
          <q-slider
            v-model="playbackRate"
            :min="0.25"
            :max="2"
            :step="0.25"
            dark
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

const { mapFields } = createHelpers({
  getterType: 'player/getState',
  mutationType: 'player/setState'
})

export default {
  computed: {
    ...mapFields([
      'playbackRate'
    ])
  }
}
</script>
