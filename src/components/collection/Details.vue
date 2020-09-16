<template>
  <q-dialog
    :key="id"
    ref="dialog"
    maximized
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-inner-loading :showing="!collection">
        <q-spinner
          size="50px"
          color="primary"
        />
      </q-inner-loading>

      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-card-section
          v-if="collection"
          class="q-pa-none"
        >
          <item-title :collection="collection" />
          <item-panels :collection="collection" />
        </q-card-section>
      </transition>
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
    if (!this.$store.hasModule('videos')) {
      this.$store.registerModule('videos', PaginateModule)
    }

    this.colection = null

    try {
      this.collection = await CollectionModel.$find(this.id)
    } catch {
      //
    }
  }
}
</script>
