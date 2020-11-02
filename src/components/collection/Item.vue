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
        height="160px"
        loading="lazy"
        class="bg-grey-8 cursor-pointer"
        img-class="collection-placeholder"
      />
    </router-link>

    <q-card-section class="q-px-none collection-item-description">
      <div class="text-subtitle1 ellipsis-2-lines">
        {{ collection.name }}
      </div>

      <div class="text-subtitle2 ellipsis-2-lines text-grey-5">
        {{ Number(collection.item_count || 0) | approximate }} items
      </div>

      <tags
        v-if="collection.relationships.tags.length"
        :items="collection.relationships.tags"
        item-component="Collection"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import CollectionModel from 'src/models/Collection'

export default {
  components: {
    Tags: () => import('components/tag/List')
  },

  props: {
    collection: {
      type: CollectionModel,
      required: true
    }
  }
}
</script>
