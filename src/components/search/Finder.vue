<template>
  <q-dialog
    ref="dialog"
    maximized
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <div class="row q-px-xl q-pt-lg q-pb-md">
        <q-input
          v-model="query"
          type="search"
          maxlength="128"
          class="col"
          color="grey-6"
          placeholder="Search"
          debounce="500"
          autofocus
          square
          clearable
        >
          <template #prepend>
            <q-icon
              v-close-popup
              class="cursor-pointer"
              dense
              flat
              text-color="white"
              name="o_arrow_back"
              size="28px"
            />
          </template>
        </q-input>
      </div>

      <q-card-section class="q-px-xl">
        <template v-if="query">
          <search-results :query="query" />
        </template>

        <template v-else>
          <search-recent />
        </template>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { dialogHandler } from 'src/mixins/dialog'

const { mapFields } = createHelpers({
  getterType: 'session/getState',
  mutationType: 'session/setState'
})

export default {
  components: {
    SearchRecent: () => import('components/search/Recent'),
    SearchResults: () => import('components/search/Results')
  },

  mixins: [dialogHandler],

  computed: {
    ...mapFields({
      query: 'search.query'
    })
  }
}
</script>
