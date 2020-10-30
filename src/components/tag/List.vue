<template>
  <component
    :is="itemComponent"
    :items="items"
  />
</template>

<script>
export default {
  components: {
    Collection: () => import('components/tag/Collection'),
    Video: () => import('components/tag/Video')
  },

  props: {
    itemComponent: {
      type: String,
      required: true
    },

    items: {
      type: Array,
      default: null
    }
  }
}
</script>
