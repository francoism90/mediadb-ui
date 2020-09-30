<template>
  <q-card
    square
    class="bg-grey-12 collection-item"
    draggable="false"
  >
    <q-img
      :alt="collection.name"
      :src="collection.thumbnail_url"
      height="160px"
      loading="lazy"
      class="bg-grey-8 cursor-pointer"
      img-class="collection-placeholder"
      @click="detailsModal"
    />

    <q-card-section class="q-py-md">
      <div class="text-subtitle1 ellipsis-2-lines text-grey-5">
        {{ collection.name }}
      </div>

      <div class="text-subtitle1 ellipsis-2-lines text-grey-6">
        <span v-if="collection.modelName">
          {{ collection.modelName }} •
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
import DetailsComponent from 'components/collection/Details'
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

  methods: {
    detailsModal () {
      this.$q.dialog({
        component: DetailsComponent,
        parent: this,
        id: this.collection.id || null
      })
    }
  }
}
</script>
