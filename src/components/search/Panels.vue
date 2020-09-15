<template>
  <div>
    <q-tabs
      v-model="tab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
      arrow-indicator
      dense
    >
      <q-tab
        name="videos"
        label="Videos"
      />

      <q-tab
        name="collections"
        label="Collections"
      />

      <q-tab
        name="tags"
        label="Tags"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
    >
      <q-tab-panel
        name="videos"
        class="q-px-none"
      >
        <item-videos :query="query" />
      </q-tab-panel>

      <q-tab-panel
        name="collections"
        class="q-px-none"
      >
        <item-collections :query="query" />
      </q-tab-panel>

      <q-tab-panel
        name="tags"
        class="q-px-none"
      >
        <item-tags :query="query" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  components: {
    itemCollections: () => import('components/search/Collections'),
    itemTags: () => import('components/search/Tags'),
    ItemVideos: () => import('components/search/Videos')
  },

  props: {
    query: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      tab: 'videos'
    }
  }
}
</script>
