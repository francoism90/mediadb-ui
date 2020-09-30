<template>
  <div>
    <q-btn-group
      class="q-py-md"
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

      <q-select
        v-model="type"
        :options="types"
        :loading="!isReady"
        class="q-ml-lg"
        dropdown-icon="keyboard_arrow_down"
        dense
        square
      />
    </q-btn-group>

    <q-pull-to-refresh
      :key="id"
      :disable="!isReady"
      @refresh="onRefresh"
    >
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
    </q-pull-to-refresh>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import CollectionModel from 'src/models/Collection'

const { mapFields } = createHelpers({
  getterType: 'collections/getOption',
  mutationType: 'collections/setOption'
})

export default {
  components: {
    CollectionItem: () => import('components/collections/Item')
  },

  data () {
    return {
      sorters: [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Trending', value: 'trending' },
        { label: 'Most Recent', value: '-created_at' },
        { label: 'Most Viewed', value: 'views' }
      ],
      types: [
        { label: 'All Collections', value: '*' },
        { label: 'My Collections', value: 'user' },
        { label: 'Titles', value: 'title' }
      ]
    }
  },

  computed: {
    ...mapState('collections', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('collections', [
      'isLoaded',
      'isReady'
    ]),

    ...mapFields([
      'sorter',
      'type'
    ])
  },

  created () {
    this.initialize({
      options: {
        sorter: this.sorters[0],
        type: this.types[0]
      }
    })
  },

  methods: {
    ...mapActions('collections', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await CollectionModel
        .where('type', this.type.value)
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
    },

    async onRefresh (done) {
      await this.resetItems()
      done()
    }
  }
}
</script>
