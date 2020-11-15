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
        class="row wrap justify-start items-start content-start q-pb-md q-col-gutter-md"
        @load="onLoad"
      >
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          :disable="!isReady"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 tag-item"
        >
          <item :tag="item" />
        </q-intersection>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import TagModel from 'src/models/Tag'

const { mapFields } = createHelpers({
  getterType: 'tags/getOption',
  mutationType: 'tags/setOption'
})

export default {
  components: {
    Item: () => import('components/tag/Item'),
    Filters: () => import('components/tag/Filter'),
    Sorters: () => import('components/tag/Sorter')
  },

  meta () {
    return {
      title: 'Tags'
    }
  },

  computed: {
    ...mapState('tags', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('tags', [
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
      name: 'tags',
      options: {
        sorter: this.sorter || 'name',
        type: this.type || ['actor', 'genre', 'language', 'studio'],
        query: this.query || null
      }
    })
  },

  methods: {
    ...mapActions('tags', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await TagModel
        .where('query', this.query)
        .whereIn('type', this.type)
        .append('items')
        .orderBy(this.sorter)
        .page(this.page)
        .limit(30)
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
