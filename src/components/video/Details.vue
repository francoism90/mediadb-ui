<template>
  <q-dialog
    ref="dialog"
    maximized
    @hide="onDialogHide"
  >
    <q-card
      v-if="video"
      class="q-dialog-plugin"
    >
      <q-inner-loading :showing="!video.id">
        <q-spinner
          size="50px"
          color="primary"
        />
      </q-inner-loading>

      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <item-title
          v-if="video.id"
          key="video-title"
          :playable="playable"
          :video="video"
        />

        <item-frames
          v-if="video.id"
          key="video-frames"
          :video="video"
        />

        <item-panels
          v-if="video.id"
          key="video-panels"
          :video="video"
        />
      </transition-group>
    </q-card>
  </q-dialog>
</template>

<script>
import { dialogHandler } from 'src/mixins/dialog'
import PaginateModule from 'src/store/paginate'
import VideoModel from 'src/models/Video'

export default {
  components: {
    itemFrames: () => import('components/video/Frames'),
    itemPanels: () => import('components/video/Panels'),
    ItemTitle: () => import('components/video/Title')
  },

  mixins: [dialogHandler],

  props: {
    id: {
      type: String,
      required: true
    },

    playable: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      video: null
    }
  },

  async created () {
    try {
      if (!this.$store.hasModule('parents')) {
        this.$store.registerModule('parents', PaginateModule)
      }

      if (!this.$store.hasModule('related')) {
        this.$store.registerModule('related', PaginateModule)
      }

      this.video = await VideoModel.$find(this.id)
    } catch {
      //
    } finally {
      //
    }
  }
}
</script>
