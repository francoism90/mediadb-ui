<template>
  <div class="container fluid scroll-y">
    <div class="q-py-lg text-caption text-uppercase">
      Next
    </div>

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
            <media-item :data="item" />
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
import Media from 'src/models/Media'

export default {
  components: {
    MediaItem: () => import('components/media/Item')
  },

  props: {
    namespace: {
      type: String,
      required: true
    }
  },

  computed: {
    model () {
      return this.$store.state.media
    },

    state () {
      return this.model[this.namespace]
    },

    isLoaded () {
      return this.$store.getters[`media/${this.namespace}/isLoaded`]
    },

    isReady () {
      return this.$store.getters[`media/${this.namespace}/isReady`]
    }
  },

  methods: {
    resetPages (payload = {}) {
      this.$store.dispatch(`media/${this.namespace}/resetPages`, payload)
    },

    setPage (payload = {}) {
      this.$store.dispatch(`media/${this.namespace}/setPage`, payload)
    },

    async setModels () {
      const response = await Media
        .where('related', this.model.data.id)
        .include(['model', 'tags'])
        .append(['preview_url', 'thumbnail_url'])
        .orderBy('relevance')
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
      await this.resetPages()
      done()
    }
  }
}
</script>
