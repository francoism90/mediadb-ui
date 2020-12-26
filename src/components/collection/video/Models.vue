<template>
  <div class="container fluid">
    <div class="q-py-md text-h6 text-grey-5">
      Videos
    </div>

    <q-toolbar class="q-pb-lg">
      <sorters />
    </q-toolbar>

    <q-pull-to-refresh
      :key="id"
      :disable="!isReady"
      @refresh="onRefresh"
    >
      <q-infinite-scroll
        :disable="!isReady"
        class="row wrap justify-start items-start content-start q-col-gutter-md"
        @load="onLoad"
      >
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          :disable="!isReady"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 video-item"
        >
          <item :video="item" />
        </q-intersection>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import VideoModel from 'src/models/Video'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('collection/videos')

const { mapFields } = createHelpers({
  getterType: 'collection/videos/getOption',
  mutationType: 'collection/videos/setOption'
})

export default {
  components: {
    Item: () => import('components/video/Item'),
    Sorters: () => import('components/collection/video/Sorter')
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

    ...mapFields([
      'sorter'
    ]),

    model () {
      return this.$store.getters['collection/getModel']
    }
  },

  created () {
    this.initialize({
      name: this.model.id,
      options: {
        sorter: this.sorter || '-created_at'
      }
    })
  },

  methods: {
    ...mapActions([
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await VideoModel
        .where('collection', this.model.id)
        .include('model', 'collections', 'tags')
        .append('duration', 'thumbnail_url')
        .orderBy(this.sorter)
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
