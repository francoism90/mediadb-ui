<template>
  <div
    v-if="data.length"
    class="q-pt-lg"
  >
    <div class="text-h6 text-grey-5">
      New videos
    </div>

    <div class="row wrap justify-start items-start content-start q-col-gutter-md q-pt-md">
      <q-intersection
        v-for="(item, index) in data"
        :key="index"
        :disable="!isReady"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-2 video-item"
      >
        <item :video="item" />
      </q-intersection>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import VideoModel from 'src/models/Video'

export default {
  components: {
    Item: () => import('components/video/Item')
  },

  props: {
    refreshedAt: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapState('new-videos', [
      'id',
      'data',
      'page'
    ]),

    ...mapGetters('new-videos', [
      'isReady'
    ])
  },

  created () {
    this.initialize({
      name: this.refreshedAt
    })

    this.setModels()
  },

  methods: {
    ...mapActions('new-videos', [
      'initialize',
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
