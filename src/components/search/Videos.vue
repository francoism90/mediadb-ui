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
import PaginateModule from 'src/store/paginate'
import VideoModel from 'src/models/Video'

const { mapFields } = createHelpers({
  getterType: 'video-search/getOption',
  mutationType: 'video-search/setOption'
})

export default {
  components: {
    VideoItem: () => import('components/video/Item')
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
        { label: 'Most Viewed', value: 'views' },
        { label: 'Shortest to Longest', value: 'duration' },
        { label: 'Longest to Shortest', value: '-duration' }
      ]
    }
  },

  meta () {
    return {
      title: this.query || 'Videos'
    }
  },

  computed: {
    ...mapState('video-search', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('video-search', [
      'isLoaded',
      'isReady'
    ]),

    ...mapFields([
      'sorter'
    ])
  },

  created () {
    if (!this.$store.hasModule('video-search')) {
      this.$store.registerModule('video-search', PaginateModule)
    }

    this.initialize({
      name: this.$route.params.id || null,
      options: {
        sorter: this.sorters[0]
      }
    })
  },

  methods: {
    ...mapActions('video-search', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await VideoModel
        .where('query', this.query)
        .include('model', 'tags')
        .append('duration', 'thumbnail_url', 'titles')
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
