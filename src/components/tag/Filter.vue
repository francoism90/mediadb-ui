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
          Categories
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
          v-for="(item, index) in types"
          :key="index"
          v-ripple
          tag="label"
          :dark="false"
        >
          <q-item-section side>
            <q-checkbox
              v-model="typeModel"
              dense
              size="xs"
              :val="item.value"
              :dark="false"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              {{ item.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { debounce } from 'quasar'

const { mapFields } = createHelpers({
  getterType: 'tags/getOption',
  mutationType: 'tags/setOption'
})

export default {
  data () {
    return {
      types: [
        { label: 'Actors', value: 'actor' },
        { label: 'Genres', value: 'genre' },
        { label: 'Languages', value: 'language' },
        { label: 'Studios', value: 'studio' }
      ]
    }
  },

  computed: {
    ...mapFields([
      'type'
    ]),

    typeModel: {
      get () {
        return this.type
      },

      set: debounce(function (value) {
        this.type = value
      }, 300)
    }
  }
}
</script>
