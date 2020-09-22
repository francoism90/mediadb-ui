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
        <q-card-section
          v-if="video"
          class="q-pa-none"
        >
          <item-player
            :timecode="timecode"
            :video="video"
          />
        </q-card-section>
      </transition>
    </q-card>
  </q-dialog>
</template>

<script>
import { dialogHandler } from 'src/mixins/dialog'
import VideoModel from 'src/models/Video'

export default {
  components: {
    ItemPlayer: () => import('components/watch/Player')
  },

  mixins: [dialogHandler],

  props: {
    id: {
      type: String,
      required: true
    },

    timecode: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      video: null
    }
  },

  async created () {
    this.video = null

    try {
      this.video = await VideoModel.$find(this.id)
    } catch {
      this.hide()

      this.$q.notify({
        progress: true,
        position: 'top',
        message: 'Unable to load video',
        type: 'negative'
      })
    }
  }
}
</script>
