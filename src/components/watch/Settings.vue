<template>
  <q-dialog
    :key="id"
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin"
      style="width: 500px; max-width: 100vw;"
    >
      <q-inner-loading :showing="!video">
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
        <q-card-section v-if="video">
          <item-title :video="video" />

          <q-separator />

          <item-panels
            :text-tracks="textTracks"
            :video="video"
          />
        </q-card-section>
      </transition-group>
    </q-card>
  </q-dialog>
</template>

<script>
import { dialogHandler } from 'src/mixins/dialog'
import VideoModel from 'src/models/Video'

export default {
  components: {
    ItemPanels: () => import('components/watch/Panels'),
    ItemTitle: () => import('components/watch/Title')
  },

  mixins: [dialogHandler],

  props: {
    id: {
      type: String,
      required: true
    },

    textTracks: {
      type: TextTrackList,
      default: null
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
      //
    }
  }
}
</script>
