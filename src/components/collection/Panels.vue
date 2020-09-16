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
        name="videos"
        label="Videos"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel
        name="videos"
        class="q-pa-none"
      >
        <item-videos :collection="collection" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card-section>
</template>

<script>
import CollectionModel from 'src/models/Collection'

export default {
  components: {
    ItemVideos: () => import('components/collection/Videos')
  },

  props: {
    collection: {
      type: CollectionModel,
      required: true
    }
  },

  data () {
    return {
      tab: 'videos'
    }
  }
}
</script>
