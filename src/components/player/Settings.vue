<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card
      class="q-dialog-plugin"
      style="width: 500px; max-width: 100vw;"
      dark
    >
      <q-inner-loading
        :showing="!model"
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
        <q-card-section
          v-if="model"
          class="q-pa-none"
        >
          <q-card-section class="row no-wrap justify-between items-center content-center">
            <div class="col text-h6 ellipsis">
              {{ model.name }}
            </div>

            <div class="col-auto">
              <q-icon
                v-close-popup
                name="close"
                size="32px"
                class="cursor-pointer"
              />
            </div>
          </q-card-section>

          <q-separator dark />

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

            <q-separator dark />

            <q-tab-panels
              v-model="tab"
              animated
              dark
            >
              <q-tab-panel
                name="general"
                class="q-pa-none no-scroll"
              >
                <general />
              </q-tab-panel>

              <q-tab-panel
                name="tracks"
                class="q-pa-none no-scroll"
              >
                <text-tracks />
              </q-tab-panel>

              <q-tab-panel
                name="debug"
                class="q-pa-none no-scroll"
              >
                <debug />
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
import { mapState } from 'vuex'

export default {
  components: {
    Debug: () => import('components/player/Debug'),
    General: () => import('components/player/General'),
    TextTracks: () => import('components/player/TextTracks')
  },

  mixins: [dialogHandler],

  data () {
    return {
      tab: 'general'
    }
  },

  computed: {
    ...mapState('player', [
      'model'
    ])
  }
}
</script>
