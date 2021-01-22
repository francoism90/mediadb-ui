<template>
  <q-dialog
    :key="id"
    ref="dialog"
    maximized
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin player"
      dark
    >
      <q-inner-loading
        :showing="!video"
        dark
      >
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
        <player v-if="video" />
      </transition>
    </q-card>
  </q-dialog>
</template>

<script>
import { dialogHandler } from 'src/mixins/dialog'
import { createHelpers } from 'vuex-map-fields'
import { get } from 'lodash'
import { mapState } from 'vuex'
import Video from 'src/models/Video'

const { mapFields } = createHelpers({
  getterType: 'session/getState',
  mutationType: 'session/setState'
})

export default {
  timers: {
    syncOptions: { time: 2000, repeat: true }
  },

  components: {
    Player: () => import('components/player/Video')
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
      'requestTracks'
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
      this.video = await Video.$find(this.id)

      this.$store.dispatch('player/initialize', {
        id: +new Date(),
        model: this.video,
        requestTime: this.timestamp,
        requestTracks: this.captions
      })

      this.$timer.start('syncOptions')
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
    syncOptions () {
      if (this.failed || !this.playable) {
        return
      }

      const modelSettings = {
        [this.video.id]: {
          timestamp: this.currentTime,
          captions: this.requestTracks
        }
      }

      this.models = { ...this.models, ...modelSettings }
    }
  }
}
</script>
