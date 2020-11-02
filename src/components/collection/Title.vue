<template>
  <q-img
    :alt="model.name"
    :src="model.thumbnail_url"
    loading="lazy"
    class="collection-title"
    img-class="collection-title-placeholder"
  >
    <div class="absolute-full collection-title-elements">
      <div class="container absolute-top">
        <div class="collection-title-details">
          <div class="q-pt-lg text-h4 text-white ellipsis-2-lines">
            {{ model.name }}
          </div>

          <div class="text-subtitle1 text-grey-3 ellipsis-2-lines">
            {{ Number(model.item_count) | approximate }} items •
            {{ Number(model.views) | approximate }} views
          </div>

          <div
            v-if="model.overview"
            class="q-pt-sm text-subtitle1 text-grey-3 ellipsis-3-lines"
          >
            {{ model.overview }}
          </div>
        </div>

        <tags
          v-if="model.relationships.tags.length"
          :items="model.relationships.tags"
          item-component="Collection"
          class="q-pt-lg"
        />

        <div class="q-pt-lg q-gutter-sm">
          <q-btn
            flat
            dense
            class="transparent-1 q-pr-sm"
            text-color="primary"
            size="13px"
            icon="o_play_arrow"
            label="Play All"
            @click="queueModal"
          />

          <q-btn
            flat
            round
            class="transparent-1"
            text-color="grey-1"
            size="13px"
            :icon="model.is_subscribed ? 'o_check' : 'o_add'"
            @click="subscribeModal"
          />

          <q-btn
            v-if="$auth.check({ permissions: 'edit collections'})"
            flat
            round
            class="transparent-1"
            text-color="grey-1"
            size="13px"
            icon="o_article"
            @click="editModal"
          />
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

export default {
  components: {
    Tags: () => import('components/tag/List')
  },

  computed: {
    model () {
      return this.$store.getters['collection/getModel']
    }
  },

  methods: {
    editModal () {
      this.$q.dialog({
        component: EditComponent,
        parent: this,
        id: this.model.id
      })
    },

    subscribeModal () {
      if (this.model.is_subscribed) {
        this.model.unsubscribe()
        return
      }

      this.model.subscribe()
    },

    queueModal () {
      //
    }
  }
}
</script>
