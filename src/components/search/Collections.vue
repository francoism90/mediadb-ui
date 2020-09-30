<template>
  <div>
    <q-btn-group
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
      :key="id"
      :disable="!isReady"
      :debounce="300"
      class="row wrap justify-start items-start content-start q-col-gutter-md"
      @load="onLoad"
    >
      <q-intersection
        v-for="(item, index) in data"
        :key="index"
        :disable="!isReady"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-2 collection-item"
      >
        <collection-item :collection="item" />
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
import CollectionModel from 'src/models/Collection'

const { mapFields } = createHelpers({
  getterType: 'sCollections/getOption',
  mutationType: 'sCollections/setOption'
})

export default {
  components: {
    CollectionItem: () => import('components/collections/Item')
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
        { label: 'Most Recent', value: '-created_at' },
        { label: 'Most Viewed', value: 'views' }
      ]
    }
  },

  computed: {
    ...mapState('sCollections', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('sCollections', [
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
    ...mapActions('sCollections', [
      'initialize',
      'setPage'
    ]),

    async setModels () {
      const response = await CollectionModel
        .where('query', this.query)
        .include('model', 'tags')
        .append('item_count', 'thumbnail_url')
        .orderBy(this.sorter.value)
        .page(this.page)
        .limit(12)
        .get()

      this.setPage(response)
    },

    async onLoad (index, done) {
      await this.setModels()
      done(this.isLoaded)
    }
  }
}
</script>
