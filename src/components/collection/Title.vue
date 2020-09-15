<template>
  <q-img
    :alt="collection.name"
    :src="collection.thumbnail_url"
    :ratio="16/9"
    class="details-header"
    loading="lazy"
  >
    <div class="absolute-full details-elements">
      <div class="container absolute-top">
        <q-card-section class="q-px-none row items-center">
          <q-space />

          <q-btn
            v-close-popup
            icon="close"
            size="20px"
            dense
            round
            unelevated
          />
        </q-card-section>
      </div>

      <div class="container absolute-bottom">
        <q-card-section class="q-pa-none">
          <div class="text-h4 text-white ellipsis">
            {{ collection.name }}
          </div>

          <div class="text-subtitle1 text-grey-1 ellipsis-2-lines">
            <span v-if="collection.modelName">
              {{ collection.modelName }} •
            </span>
            {{ Number(collection.item_count) | approximate }} items •
            {{ Number(collection.views) | approximate }} views
          </div>

          <div
            v-if="collection.description"
            class="text-subtitle1 text-grey ellipsis-3-lines"
          >
            {{ collection.description }}
          </div>
        </q-card-section>

        <q-card-section
          v-if="collection.relationships.tags.length"
          class="q-px-none q-mt-sm"
        >
          <tags
            style="max-width: 500px;"
            :items="collection.relationships.tags"
            :avatar-color="null"
            :label-color="null"
            clickable
            size="13px"
          />
        </q-card-section>

        <q-card-section class="q-px-none q-mt-sm">
          <q-btn
            class="q-mr-sm"
            size="13px"
            label="Play All"
            color="primary"
          />

          <q-btn
            v-if="$auth.check({ permissions: 'edit collections'})"
            v-shortkey="['e']"
            size="13px"
            label="Edit Item"
            color="grey-8"
            @click="editModal"
            @shortkey="editModal"
          />
        </q-card-section>
      </div>
    </div>

    <div class="details-header-gradient-left" />
    <div class="details-header-gradient-right absolute-right" />
    <div class="details-header-gradient-bottom absolute-bottom" />
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
    pushWatch () {
      this.$router.push({
        name: 'watch',
        params: {
          id: this.collection.id,
          slug: this.collection.slug
        }
      })
    },

    editModal () {
      this.$q.dialog({
        component: EditComponent,
        parent: this,
        id: this.collection.id
      })
    }
  }
}
</script>
