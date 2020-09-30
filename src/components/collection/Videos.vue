<template>
  <div>
    <q-btn-group
      class="q-py-md"
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
      :key="id"
      ref="scroll"
      scroll-target=".q-dialog-plugin"
      :disable="!isReady"
      :debounce="300"
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
import CollectionModel from 'src/models/Collection'
import VideoModel from 'src/models/Video'

const { mapFields } = createHelpers({
  getterType: 'videos/getOption',
  mutationType: 'videos/setOption'
})

export default {
  components: {
    VideoItem: () => import('components/videos/Item')
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

  mounted () {
    // TODO: fix workaround
    this.$refs.scroll.poll()
  },

  methods: {
    ...mapActions('videos', [
      'initialize',
      'setPage'
    ]),

    async setModels () {
      const response = await VideoModel
        .where('collection', this.collection.id)
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
    }
  }
}
</script>
