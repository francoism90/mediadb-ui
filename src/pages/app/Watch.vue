<template>
  <q-page :key="id">
    <player
      v-if="video"
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
      title: null,
      video: null
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fromRoute = from
      vm.toRoute = to
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.toRoute = to
    next()
  },

  watch: {
    $route: 'setModel'
  },

  created () {
    this.setModel()
  },

  meta () {
    return {
      title: this.title
    }
  },

  methods: {
    async setModel () {
      this.title = null
      this.video = null

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
