<template>
  <div class="q-gutter-xs">
    <q-chip
      v-for="(item, index) in items"
      :key="index"
      :label="item.name"
      :color="itemColor"
      :size="itemSize"
      :class="itemClass"
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
    },

    itemClass: {
      type: String,
      default: 'q-py-xs q-px-sm'
    },

    itemColor: {
      type: String,
      default: 'grey-9'
    },

    itemSize: {
      type: [Number, String],
      default: '0.75rem'
    },

    route: {
      type: String,
      default: 'video'
    },

    store: {
      type: String,
      default: 'videos'
    }
  },

  methods: {
    onClick (model) {
      this.$store.dispatch(`${this.store}/resetItems`, {
        options: {
          query: 'tag:' + model.slug
        }
      })

      if (this.$route.name === this.route) {
        return
      }

      this.$router.push({ name: this.route })
    }
  }
}
</script>
