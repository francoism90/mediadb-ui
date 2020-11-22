<template>
  <q-dialog
    :key="id"
    ref="dialog"
    maximized
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-inner-loading :showing="!video">
        <q-spinner
          size="50px"
          color="primary"
        />
      </q-inner-loading>

      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <video-player v-if="video" />
      </transition>
    </q-card>
  </q-dialog>
</template>

<script>
import { dialogHandler } from 'src/mixins/dialog'
import { createHelpers } from 'vuex-map-fields'
import { get } from 'lodash'
import { mapState } from 'vuex'
import VideoModel from 'src/models/Video'

const { mapFields } = createHelpers({
  getterType: 'session/getState',
  mutationType: 'session/setState'
})

export default {
  timers: {
    syncSettings: { time: 2000, autostart: true, repeat: true }
  },

  components: {
    VideoPlayer: () => import('components/player/Video')
  },

  mixins: [dialogHandler],

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      video: null
    }
  },

  computed: {
    ...mapState('player', [
      'currentTime',
      'failed',
      'playable',
      'textTracks'
    ]),

    ...mapFields([
      'models'
    ]),

    model () {
      return this.models[this.video.id] || {}
    },

    captions () {
      return get(this.model, 'captions', [])
    },

    timestamp () {
      return get(this.model, 'timestamp', 0)
    }
  },

  async created () {
    this.video = null

    try {
      this.video = await VideoModel.$find(this.id)

      this.$store.dispatch('player/initialize', {
        id: +new Date(),
        model: this.video,
        startTime: this.timestamp,
        textTracks: this.captions
      })
    } catch {
      this.hide()

      this.$q.notify({
        progress: true,
        position: 'top',
        message: 'Unable to load video',
        type: 'negative'
      })
    }
  },

  methods: {
    syncSettings () {
      if (this.failed || !this.playable) {
        return
      }

      const modelSettings = {
        [this.video.id]: {
          timestamp: this.currentTime,
          captions: this.textTracks
        }
      }

      this.models = { ...this.models, ...modelSettings }
    }
  }
}
</script>
