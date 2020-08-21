<template>
  <div class="container fluid">
    <q-btn-group
      class="q-pb-md"
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
        :key="state.id"
        :debounce="300"
        @load="onLoad"
      >
        <div class="row q-col-gutter-md items">
          <div
            v-for="(item, index) in state.data"
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
  </div>
</template>

<script>
import paginateModule from 'src/store/paginate'
import Video from 'src/models/Video'

export default {
  components: {
    VideoItem: () => import('components/video/Item')
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
    modelState () {
      return this.$store.state.collection
    },

    moduleName () {
      return `${this.modelState.data.id}/videos`
    },

    state () {
      return this.modelState[this.moduleName]
    },

    isLoaded () {
      return this.$store.getters[`collection/${this.moduleName}/isLoaded`]
    },

    isReady () {
      return this.$store.getters[`collection/${this.moduleName}/isReady`]
    },

    sorter: {
      get () {
        return this.state.options.sorter || this.sorters[0]
      },

      set (value) {
        this.resetPages({ sorter: value })
      }
    }
  },

  created () {
    if (!this.$store.hasModule(['collection', this.moduleName])) {
      this.$store.registerModule(['collection', this.moduleName], paginateModule)
    }
  },

  methods: {
    resetPages (payload = {}) {
      this.$store.dispatch(`collection/${this.moduleName}/resetPages`, payload)
    },

    resetItems () {
      this.$store.dispatch(`collection/${this.namespace}/resetItems`)
    },

    setPage (payload = {}) {
      this.$store.dispatch(`collection/${this.moduleName}/setPage`, payload)
    },

    async setModels () {
      const response = await Video
        .where('collection', this.modelState.data.id)
        .include('tags')
        .append(['metadata', 'preview_url', 'thumbnail_url'])
        .orderBy(this.sorter.value)
        .page(this.state.page)
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
