<template>
  <div class="container">
    <div class="q-py-lg text-h6 text-grey-1">
      Related Videos
    </div>

    <q-pull-to-refresh
      :key="id"
      :disable="!isReady"
      @refresh="onRefresh"
    >
      <q-infinite-scroll
        :disable="!isReady"
        class="row wrap justify-start items-start content-start q-col-gutter-lg"
        @load="onLoad"
      >
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          :disable="!isReady"
          class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 video-item"
        >
          <item :video="item" />
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
    Item: () => import('components/video/Item')
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

    video () {
      return this.$store.getters['video/getModel']
    }
  },

  created () {
    this.initialize({
      name: this.video.id
    })
  },

  methods: {
    ...mapActions([
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      if (this.page >= 4) {
        return
      }

      const response = await VideoModel
        .where('related', this.video.id)
        .include('model', 'tags')
        .append('duration', 'resolution', 'thumbnail_url')
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
