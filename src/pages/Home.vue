<template>
  <q-page class="container q-py-md">
    <q-toolbar class="q-pb-lg">
      <sorter />
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
          class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 video-item"
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
import { map } from 'lodash'
import Video from 'src/models/Video'

const { mapFields } = createHelpers({
  getterType: 'videos/getOption',
  mutationType: 'videos/setOption'
})

export default {
  components: {
    Item: () => import('components/video/Item'),
    Filters: () => import('components/video/Filters'),
    Sorter: () => import('components/video/Sorter')
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
      'duration',
      'favorites',
      'sorter',
      'tags',
      'query'
    ]),

    selectedTags () {
      if (!this.tags.length) {
        return []
      }

      return map(this.tags, 'slug')
    }
  },

  created () {
    this.initialize({
      name: 'videos',
      options: {
        duration: this.duration || { min: 0, max: 40 },
        sorter: this.sorter || 'recommended',
        tags: this.tags || [],
        favorites: this.favorites || null,
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
      const response = await Video
        .where('query', this.query)
        .where('favorites', this.favorites)
        .whereIn('duration', [this.duration.min, this.duration.max])
        .whereIn('tags', this.selectedTags)
        .include('model', 'tags')
        .append('duration', 'resolution', 'thumbnail_url')
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
