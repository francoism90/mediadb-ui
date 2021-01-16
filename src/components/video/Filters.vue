<template>
  <q-toolbar class="q-pb-lg">
    <dropdown>
      <template #button-label>
        {{ activeSorter.label }}
      </template>

      <template #toolbar-title>
        Sort By
      </template>

      <q-list
        :dark="false"
        class="text-black"
        style="min-width: 200px;"
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
              v-model="sortModel"
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
    </dropdown>

    <q-space />

    <dropdown
      :button-dense="true"
      button-icon="o_filter_alt"
    >
      <template #toolbar-title>
        Filters
      </template>

      <q-list
        :dark="false"
        class="text-black"
        style="width: 240px;"
      >
        <q-item
          v-ripple
          tag="label"
          :dark="false"
        >
          <q-item-section side>
            <q-checkbox
              v-model="favoriteModel"
              dense
              size="xs"
              :dark="false"
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
      </q-list>

      <q-separator color="grey-2" />

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
            :dark="false"
            :left-label-value="duration.min === 40 ? '40+' : duration.min"
            :right-label-value="duration.max === 40 ? '40+' : duration.max"
            label
            markers
            snap
          />
        </q-item-section>
      </q-item>

      <q-separator color="grey-2" />

      <q-item-label
        header
        class="q-pb-xs text-black"
      >
        Filter by Tags
      </q-item-label>

      <q-item>
        <q-select
          v-model="tagModel"
          dense
          square
          filled
          style="max-width: 210px;"
          :dark="false"
          :options="tagOptions"
          :options-dark="false"
          :max-values="10"
          clearable
          counter
          hide-dropdown-icon
          use-chips
          option-label="name"
          multiple
          use-input
          @filter="filterTags"
        >
          <template #option="scope">
            <q-item
              v-bind="scope.itemProps"
              :dark="false"
              v-on="scope.itemEvents"
            >
              <q-item-section>
                <q-item-label class="text-black">
                  {{ scope.opt.name }}
                </q-item-label>

                <q-item-label
                  class="text-capitalize text-weight-light"
                  caption
                >
                  {{ scope.opt.type }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-item>
    </dropdown>
  </q-toolbar>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { debounce } from 'quasar'
import { find } from 'lodash'
import Tag from 'src/models/Tag'

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
      tagOptions: [],
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
      'duration',
      'favorites',
      'sorter',
      'tags'
    ]),

    sortModel: {
      get () {
        return this.sorter
      },

      set: debounce(function (value) {
        this.sorter = value
      }, 100)
    },

    durationModel: {
      get () {
        return this.duration
      },

      set: debounce(function (value) {
        this.duration = value
      }, 50)
    },

    favoriteModel: {
      get () {
        return this.favorites
      },

      set: debounce(function (value) {
        this.favorites = value
      }, 300)
    },

    tagModel: {
      get () {
        return this.tags
      },

      set: debounce(function (value) {
        this.tags = value
      }, 100)
    },

    activeSorter () {
      return find(this.sorters, { value: this.sorter })
    }
  },

  methods: {
    async filterTags (val, update, abort) {
      this.tagOptions = await Tag
        .where('query', val || null)
        .orderBy('recommended')
        .page(1)
        .limit(5)
        .$get()

      update()
    }
  }
}
</script>
