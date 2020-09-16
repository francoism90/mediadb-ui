<template>
  <div :key="id">
    <q-btn-group
      v-if="data.length"
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

    <q-infinite-scroll
      :debounce="300"
      class="row wrap justify-start items-start content-start q-col-gutter-md"
      @load="onLoad"
    >
      <q-intersection
        v-for="(item, index) in data"
        :key="index"
        v-close-popup
        class="col-xs-12 col-sm-6 col-md-4 col-lg-2 video-item"
        @click="onClick(item)"
      >
        <video-item :video="item" />
      </q-intersection>

      <template v-slot:loading>
        <div class="row no-wrap justify-center q-my-md">
          <q-spinner
            color="primary"
            size="40px"
          />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import DetailsComponent from 'components/video/Details'
import VideoModel from 'src/models/Video'

const { mapFields } = createHelpers({
  getterType: 'sVideos/getOption',
  mutationType: 'sVideos/setOption'
})

export default {
  components: {
    VideoItem: () => import('components/videos/Item')
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
        { label: 'Trending', value: 'trending' },
        { label: 'Most Recent', value: '-created_at' },
        { label: 'Most Viewed', value: 'views' }
      ]
    }
  },

  computed: {
    ...mapState('sVideos', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('sVideos', [
      'isLoaded',
      'isReady'
    ]),

    ...mapFields([
      'sorter'
    ])
  },

  created () {
    this.initialize({
      name: this.query,
      options: {
        sorter: this.sorters[0]
      }
    })
  },

  methods: {
    ...mapActions('sVideos', [
      'initialize',
      'setPage'
    ]),

    async setModels () {
      const response = await VideoModel
        .where('query', this.query)
        .include('tags')
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

    onClick (model = {}) {
      this.$q.dialog({
        component: DetailsComponent,
        parent: this,
        id: model.id || null
      })
    }
  }
}
</script>
