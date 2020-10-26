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

    <q-pull-to-refresh
      :key="id"
      :disable="!isReady"
      @refresh="onRefresh"
    >
      <q-infinite-scroll
        :disable="!isReady"
        class="row wrap justify-start items-start content-start q-col-gutter-md"
        @load="onLoad"
      >
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          :disable="!isReady"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 collection-item"
        >
          <collection-item :collection="item" />
        </q-intersection>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import CollectionModel from 'src/models/Collection'
import PaginateModule from 'src/store/paginate'

const { mapFields } = createHelpers({
  getterType: 'collection-search/getOption',
  mutationType: 'collection-search/setOption'
})

export default {
  components: {
    CollectionItem: () => import('components/collection/Item')
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
        { label: 'Recommended', value: 'recommended' },
        { label: 'Most Recent', value: '-created_at' },
        { label: 'Most Viewed', value: 'views' }
      ]
    }
  },

  meta () {
    return {
      title: this.query || 'Collections'
    }
  },

  computed: {
    ...mapState('collection-search', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('collection-search', [
      'isLoaded',
      'isReady'
    ]),

    ...mapFields([
      'sorter'
    ])
  },

  created () {
    if (!this.$store.hasModule('collection-search')) {
      this.$store.registerModule('collection-search', PaginateModule)
    }

    this.initialize({
      name: this.$route.query.q || null,
      options: {
        sorter: this.sorters[0]
      }
    })
  },

  methods: {
    ...mapActions('collection-search', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await CollectionModel
        .where('query', this.query)
        .include('tags')
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
