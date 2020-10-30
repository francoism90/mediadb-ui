<template>
  <div
    v-if="metadata && model"
    class="full-width row no-wrap justify-between items-center content-center"
  >
    <div class="col">
      <q-btn
        v-if="$auth.check({ permissions: 'edit videos' })"
        v-shortkey="['r']"
        class="hidden"
        flat
        dense
        round
        size="18px"
        color="white"
        icon="o_movie_creation"
        @click="frameshot"
        @shortkey="frameshot"
      />
    </div>

    <div class="col-auto">
      <q-btn
        v-shortkey="['s']"
        flat
        dense
        round
        size="18px"
        color="white"
        icon="o_settings"
        @click="settingsModal"
        @shortkey="settingsModal"
      >
        <q-tooltip>
          Settings
        </q-tooltip>
      </q-btn>

      <q-btn
        v-shortkey="['f']"
        flat
        dense
        round
        size="18px"
        color="white"
        :icon="fullscreen ? 'o_fullscreen_exit' : 'o_fullscreen'"
        @click="toggleFullscreen"
        @shortkey="toggleFullscreen"
      >
        <q-tooltip>
          Fullscreen
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import SettingsComponent from 'components/watch/Settings'

const { mapFields } = createHelpers({
  getterType: 'player/getState',
  mutationType: 'player/setState'
})

export default {
  computed: {
    ...mapFields({
      currentTime: 'data.currentTime',
      duration: 'data.duration',
      fullscreen: 'fullscreen',
      metadata: 'data.model',
      model: 'data.model',
      playbackRate: 'playbackRate',
      seekTime: 'data.seekTime',
      settings: 'settings'
    })
  },

  methods: {
    async frameshot () {
      await this.$http.patch(`videos/${this.model.id}/frameshot`, {
        timecode: this.currentTime
      })
    },

    settingsModal () {
      this.$q.dialog({
        component: SettingsComponent,
        parent: this,
        id: this.model.id,
        playbackRate: this.playbackRate,
        textTracks: this.textTracks
      })
    },

    toggleFullscreen () {
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>
