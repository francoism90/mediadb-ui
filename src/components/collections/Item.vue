<template>
  <q-card
    square
    class="bg-grey-12 cursor-pointer collection-item"
    draggable="false"
  >
    <q-img
      :alt="collection.name"
      :src="collection.thumbnail_url"
      height="160px"
      loading="lazy"
      class="bg-grey-8"
      img-class="collection-item"
    />

    <q-card-section class="q-py-md">
      <div class="text-subtitle1 ellipsis-2-lines text-grey-5">
        {{ collection.name }}
      </div>

      <div class="text-subtitle1 ellipsis-2-lines text-grey-6">
        <span v-if="showModel">
          {{ collection.relationships.model.name }} •
        </span>
        {{ Number(collection.item_count || 0) | approximate }} items
      </div>

      <tags
        v-if="collection.relationships.tags.length"
        :items="collection.relationships.tags"
        class="q-pt-xs"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import CollectionModel from 'src/models/Collection'

export default {
  components: {
    Tags: () => import('components/ui/Tags')
  },

  props: {
    collection: {
      type: CollectionModel,
      required: true
    }
  },

  data () {
    return {
      hideTypes: ['title']
    }
  },

  computed: {
    showModel () {
      return !this.hideTypes.includes(
        this.collection.type
      )
    }
  }
}
</script>
