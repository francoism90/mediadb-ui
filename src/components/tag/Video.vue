<template>
  <div class="q-pt-xs q-gutter-xs">
    <q-chip
      v-for="(item, index) in items"
      :key="index"
      :label="item.name"
      size="0.75rem"
      color="grey-8"
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
      this.$store.dispatch('videos/resetItems', {
        options: {
          query: 'tag:' + model.slug
        }
      })

      if (this.$route.name !== 'video') {
        this.$router.push({ name: 'video' })
      }
    }
  }
}
</script>
