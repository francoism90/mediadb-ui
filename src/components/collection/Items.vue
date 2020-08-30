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
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Video from 'src/models/Video'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('collection/videos')

export default {
  components: {
    VideoItem: () => import('components/video/Item')
  },

  props: {
    model: {
      type: Object,
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
    ...mapState([
      'id',
      'data',
      'options',
      'page'
    ]),

    ...mapGetters([
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

  methods: {
    ...mapActions([
      'resetItems',
      'resetState',
      'setPage'
    ]),

    async setModels () {
      const response = await Video
        .where('collection', this.model.id)
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
