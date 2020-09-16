<template>
  <div :key="id">
    <q-pull-to-refresh @refresh="onRefresh">
      <q-infinite-scroll
        ref="scroll"
        scroll-target=".q-dialog-plugin"
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
          <collection-item :collection="item" />
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
import DetailsComponent from 'components/collection/Details'
import CollectionModel from 'src/models/Collection'
import VideoModel from 'src/models/Video'

export default {
  components: {
    CollectionItem: () => import('components/collections/Item')
  },

  props: {
    video: {
      type: VideoModel,
      required: true
    }
  },

  computed: {
    ...mapState('models', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('models', [
      'isLoaded',
      'isReady'
    ])
  },

  created () {
    this.initialize({
      name: this.video.id
    })
  },

  mounted () {
    // TODO: fix workaround
    this.$refs.scroll.poll()
  },

  methods: {
    ...mapActions('models', [
      'initialize',
      'resetItems',
      'setPage'
    ]),

    async setModels () {
      const response = await CollectionModel
        .where('video', this.video.id)
        .include('model', 'tags')
        .append('item_count', 'thumbnail_url')
        .orderBy('-type')
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
