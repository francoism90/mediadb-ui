<template>
  <q-btn
    dense
    color="grey-12"
    text-color="white"
    unelevated
    icon="o_filter_alt"
    :ripple="false"
  >
    <q-menu
      cover
      anchor="top right"
      :dark="false"
      :transition-show="null"
      :transition-hide="null"
    >
      <q-toolbar class="dropdown q-pa-md">
        <q-toolbar-title class="text-black text-weight-light">
          Filters
        </q-toolbar-title>

        <q-btn
          v-close-popup
          flat
          dense
          color="black"
          icon="o_close"
          size="xs"
        />
      </q-toolbar>

      <q-separator color="grey-2" />

      <q-list
        :dark="false"
        class="text-black text-weight-light"
      >
        <q-item
          v-ripple
          tag="label"
          :dark="false"
        >
          <q-item-section side>
            <q-checkbox
              v-model="favorited"
              dense
              size="xs"
              true-value="1"
              :false-value="null"
              :dark="false"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              Favorited
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-ripple
          tag="label"
          :dark="false"
        >
          <q-item-section side>
            <q-checkbox
              v-model="liked"
              dense
              size="xs"
              true-value="1"
              :false-value="null"
              :dark="false"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              Watchlist
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'videos/getOption',
  mutationType: 'videos/setOption'
})

export default {
  computed: {
    ...mapFields([
      'favorited',
      'liked'
    ])
  }
}
</script>
