<template>
  <div class="toolbar-input">
    <q-input
      v-model="query"
      debounce="750"
      type="search"
      placeholder="Search videos"
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
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'videos/getOption',
  mutationType: 'videos/setOption'
})

export default {
  computed: {
    ...mapFields([
      'query'
    ])
  }
}
</script>
