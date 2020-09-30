<template>
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
</template>

<script>
import VideoModel from 'src/models/Video'

export default {
  components: {
    ItemDebug: () => import('components/watch/Debug'),
    ItemGeneral: () => import('components/watch/General'),
    ItemTracks: () => import('components/watch/Tracks')
  },

  props: {
    textTracks: {
      type: TextTrackList,
      default: null
    },

    video: {
      type: VideoModel,
      required: true
    }
  },

  data () {
    return {
      tab: 'general'
    }
  }
}
</script>
