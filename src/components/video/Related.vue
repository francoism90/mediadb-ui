<template>
  <div class="container">
    <div class="text-caption text-uppercase text-grey">
      Related
    </div>

    <q-separator spaced />

    <q-pull-to-refresh
      :key="id"
      :disable="!isReady"
      @refresh="onRefresh"
    >
      <q-infinite-scroll
        :disable="!isReady"
        class="row wrap justify-start items-start content-start q-col-gutter-md q-pt-sm"
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
import { createNamespacedHelpers } from 'vuex'
import VideoModel from 'src/models/Video'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('video/related')

export default {
  components: {
    VideoItem: () => import('components/video/Item')
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
    ]),

    model () {
      return this.$store.getters['video/getModel']
    }
  },

  created () {
    this.initialize({
      name: this.model.id
    })
  },

  methods: {
    ...mapActions([
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      if (this.page >= 3) {
        return
      }

      const response = await VideoModel
        .where('related', this.model.id)
        .include('model', 'collections', 'tags')
        .append('duration', 'thumbnail_url')
        .orderBy('recommended')
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
