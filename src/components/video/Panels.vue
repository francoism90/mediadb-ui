<template>
  <q-card-section class="container">
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
        name="scenes"
        label="Scenes"
      />

      <q-tab
        name="related"
        label="Related"
      />

      <q-tab
        name="collections"
        label="Collections"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel
        name="scenes"
        class="q-px-none no-scroll"
      >
        <item-scenes :video="video" />
      </q-tab-panel>

      <q-tab-panel
        name="related"
        class="q-px-none no-scroll"
      >
        <item-related :video="video" />
      </q-tab-panel>

      <q-tab-panel
        name="collections"
        class="q-px-none no-scroll"
      >
        <item-collections :video="video" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card-section>
</template>

<script>
import VideoModel from 'src/models/Video'

export default {
  components: {
    ItemCollections: () => import('components/video/Collections'),
    ItemRelated: () => import('components/video/Related'),
    ItemScenes: () => import('components/video/Scenes')
  },

  props: {
    video: {
      type: VideoModel,
      required: true
    }
  },

  data () {
    return {
      tab: 'scenes'
    }
  }
}
</script>
