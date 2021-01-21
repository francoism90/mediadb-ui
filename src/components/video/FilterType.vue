<template>
  <q-item
    v-ripple
    tag="label"
  >
    <q-item-section side>
      <q-checkbox
        v-model="favoriteModel"
        dense
        size="xs"
        :true-value="1"
        :false-value="null"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        On Watchlist
      </q-item-label>
    </q-item-section>
  </q-item>
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
      'favorites'
    ]),

    favoriteModel: {
      get () {
        return this.favorites
      },

      set: debounce(function (value) {
        this.favorites = value
      }, 300)
    }
  }
}
</script>
