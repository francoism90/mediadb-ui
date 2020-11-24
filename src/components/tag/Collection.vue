<template>
  <div class="q-gutter-xs">
    <q-chip
      v-for="(item, index) in items"
      :key="index"
      :label="item.name"
      size="0.75rem"
      color="grey-12"
      class="q-py-xs q-px-sm"
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
      this.$store.dispatch('collections/resetItems', {
        options: {
          query: 'tag:' + model.slug
        }
      })

      if (this.$route.name !== 'collection') {
        this.$router.push({ name: 'collection' })
      }
    }
  }
}
</script>
