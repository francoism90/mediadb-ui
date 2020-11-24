<template>
  <q-page class="container fluid">
    <q-toolbar class="q-py-lg">
      <sorters />
      <q-space />
      <filters />
    </q-toolbar>

    <q-pull-to-refresh
      :key="id"
      :disable="!isReady"
      @refresh="onRefresh"
    >
      <q-infinite-scroll
        :disable="!isReady"
        class="row wrap justify-start items-start content-start q-col-gutter-lg"
        @load="onLoad"
      >
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          :disable="!isReady"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 collection-item"
        >
          <item :collection="item" />
        </q-intersection>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
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
    Item: () => import('components/collection/Item'),
    Filters: () => import('components/collection/Filter'),
    Sorters: () => import('components/collection/Sorter')
  },

  meta () {
    return {
      title: 'Browse'
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
      'type',
      'query'
    ])
  },

  created () {
    this.initialize({
      name: 'collections',
      options: {
        sorter: this.sorter || 'recommended',
        type: this.type || [],
        query: this.query || null
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
        .whereIn('type', this.type)
        .where('query', this.query)
        .include('tags')
        .append('item_count', 'thumbnail_url')
        .orderBy(this.sorter)
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
