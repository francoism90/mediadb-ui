<template>
  <q-page :key="id">
    <template v-if="error">
      {{ error }}
    </template>

    <template v-if="video">
      <video-title :video="video" />
      <video-related :video="video" />
    </template>
  </q-page>
</template>

<script>
import PaginateModule from 'src/store/paginate'
import VideoModel from 'src/models/Video'

export default {
  preFetch ({ store, currentRoute }) {
    if (!store.hasModule('video-related')) {
      store.registerModule('video-related', PaginateModule)
    }
  },

  components: {
    VideoRelated: () => import('components/video/Related'),
    VideoTitle: () => import('components/video/Title')
  },

  props: {
    id: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      error: null,
      title: null,
      video: null
    }
  },

  watch: {
    $route: 'fetchModel'
  },

  meta () {
    return {
      title: this.title
    }
  },

  created () {
    this.fetchModel()
  },

  methods: {
    async fetchModel () {
      try {
        if (this.video && this.video.id !== this.id) {
          this.error = this.title = this.video = null
        }

        this.video = await VideoModel.$find(this.id)
        this.title = this.video.name
      } catch {
        this.error = 'Unable to load video'
      }
    }
  }
}
</script>
