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
    $route: 'setModel'
  },

  meta () {
    return {
      title: this.title
    }
  },

  created () {
    this.setModel()
  },

  beforeDestroy () {
    this.unsubscribe()
  },

  methods: {
    async setModel () {
      // Reset on navigation changes
      if (this.video && this.video.id !== this.id) {
        this.unsubscribe()
        this.error = this.title = this.video = null
      }

      try {
        // Set model
        this.video = await VideoModel.$find(this.id)
        this.title = this.video.name

        // Subscribe to events
        this.subscribe()
      } catch {
        this.error = 'Unable to load video'
      }
    },

    subscribe () {
      this.$echo.private(`video.${this.video.id}`)
        .listen('.video.saved', (e) => {
          this.setModel()

          this.$q.notify({
            type: 'info',
            message: 'Video has been saved.',
            progress: true,
            timeout: 5000,
            position: 'top'
          })
        })
        .listen('.video.updated', (e) => {
          this.setModel()

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
