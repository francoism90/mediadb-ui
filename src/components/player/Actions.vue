<template>
  <div
    v-if="metadata && model"
    class="full-width row no-wrap justify-between items-center content-center"
  >
    <div class="col">
      <q-btn
        :icon="paused ? 'o_play_arrow' : 'o_pause'"
        flat
        dense
        round
        size="18px"
        color="white"
        :disable="!playable"
        @click="togglePlayback"
      />

      <q-btn
        icon="o_forward_10"
        flat
        dense
        round
        size="18px"
        color="white"
        :disable="!playable"
        @click="forward"
      />

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
        :disable="!playable"
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
        :disable="!playable"
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
import SettingsComponent from 'components/player/Settings'

const { mapFields } = createHelpers({
  getterType: 'player/getState',
  mutationType: 'player/setState'
})

export default {
  computed: {
    ...mapFields([
      'currentTime',
      'fullscreen',
      'metadata',
      'model',
      'playable',
      'playback',
      'playbackRate',
      'paused',
      'seekTime',
      'textTracks'
    ])
  },

  methods: {
    async frameshot () {
      await this.$http.patch(`videos/${this.model.id}/frameshot`, {
        timecode: this.currentTime
      })
    },

    forward () {
      this.seekTime = this.currentTime + 10
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
    },

    togglePlayback () {
      this.playback = !!this.paused
    }
  }
}
</script>
