<template>
  <q-form class="toolbar-input">
    <q-input
      v-model="query"
      debounce="800"
      type="search"
      placeholder="Search collections"
      clearable
      dense
      square
      filled
      input-class="text-grey-5"
    >
      <template #prepend>
        <q-icon
          name="search"
          color="grey-5"
        />
      </template>
    </q-input>
  </q-form>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'collections/getOption',
  mutationType: 'collections/setOption'
})

export default {
  computed: {
    ...mapFields([
      'query'
    ])
  }
}
</script>
