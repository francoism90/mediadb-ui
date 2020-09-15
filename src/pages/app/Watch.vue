<template>
  <q-page
    v-if="video"
    :key="video.id"
  >
    <player
      :from-route="fromRoute"
      :to-route="toRoute"
      :video="video"
    />
  </q-page>
</template>

<script>
import VideoModel from 'src/models/Video'

export default {
  components: {
    Player: () => import('components/watch/Player')
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
      fromRoute: {},
      toRoute: {},
      title: '',
      video: null
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.setModel()
      vm.fromRoute = from
      vm.toRoute = to
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.setModel()
    this.toRoute = to
    next()
  },

  meta () {
    return {
      title: this.title
    }
  },

  methods: {
    async setModel () {
      try {
        this.$q.loading.show()

        this.video = await VideoModel.$find(this.id)
        this.title = this.video.name
      } catch {
      //
      } finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>
