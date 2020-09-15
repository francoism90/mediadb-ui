<template>
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
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import DetailsComponent from 'components/video/Details'
import CollectionModel from 'src/models/Collection'
import VideoModel from 'src/models/Video'

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

  computed: {
    ...mapState('videos', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('videos', [
      'isLoaded',
      'isReady'
    ])
  },

  beforeDestroy () {
    this.resetItems()
  },

  methods: {
    ...mapActions('videos', [
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await VideoModel
        .where('collection', this.collection.id)
        .include('tags')
        .append(['duration', 'thumbnail_url'])
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
