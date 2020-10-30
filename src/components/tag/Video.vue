<template>
  <div class="q-pt-xs q-gutter-xs">
    <q-chip
      v-for="(item, index) in items"
      :key="index"
      :label="item.name"
      size="0.75rem"
      color="grey-9"
      clickable
      square
      @click="onClick(item)"
    />
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'videos/getOption',
  mutationType: 'videos/setOption'
})

export default {
  props: {
    items: {
      type: Array,
      default: null
    }
  },

  computed: {
    ...mapFields([
      'query'
    ])
  },

  methods: {
    onClick (model) {
      this.query = 'tag:' + model.slug

      if (this.$route.name !== 'video') {
        this.$router.push({ name: 'video' })
      }
    }
  }
}
</script>
