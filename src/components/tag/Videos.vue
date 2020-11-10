<template>
  <div
    v-if="getTotal > 0"
    class="container q-pt-lg"
  >
    <div class="row no-wrap justify-between items-center content-start">
      <div class="col">
        <div class="text-caption text-uppercase text-grey">
          Videos
        </div>
      </div>

      <div class="col-auto">
        <a
          class="text-caption text-uppercase text-grey cursor-pointer"
          @click="onClick"
        >
          See All
        </a>
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
import { createNamespacedHelpers } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import VideoModel from 'src/models/Video'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('tag/videos')

const { mapFields } = createHelpers({
  getterType: 'tag/videos/getOption',
  mutationType: 'tag/videos/setOption'
})

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
      'isReady',
      'getTotal'
    ]),

    ...mapFields([
      'query'
    ]),

    model () {
      return this.$store.getters['tag/getModel']
    }
  },

  created () {
    this.initialize({
      name: this.model.id
    })

    this.setModels()
  },

  methods: {
    ...mapActions([
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await VideoModel
        .where('query', `tag:${this.model.slug}`)
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
      this.$store.dispatch('videos/resetItems', {
        options: {
          query: 'tag:' + this.model.slug
        }
      })

      this.$router.push({ name: 'video' })
    }
  }
}
</script>
