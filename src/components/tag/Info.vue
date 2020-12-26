<template>
  <hero>
    <div class="q-pt-lg text-h4 text-white ellipsis-2-lines">
      {{ model.name }}
    </div>

    <div class="text-subtitle1 text-grey-3 ellipsis-2-lines">
      {{ Number(model.items) | approximate }} items •
      {{ Number(model.views) | approximate }} views
    </div>

    <div class="q-py-lg q-gutter-sm">
      <q-btn
        flat
        dense
        no-caps
        class="transparent-1 q-pr-sm"
        text-color="primary"
        size="13px"
        icon="o_play_arrow"
        label="Play All"
      />

      <q-btn
        v-if="$auth.check({ permissions: 'edit tags'})"
        flat
        dense
        no-caps
        class="transparent-1 q-pr-sm"
        text-color="grey-1"
        size="13px"
        icon="o_article"
        label="Edit"
        @click="editModel"
      />
    </div>
  </hero>
</template>

<script>
import EditComponent from 'components/tag/Edit'

export default {
  components: {
    Hero: () => import('components/ui/Hero')
  },

  computed: {
    model () {
      return this.$store.getters['tag/getModel']
    }
  },

  methods: {
    editModel () {
      this.$q.dialog({
        component: EditComponent,
        parent: this,
        id: this.model.id
      })
    }
  }
}
</script>
