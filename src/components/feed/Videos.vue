<template>
  <div :key="id">
    <template v-if="data.length">
      <div class="q-pb-md text-h6 text-grey-5">
        New videos
      </div>

      <div class="row wrap justify-start items-start content-start q-col-gutter-lg">
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          :disable="!isReady"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 video-item"
        >
          <item :video="item" />
        </q-intersection>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import VideoModel from 'src/models/Video'

export default {
  components: {
    Item: () => import('components/video/Item')
  },

  computed: {
    ...mapState('feed-videos', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('feed-videos', [
      'isReady'
    ])
  },

  watch: {
    id (value) {
      this.setModels()
    }
  },

  created () {
    this.setModels()
  },

  methods: {
    ...mapActions('feed-videos', [
      'setPage'
    ]),

    async setModels () {
      if (this.page >= 2) {
        return
      }

      const response = await VideoModel
        .include('model', 'collections', 'tags')
        .append('duration', 'thumbnail_url')
        .orderBy('-created_at')
        .page(1)
        .limit(6)
        .get()

      this.setPage(response)
    }
  }
}
</script>
