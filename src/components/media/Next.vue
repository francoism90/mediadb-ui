<template>
  <div
    v-if="media"
    class="container fluid"
  >
    <div class="q-py-lg text-caption text-uppercase">
      Next
    </div>

    <div class="scroll">
      <q-pull-to-refresh
        :key="id"
        :disable="!ready"
        @refresh="onRefresh"
      >
        <q-infinite-scroll
          :debounce="300"
          @load="onLoad"
        >
          <div class="row q-col-gutter-md items">
            <div
              v-for="(item, index) in data"
              :key="index"
              class="col-xs-12 col-sm-6 col-md-4 col-lg-2"
            >
              <media-item :data="item" />
            </div>
          </div>

          <template v-slot:loading>
            <div class="row no-wrap justify-center q-my-md">
              <q-spinner-dots
                color="primary"
                size="40px"
              />
            </div>
          </template>
        </q-infinite-scroll>
      </q-pull-to-refresh>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Media from 'src/models/Media'

export default {
  components: {
    MediaItem: () => import('components/media/Item')
  },

  props: {
    media: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('next', [
      'id',
      'data',
      'page',
      'ready'
    ]),

    ...mapGetters('next', [
      'getIsLoaded'
    ])
  },

  beforeDestroy () {
    this.resetItems()
  },

  methods: {
    ...mapActions('next', [
      'resetItems',
      'resetPages',
      'setPage'
    ]),

    async setModels () {
      const response = await Media
        .where('related', this.media.id)
        .include(['model', 'tags'])
        .append(['preview_url', 'thumbnail_url'])
        .orderBy('relevance')
        .page(this.page)
        .limit(12)
        .get()

      this.setPage(response)
    },

    async onLoad (index, done) {
      await this.setModels()
      done(this.getIsLoaded)
    },

    async onRefresh (done) {
      await this.resetPages()
      done()
    }
  }
}
</script>
