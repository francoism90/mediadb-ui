<template>
  <q-card-section class="q-px-none">
    <q-card-section
      v-if="!model.captions.length"
      class="text-body2 text-grey"
    >
      No closed captions or subtitles are available.
    </q-card-section>

    <q-list
      v-for="(caption, index) in model.captions"
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
            v-model="textTracks"
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

const { mapFields } = createHelpers({
  getterType: 'player/getState',
  mutationType: 'player/setState'
})

export default {
  computed: {
    ...mapFields([
      'model',
      'textTracks'
    ])
  }
}
</script>
