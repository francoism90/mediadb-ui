<template>
  <div class="container">
    <div class="text-h6 text-grey-5">
      Videos
    </div>

    <q-separator spaced />

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
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 video-item"
        >
          <video-item :video="item" />
        </q-intersection>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import CollectionModel from 'src/models/Collection'
import VideoModel from 'src/models/Video'

const { mapFields } = createHelpers({
  getterType: 'collection-videos/getOption',
  mutationType: 'collection-videos/setOption'
})

export default {
  components: {
    VideoItem: () => import('components/video/Item')
  },

  props: {
    collection: {
      type: CollectionModel,
      required: true
    }
  },

  data () {
    return {
      sorters: [
        { label: 'Most Recent', value: '-created_at' },
        { label: 'Most Viewed', value: 'views' },
        { label: 'Recommended', value: 'recommended' },
        { label: 'Trending', value: 'trending' },
        { label: 'Shortest to Longest', value: 'duration' },
        { label: 'Longest to Shortest', value: '-duration' }
      ]
    }
  },

  computed: {
    ...mapState('collection-videos', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('collection-videos', [
      'isLoaded',
      'isReady'
    ]),

    ...mapFields([
      'sorter'
    ])
  },

  created () {
    this.initialize({
      name: this.collection.id,
      options: {
        sorter: this.sorters[0]
      }
    })
  },

  methods: {
    ...mapActions('collection-videos', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await VideoModel
        .where('collection', this.collection.id)
        .include('model', 'collections', 'tags')
        .append('duration', 'thumbnail_url')
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
