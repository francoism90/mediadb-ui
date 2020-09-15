<template>
  <q-dialog
    ref="dialog"
    maximized
    @hide="onDialogHide"
  >
    <q-card
      v-if="collection"
      class="q-dialog-plugin"
    >
      <q-inner-loading :showing="!collection.id">
        <q-spinner
          size="50px"
          color="primary"
        />
      </q-inner-loading>

      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <item-title
          v-if="collection.id"
          key="collection-title"
          :collection="collection"
        />

        <item-panels
          v-if="collection.id"
          key="collection-panels"
          :collection="collection"
        />
      </transition-group>
    </q-card>
  </q-dialog>
</template>

<script>
import { dialogHandler } from 'src/mixins/dialog'
import PaginateModule from 'src/store/paginate'
import CollectionModel from 'src/models/Collection'

export default {
  components: {
    ItemPanels: () => import('components/collection/Panels'),
    ItemTitle: () => import('components/collection/Title')
  },

  mixins: [dialogHandler],

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      collection: null
    }
  },

  async created () {
    try {
      if (!this.$store.hasModule('videos')) {
        this.$store.registerModule('videos', PaginateModule)
      }

      this.collection = await CollectionModel.$find(this.id)
    } catch {
      //
    } finally {
      //
    }
  }
}
</script>
