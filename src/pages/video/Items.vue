<template>
  <q-page class="container horizontal fluid">
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
          class="col-xs-12 col-sm-6 col-md-4 col-lg-2 video-item"
        >
          <video-item :video="item" />
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
  getterType: 'video/getOption',
  mutationType: 'video/setOption'
})

export default {
  preFetch ({ store }) {
    if (!store.hasModule('video')) {
      store.registerModule('video', PaginateModule)
    }
  },

  components: {
    VideoItem: () => import('components/video/Item')
  },

  data () {
    return {
      sorters: [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Trending', value: 'trending' },
        { label: 'Most Recent', value: '-created_at' },
        { label: 'Most Viewed', value: 'views' }
      ]
    }
  },

  meta () {
    return {
      title: 'Videos'
    }
  },

  computed: {
    ...mapState('video', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('video', [
      'isLoaded',
      'isReady'
    ]),

    ...mapFields([
      'sorter'
    ])
  },

  created () {
    this.initialize({
      options: {
        sorter: this.sorters[0]
      }
    })
  },

  methods: {
    ...mapActions('video', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await VideoModel
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
