<template>
  <div
    v-if="getTotal > 0"
    class="container q-pt-lg"
  >
    <div class="row no-wrap justify-between items-center content-start">
      <div class="col">
        <div class="text-h6 text-grey-5">
          Videos
        </div>
      </div>

      <div class="col-auto">
        <q-btn
          dense
          flat
          color="grey"
          label="See All"
          @click="onClick"
        />
      </div>
    </div>

    <q-separator spaced />

    <q-pull-to-refresh
      :key="id"
      :disable="!isReady"
      @refresh="onRefresh"
    >
      <div class="row wrap justify-start items-start content-start q-col-gutter-md q-pt-sm">
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          :disable="!isReady"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 video-item"
        >
          <video-item :video="item" />
        </q-intersection>
      </div>
    </q-pull-to-refresh>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { mapActions, mapState, mapGetters } from 'vuex'
import TagModel from 'src/models/Tag'
import VideoModel from 'src/models/Video'

const { mapFields } = createHelpers({
  getterType: 'videos/getOption',
  mutationType: 'videos/setOption'
})

export default {
  components: {
    VideoItem: () => import('components/video/Item')
  },

  props: {
    tag: {
      type: TagModel,
      required: true
    }
  },

  computed: {
    ...mapState('tag-videos', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('tag-videos', [
      'isLoaded',
      'isReady',
      'getTotal'
    ]),

    ...mapFields([
      'query'
    ])
  },

  created () {
    this.initialize({
      name: this.tag.id
    })

    this.setModels()
  },

  methods: {
    ...mapActions('tag-videos', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await VideoModel
        .where('query', `tag:${this.tag.slug}`)
        .include('model', 'collections', 'tags')
        .append('duration', 'thumbnail_url')
        .orderBy('recommended')
        .page(1)
        .limit(12)
        .get()

      this.setPage(response)
    },

    async onRefresh (done) {
      await this.setModels()
      done()
    },

    onClick () {
      this.query = 'tag:' + this.tag.slug
      this.$router.push({ name: 'video' })
    }
  }
}
</script>
