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
export default {
  props: {
    items: {
      type: Array,
      default: null
    }
  },

  methods: {
    onClick (model) {
      this.$router.push({
        name: 'search',
        query: {
          q: 'tag:' + model.slug
        }
      })
    }
  }
}
</script>
