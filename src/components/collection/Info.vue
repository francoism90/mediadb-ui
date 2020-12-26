<template>
  <hero :style="{ backgroundImage: 'url(' + model.thumbnail_url + ')' }">
    <div class="q-pt-lg text-h4 text-white ellipsis-2-lines">
      {{ model.name }}
    </div>

    <div class="text-subtitle1 text-grey-3 ellipsis-2-lines">
      {{ Number(model.item_count) | approximate }} items •
      {{ Number(model.views) | approximate }} views
    </div>

    <tags
      v-if="model.relationships.tags.length"
      :items="model.relationships.tags"
      class="q-pt-md"
      route="collection"
      store="collections"
      item-color="grey-11"
    />

    <div
      v-if="model.overview"
      class="q-pt-sm text-subtitle1 text-grey-3 ellipsis-3-lines"
    >
      {{ model.overview }}
    </div>

    <div class="q-py-lg q-gutter-sm">
      <q-btn
        flat
        dense
        no-caps
        class="transparent-1 q-pr-sm"
        text-color="grey-1"
        size="13px"
        label="Subscribe"
        :icon="model.is_subscribed ? 'o_check' : 'o_add'"
        @click="subscribeModel"
      />

      <q-btn
        v-if="$auth.check({ permissions: 'edit collections'})"
        flat
        dense
        no-caps
        class="transparent-1 q-pr-sm"
        text-color="grey-1"
        size="13px"
        label="Edit"
        icon="o_article"
        @click="editModel"
      />
    </div>
  </hero>
</template>

<script>
import EditComponent from 'components/collection/Edit'

export default {
  components: {
    Hero: () => import('components/ui/Hero'),
    Tags: () => import('components/tag/List')
  },

  computed: {
    model () {
      return this.$store.getters['collection/getModel']
    }
  },

  methods: {
    editModel () {
      this.$q.dialog({
        component: EditComponent,
        parent: this,
        id: this.model.id
      })
    },

    subscribeModel () {
      if (this.model.is_subscribed) {
        this.model.subscribe({ method: 'DELETE' })
        return
      }

      this.model.subscribe()
    }
  }
}
</script>
