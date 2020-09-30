<template>
  <div>
    <span
      v-for="(item, index) in items"
      :key="index"
    >
      <span v-if="index != 0"> • </span><span
        v-close-popup
        class="cursor-pointer"
        @click.stop="onClick(item)"
      >{{ item.name }}</span>
    </span>
  </div>
</template>

<script>
import DetailsComponent from 'components/collection/Details'

export default {
  props: {
    items: {
      type: Array,
      default: null
    }
  },

  methods: {
    onClick (model = {}) {
      this.$q.dialog({
        component: DetailsComponent,
        parent: this,
        id: model.id || null
      })
    }
  }
}
</script>
