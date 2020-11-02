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
        class="row wrap justify-start items-start content-start q-col-gutter-md"
        @load="onLoad"
      >
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          :disable="!isReady"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-2 video-item"
        >
          <item :video="item" />
        </q-intersection>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import PaginateModule from 'src/store/paginate'
import VideoModel from 'src/models/Video'

const { mapFields } = createHelpers({
  getterType: 'videos/getOption',
  mutationType: 'videos/setOption'
})

export default {
  preFetch ({ store }) {
    if (!store.hasModule('videos')) {
      store.registerModule('videos', PaginateModule)
    }
  },

  components: {
    Item: () => import('components/video/Item'),
    Filters: () => import('components/video/Filters'),
    Sorters: () => import('components/video/Sorters')
  },

  meta () {
    return {
      title: 'Videos'
    }
  },

  computed: {
    ...mapState('videos', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('videos', [
      'isLoaded',
      'isReady'
    ]),

    ...mapFields([
      'favorited',
      'sorter',
      'query'
    ])
  },

  created () {
    this.initialize({
      name: 'videos',
      options: {
        sorter: this.sorter || 'recommended',
        favorited: this.favorited || null,
        query: this.query || null
      }
    })
  },

  methods: {
    ...mapActions('videos', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await VideoModel
        .where('favorited', this.favorited)
        .where('query', this.query)
        .include('model', 'collections', 'tags')
        .append('duration', 'thumbnail_url')
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
