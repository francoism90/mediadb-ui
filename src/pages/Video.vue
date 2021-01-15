<template>
  <q-page :key="model.id">
    <hero
      class="q-py-lg"
      :style="{ backgroundImage: 'url(' + model.thumbnail_url + ')' }"
    >
      <video-details />
    </hero>

    <video-related />
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import ModelModule from 'src/store/model'
import PaginateModule from 'src/store/paginate'
import Video from 'src/models/Video'

export default {
  async preFetch ({ store, currentRoute, redirect }) {
    if (!store.hasModule('video')) {
      store.registerModule('video', ModelModule)
      store.registerModule(['video', 'related'], PaginateModule)
    }

    try {
      const model = await Video.$find(currentRoute.params.id)

      store.dispatch('video/initialize', {
        id: currentRoute.params.id,
        model: model || null
      })
    } catch {
      redirect({ name: '404' })
    }
  },

  components: {
    Hero: () => import('components/ui/Hero'),
    VideoDetails: () => import('components/video/Details'),
    VideoRelated: () => import('components/video/Related')
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.subscribe(to.params.id)
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.unsubscribe(from.params.id)
    this.subscribe(to.params.id)
    next()
  },

  beforeRouteLeave (to, from, next) {
    this.unsubscribe(from.params.id)
    next()
  },

  meta () {
    return {
      title: this.model.name
    }
  },

  computed: {
    ...mapState('video', [
      'model'
    ])
  },

  methods: {
    async setModel (id = null) {
      const model = await Video.$find(id)

      this.$store.commit('video/setModel', model)
    },

    subscribe (id = null) {
      this.$echo.private(`video.${id}`)
        .listen('.video.deleted', async (e) => {
          this.$q.notify({
            type: 'info',
            message: 'Video has been deleted.',
            progress: true,
            timeout: 5000,
            position: 'top'
          })

          if (this.$store.hasModule('videos')) {
            this.$store.commit('videos/removeData', { id: id })
          }
        })
        .listen('.video.favorited', async (e) => {
          await this.setModel(id)
        })
        .listen('.video.updated', async (e) => {
          await this.setModel(id)

          this.$q.notify({
            type: 'info',
            message: 'Video has been updated.',
            progress: true,
            timeout: 5000,
            position: 'top'
          })

          this.$store.dispatch('video/related/resetItems')

          if (this.$store.hasModule('videos')) {
            this.$store.commit('videos/updateData', {
              attributes: { id: id },
              values: this.model
            })
          }
        })
    },

    unsubscribe (id = null) {
      this.$echo.leave(`video.${id}`)
    }
  }
}
</script>
