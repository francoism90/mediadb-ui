<template>
  <div>
    <router-link
      v-for="(item, index) in items"
      :key="index"
      :to="{ name: 'collection-model', params: { id: item.id, slug: item.slug } }"
    >
      <span v-if="index != 0">{{ separator }}</span>
      <span>{{ item.name }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: null
    },

    separator: {
      type: String,
      default: ' • '
    }
  }
}
</script>
