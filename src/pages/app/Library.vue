<template>
  <q-page class="container fluid">
    <q-btn-group
      class="q-py-md"
      unelevated
    >
      <q-select
        v-model="sorter"
        :options="sorters"
        :loading="!isReady"
        dark
        dense
        dropdown-icon="keyboard_arrow_down"
        options-dark
        square
      />
    </q-btn-group>

    <q-pull-to-refresh
      :disable="!isReady"
      @refresh="onRefresh"
    >
      <q-infinite-scroll
        :key="id"
        :debounce="300"
        @load="onLoad"
      >
        <div class="row q-col-gutter-md items">
          <div
            v-for="(item, index) in data"
            :key="index"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-2"
          >
            <video-item :data="item" />
          </div>
        </div>

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
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Video from 'src/models/Video'
import paginateModule from 'src/store/paginate'

export default {
  preFetch ({ store }) {
    if (!store.hasModule('library')) {
      store.registerModule('library', paginateModule)
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

  computed: {
    ...mapState('library', [
      'id',
      'data',
      'options',
      'page'
    ]),

    ...mapGetters('library', [
      'isLoaded',
      'isReady'
    ]),

    sorter: {
      get () {
        return this.options.sorter || this.sorters[0]
      },

      set (value) {
        this.resetState({ sorter: value })
      }
    }
  },

  meta () {
    return {
      title: 'Library'
    }
  },

  methods: {
    ...mapActions('library', [
      'resetItems',
      'resetState',
      'setPage'
    ]),

    async setModels () {
      const response = await Video
        .include('tags')
        .append(['metadata', 'preview_url', 'thumbnail_url'])
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
