<template>
  <div class="container scroll-y q-pb-md">
    <div class="q-py-lg text-caption text-uppercase">
      Related Videos
    </div>

    <q-infinite-scroll
      :key="id"
      :debounce="300"
      scroll-target="body"
      @load="onLoad"
    >
      <div class="row q-col-gutter-md items">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
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
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Video from 'src/models/Video'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('video/related')

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

  computed: {
    ...mapState([
      'id',
      'data',
      'page'
    ]),

    ...mapGetters([
      'isLoaded',
      'isReady'
    ])
  },

  beforeDestroy () {
    this.resetState()
  },

  methods: {
    ...mapActions([
      'resetState',
      'setPage'
    ]),

    async setModels () {
      const response = await Video
        .where('related', this.model.id)
        .include('tags')
        .append(['metadata', 'preview_url', 'thumbnail_url'])
        .orderBy('relevance')
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
