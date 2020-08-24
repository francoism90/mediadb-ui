<template>
  <div class="container scroll-y q-pb-md">
    <div class="q-py-lg text-caption text-uppercase">
      Related Videos
    </div>

    <q-infinite-scroll
      :key="state.id"
      :debounce="300"
      scroll-target="body"
      @load="onLoad"
    >
      <div class="row q-col-gutter-md items">
        <div
          v-for="(item, index) in state.data"
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
import Video from 'src/models/Video'

export default {
  components: {
    VideoItem: () => import('components/video/Item')
  },

  props: {
    namespace: {
      type: String,
      required: true
    }
  },

  computed: {
    model () {
      return this.$store.state.video
    },

    state () {
      return this.model[this.namespace]
    },

    isLoaded () {
      return this.$store.getters[`video/${this.namespace}/isLoaded`]
    },

    isReady () {
      return this.$store.getters[`video/${this.namespace}/isReady`]
    }
  },

  methods: {
    setPage (payload = {}) {
      this.$store.dispatch(`video/${this.namespace}/setPage`, payload)
    },

    async setModels () {
      const response = await Video
        .where('related', this.model.data.id)
        .include('tags')
        .append(['metadata', 'preview_url', 'thumbnail_url'])
        .orderBy('relevance')
        .page(this.state.page)
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
