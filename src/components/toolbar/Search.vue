<template>
  <q-form
    v-if="visible"
    class="q-mx-md toolbar-input"
    @submit.prevent
  >
    <q-input
      v-model="query"
      debounce="900"
      type="search"
      placeholder="Search"
      clearable
      dense
      dark
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
  getterType: 'videos/getOption',
  mutationType: 'videos/setOption'
})

export default {
  computed: {
    ...mapFields([
      'query'
    ]),

    visible () {
      return this.$route.name === 'home'
    }
  }
}
</script>
