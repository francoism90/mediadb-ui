<template>
  <div class="absolute-full player-controls">
    <div class="absolute-top-right q-px-xl q-pt-lg">
      <q-icon
        v-close-popup
        class="cursor-pointer"
        name="close"
        size="48px"
        color="white"
      />
    </div>

    <div class="absolute-bottom q-px-xl q-pb-lg">
      <q-img
        v-if="seekerHover"
        :position="tooltipPosition"
        :style="tooltipStyle"
        :src="model.sprite_url"
        class="player-tooltip"
        img-class="player-frame"
        height="90px"
        width="160px"
      >
        <div class="absolute-bottom text-center">
          <span class="q-py-xs q-px-sm text-caption text-white transparent-4">
            {{ Number(seekerHoverTime) | timestamp }}
          </span>
        </div>
      </q-img>

      <div class="full-width row no-wrap justify-between items-center content-center q-pt-sm">
        <div class="col">
          <span class="text-overline">{{ Number(currentTime) | timestamp }}</span>
        </div>

        <div class="col-auto">
          <span class="text-overline">{{ Number(duration) | timestamp }}</span>
        </div>
      </div>

      <div
        ref="seeker"
        class="player-seeker"
        @mousemove="onSeekerHover"
        @mouseleave="seekerHover = false"
      >
        <q-slider
          v-model="seeker"
          :style="bufferStyle"
          :min="0.0"
          :max="duration"
          :step="0"
          color="primary"
        />
      </div>

      <div class="full-width row no-wrap justify-between items-center content-center">
        <div class="col q-gutter-xs">
          <q-icon
            v-shortkey="['space']"
            :name="playing ? 'pause' : 'play_arrow'"
            :disable="!playable || failed"
            class="cursor-pointer"
            size="32px"
            color="white"
            @click="togglePlayback"
            @shortkey="togglePlayback"
          />

          <q-icon
            v-shortkey="['arrowleft']"
            :disable="!playable || failed"
            name="replay_10"
            class="cursor-pointer"
            size="32px"
            color="white"
            @click="decreaseTime(10)"
            @shortkey="decreaseTime(10)"
          />

          <q-icon
            v-shortkey="['arrowright']"
            :disable="!playable || failed"
            name="forward_10"
            class="cursor-pointer"
            size="32px"
            color="white"
            @click="increaseTime(10)"
            @shortkey="increaseTime(10)"
          />

          <q-icon
            v-if="$auth.check({ permissions: 'edit videos' })"
            v-shortkey="['r']"
            :disable="!playable"
            name="o_movie_creation"
            class="cursor-pointer hidden"
            size="32px"
            color="white"
            @click="frameshot"
            @shortkey="frameshot"
          />
        </div>

        <div class="col-auto q-gutter-xs">
          <q-icon
            v-shortkey="['s']"
            :disable="!playable"
            name="settings"
            class="cursor-pointer"
            size="24px"
            color="white"
            @click="settingsModal"
            @shortkey="settingsModal"
          />

          <q-icon
            v-shortkey="['f']"
            :disable="!playable || failed"
            :name="requestFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            class="cursor-pointer"
            size="32px"
            color="white"
            @click="toggleFullscreen"
            @shortkey="toggleFullscreen"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { playerHandler } from 'src/mixins/player'
import { createHelpers } from 'vuex-map-fields'
import { mapGetters, mapMutations } from 'vuex'
import SettingsComponent from 'components/player/Settings'

const { mapFields } = createHelpers({
  getterType: 'player/getState',
  mutationType: 'player/setState'
})

export default {
  mixins: [playerHandler],

  computed: {
    ...mapFields([
      'buffered',
      'currentTime',
      'duration',
      'failed',
      'model',
      'paused',
      'playable',
      'playback',
      'playing',
      'requestFullscreen',
      'requestPlayback',
      'requestRate',
      'requestTime',
      'requestTracks',
      'waiting'
    ]),

    ...mapGetters('player', [
      'bufferedPct',
      'bufferStyle',
      'getTimeByPct'
    ])
  },

  methods: {
    ...mapMutations('player', [
      'decreaseTime',
      'increaseTime',
      'toggleFullscreen',
      'togglePlayback'
    ]),

    async frameshot () {
      await this.$http.patch(`videos/${this.model.id}/frameshot`, {
        timecode: this.currentTime
      })
    },

    settingsModal () {
      this.$q.dialog({
        component: SettingsComponent,
        parent: this
      })
    }
  }
}
</script>
