<template>
  <div class="q-gutter-xs">
    <q-chip
      v-for="(item, index) in items"
      :key="index"
      :label="item.name"
      :color="itemColor"
      :size="itemSize"
      :class="itemClass"
      :dense="itemDense"
      clickable
      square
      @click.prevent="onClick(item)"
    />
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: null
    },

    itemClass: {
      type: String,
      default: 'q-py-xs q-px-sm'
    },

    itemColor: {
      type: String,
      default: 'grey-8'
    },

    itemDense: {
      type: Boolean,
      default: true
    },

    itemSize: {
      type: [Number, String],
      default: '0.925rem'
    }
  },

  methods: {
    onClick (model) {
      this.$store.dispatch('videos/resetItems', {
        options: {
          tags: [model]
        }
      })

      if (this.$route.name !== 'home') {
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>
