<template>
  <q-btn
    no-caps
    color="grey-12"
    text-color="white"
    unelevated
    icon-right="expand_more"
    :label="activeSorter.label"
    :ripple="false"
  >
    <q-menu
      cover
      anchor="top left"
      :dark="false"
      :transition-show="null"
      :transition-hide="null"
    >
      <q-toolbar class="sorters q-pa-md">
        <q-toolbar-title class="text-black text-weight-light">
          Sort By
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
          v-for="(item, index) in sorters"
          :key="index"
          v-ripple
          tag="label"
          :dark="false"
        >
          <q-item-section side>
            <q-radio
              v-model="sorter"
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
import { find } from 'lodash'

const { mapFields } = createHelpers({
  getterType: 'tags/getOption',
  mutationType: 'tags/setOption'
})

export default {
  data () {
    return {
      sorters: [
        { label: 'Ascending (A to Z)', value: 'name' },
        { label: 'Descending (Z to A)', value: '-name' },
        { label: 'Most Used', value: '-items' }
      ]
    }
  },

  computed: {
    ...mapFields([
      'sorter'
    ]),

    activeSorter () {
      return find(this.sorters, { value: this.sorter })
    }
  }
}
</script>
