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
  preFetch ({ store }) {
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
    $route: 'initialize'
  },

  meta () {
    return {
      title: this.title
    }
  },

  created () {
    this.initialize()
  },

  beforeDestroy () {
    this.unsubscribe()
  },

  methods: {
    async initialize () {
      this.unsubscribe()

      if (this.video && this.video.id !== this.id) {
        this.error = this.title = this.video = null
      }

      try {
        await this.setModel()

        // Subscribe to events
        this.subscribe()
      } catch {
        this.error = 'Unable to load video'
      }
    },

    async setModel () {
      this.video = await VideoModel.$find(this.id)
      this.title = this.video.name
    },

    subscribe () {
      this.$echo.private(`video.${this.video.id}`)
        .listen('.video.favorited', async (e) => {
          await this.setModel()
        })
        .listen('.video.updated', async (e) => {
          await this.setModel()

          this.$q.notify({
            type: 'info',
            message: 'Video has been updated.',
            progress: true,
            timeout: 5000,
            position: 'top'
          })
        })
    },

    unsubscribe () {
      try {
        this.$echo.leave(`video.${this.video.id || this.id}`)
      } catch {
        //
      }
    }
  }
}
</script>
