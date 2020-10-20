<template>
  <q-img
    :alt="collection.name"
    :src="collection.thumbnail_url"
    loading="lazy"
    class="collection-title"
    img-class="collection-title-placeholder"
  >
    <div class="absolute-full collection-title-elements">
      <div class="container absolute-top">
        <div class="collection-title-details">
          <div class="q-pt-lg text-h4 text-white ellipsis-2-lines">
            {{ collection.name }}
          </div>

          <div class="text-subtitle1 text-grey-3 ellipsis-2-lines">
            {{ Number(collection.item_count) | approximate }} items •
            {{ Number(collection.views) | approximate }} views
          </div>

          <div
            v-if="collection.overview"
            class="q-pt-sm text-subtitle1 text-grey ellipsis-3-lines"
          >
            {{ collection.overview }}
          </div>
        </div>

        <tags
          v-if="collection.relationships.tags.length"
          :items="collection.relationships.tags"
          class="q-pt-lg"
          size="13px"
        />

        <div class="q-pt-lg">
          <div class="q-gutter-sm">
            <q-btn
              stack
              unelevated
              class="transparent-1"
              text-color="primary"
              size="13px"
              icon="o_play_arrow"
              label="Play All"
              @click="queueModal"
            />

            <q-btn
              stack
              unelevated
              class="transparent-1"
              text-color="grey-1"
              size="13px"
              icon="o_add"
              label="Subscribe"
              @click="subscribeModal"
            />

            <q-btn
              v-if="$auth.check({ permissions: 'edit collections'})"
              stack
              unelevated
              class="transparent-1"
              text-color="grey-1"
              size="13px"
              icon="o_wysiwyg"
              label="Edit Item"
              @click="editModal"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="absolute-left collection-gradient-left" />
    <div class="absolute-right collection-gradient-right" />
    <div class="absolute-bottom collection-gradient-bottom" />
  </q-img>
</template>

<script>
import EditComponent from 'components/collection/Edit'
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
    editModal () {
      this.$q.dialog({
        component: EditComponent,
        parent: this,
        id: this.collection.id || null
      })
    },

    subscribeModal () {
      //
    },

    queueModal () {
      //
    }
  }
}
</script>
