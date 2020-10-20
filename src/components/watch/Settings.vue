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

      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-card-section
          v-if="video"
          class="q-pa-none"
        >
          <q-card-section class="row no-wrap justify-between items-center">
            <div class="col text-h6 ellipsis">
              {{ video.name }}
            </div>

            <div class="col-auto">
              <q-btn
                v-close-popup
                icon="close"
                color="grey-9"
                size="12px"
                dense
                round
                unelevated
              />
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="left"
              arrow-indicator
            >
              <q-tab
                name="general"
                label="General"
              />

              <q-tab
                name="tracks"
                label="Subtitles/CC"
              />

              <q-tab
                name="debug"
                label="Debugging"
              />
            </q-tabs>

            <q-separator />

            <q-tab-panels
              v-model="tab"
              animated
            >
              <q-tab-panel
                name="general"
                class="q-pa-none no-scroll"
              >
                <item-general :video="video" />
              </q-tab-panel>

              <q-tab-panel
                name="tracks"
                class="q-pa-none no-scroll"
              >
                <item-tracks
                  :text-tracks="textTracks"
                  :video="video"
                />
              </q-tab-panel>

              <q-tab-panel
                name="debug"
                class="q-pa-none no-scroll"
              >
                <item-debug :video="video" />
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
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
    ItemDebug: () => import('components/watch/Debug'),
    ItemGeneral: () => import('components/watch/General'),
    ItemTracks: () => import('components/watch/Tracks')
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
      tab: 'general',
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
        message: 'Unable to load settings',
        type: 'negative'
      })
    }
  }
}
</script>
