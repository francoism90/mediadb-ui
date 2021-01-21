<template>
  <q-btn
    color="grey-12"
    text-color="white"
    icon-right="expand_more"
    no-caps
    unelevated
    :label="activeSorter.label"
  >
    <dropdown>
      <template #toolbar-title>
        Sort By
      </template>

      <q-list>
        <q-item
          v-for="(item, index) in sorters"
          :key="index"
          v-ripple
          tag="label"
        >
          <q-item-section side>
            <q-radio
              v-model="sortModel"
              dense
              size="xs"
              :val="item.value"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              {{ item.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </dropdown>
  </q-btn>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { debounce } from 'quasar'
import { find } from 'lodash'

const { mapFields } = createHelpers({
  getterType: 'videos/getOption',
  mutationType: 'videos/setOption'
})

export default {
  components: {
    Dropdown: () => import('components/ui/Dropdown')
  },

  data () {
    return {
      sorters: [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Trending', value: 'trending' },
        { label: 'Most Recent', value: '-created_at' },
        { label: 'Shortest to Longest', value: 'duration' },
        { label: 'Longest to Shortest', value: '-duration' }
      ]
    }
  },

  computed: {
    ...mapFields([
      'sorter'
    ]),

    sortModel: {
      get () {
        return this.sorter
      },

      set: debounce(function (value) {
        this.sorter = value
      }, 100)
    },

    activeSorter () {
      return find(this.sorters, { value: this.sorter })
    }
  }
}
</script>
