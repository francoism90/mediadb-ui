<template>
  <div :key="id">
    <q-pull-to-refresh @refresh="onRefresh">
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
    </q-pull-to-refresh>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import DetailsComponent from 'components/video/Details'
import VideoModel from 'src/models/Video'

export default {
  components: {
    VideoItem: () => import('components/videos/Item')
  },

  props: {
    video: {
      type: VideoModel,
      required: true
    }
  },

  computed: {
    ...mapState('related', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('related', [
      'isLoaded',
      'isReady'
    ])
  },

  created () {
    this.initialize({
      name: this.video.id
    })
  },

  methods: {
    ...mapActions('related', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await VideoModel
        .where('related', this.video.id)
        .include('tags')
        .append('duration', 'thumbnail_url', 'titles')
        .orderBy('relevance')
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
