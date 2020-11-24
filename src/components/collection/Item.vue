<template>
  <q-card
    flat
    class="transparent collection-item"
    draggable="false"
  >
    <router-link :to="{ name: 'collection-model', params: { id: collection.id, slug: collection.slug }}">
      <q-img
        :alt="collection.name"
        :src="collection.thumbnail_url"
        height="180px"
        class="bg-grey-9 collection-thumbnail cursor-pointer"
        img-class="collection-thumbnail"
      />
    </router-link>

    <q-card-section class="q-px-none">
      <div class="q-pb-xs text-subtitle1 ellipsis-2-lines">
        {{ collection.name }}
      </div>

      <div class="q-pb-sm text-caption text-grey-5 ellipsis-2-lines">
        {{ Number(collection.item_count || 0) | approximate }} items
      </div>

      <tags
        v-if="collection.relationships.tags.length"
        :items="collection.relationships.tags"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import CollectionModel from 'src/models/Collection'

export default {
  components: {
    Tags: () => import('components/tag/Collection')
  },

  props: {
    collection: {
      type: CollectionModel,
      required: true
    }
  }
}
</script>
