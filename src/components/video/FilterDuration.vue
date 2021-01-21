<template>
  <div class="filter-duration">
    <q-separator />

    <q-item-label
      header
      class="q-pb-none text-black"
    >
      Duration (minutes)
    </q-item-label>

    <q-item dense>
      <q-item-section>
        <q-range
          v-model="durationModel"
          :min="0"
          :max="40"
          :step="10"
          :left-label-value="duration.min === 40 ? '40+' : duration.min"
          :right-label-value="duration.max === 40 ? '40+' : duration.max"
          label
          markers
          snap
        />
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { debounce } from 'quasar'

const { mapFields } = createHelpers({
  getterType: 'videos/getOption',
  mutationType: 'videos/setOption'
})

export default {
  computed: {
    ...mapFields([
      'duration'
    ]),

    durationModel: {
      get () {
        return this.duration
      },

      set: debounce(function (value) {
        this.duration = value
      }, 50)
    }
  }
}
</script>
