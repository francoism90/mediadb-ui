<template>
  <q-form class="toolbar-input">
    <q-input
      v-model="query"
      debounce="900"
      type="search"
      placeholder="Search tags"
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
  getterType: 'tags/getOption',
  mutationType: 'tags/setOption'
})

export default {
  computed: {
    ...mapFields([
      'query'
    ])
  }
}
</script>
