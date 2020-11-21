<template>
  <q-card-section class="q-px-none">
    <q-list
      v-for="(caption, index) in video.captions"
      :key="index"
    >
      <q-item
        v-if="caption.id && caption.name"
        v-ripple
        tag="label"
      >
        <q-item-section>
          <q-item-label class="ellipsis">
            {{ caption.name }}
          </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="tracks"
            color="primary"
            :val="caption.id"
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
    ...mapFields({
      tracks: 'data.tracks'
    })
  }
}
</script>
