<template>
  <div :key="id">
    <q-btn-group
      v-if="data.length"
      class="q-pb-md"
      unelevated
    >
      <q-select
        v-model="sorter"
        :options="sorters"
        :loading="!isReady"
        dropdown-icon="keyboard_arrow_down"
        dense
        square
      />
    </q-btn-group>

    <q-infinite-scroll
      :disable="!isReady"
      :debounce="300"
      class="row wrap justify-start items-start content-start q-col-gutter-md"
      @load="onLoad"
    >
      <q-intersection
        v-for="(item, index) in data"
        :key="index"
        :disable="!isReady"
        class="col-xs-6 col-sm-4 col-md-3 col-lg-2 tag-item"
        @click="onClick(item)"
      >
        <tag-item :tag="item" />
      </q-intersection>

      <template v-slot:loading>
        <div class="row no-wrap justify-center q-my-md">
          <q-spinner
            color="primary"
            size="40px"
          />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import TagModel from 'src/models/Tag'

const { mapFields } = createHelpers({
  getterType: 'sTags/getOption',
  mutationType: 'sTags/setOption'
})

export default {
  components: {
    TagItem: () => import('components/tags/Item')
  },

  props: {
    query: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      sorters: [
        { label: 'Relevance', value: 'relevance' },
        { label: 'Alphabetical', value: 'name' },
        { label: 'Number of Items', value: 'items' }
      ]
    }
  },

  computed: {
    ...mapState('sTags', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('sTags', [
      'isLoaded',
      'isReady'
    ]),

    ...mapFields([
      'sorter'
    ])
  },

  created () {
    this.initialize({
      name: this.query,
      options: {
        sorter: this.sorters[0]
      }
    })
  },

  methods: {
    ...mapActions('sTags', [
      'initialize',
      'setPage'
    ]),

    async setModels () {
      const response = await TagModel
        .where('query', this.query)
        .append('item_count')
        .orderBy(this.sorter.value)
        .page(this.page)
        .limit(30)
        .get()

      this.setPage(response)
    },

    async onLoad (index, done) {
      await this.setModels()
      done(this.isLoaded)
    },

    onClick (model = {}) {
      this.$router.push({
        name: 'search',
        query: {
          q: 'tag:' + model.slug,
          id: +new Date()
        }
      })
    }
  }
}
</script>
