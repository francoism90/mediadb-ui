<template>
  <div class="q-pb-md">
    <div class="row q-py-lg">
      <div class="col">
        <span class="text-body2">{{ label }}</span>
      </div>

      <div v-if="summary" class="col-auto">
        <a class="text-caption text-uppercase cursor-pointer" @click="viewAll">
          View All
        </a>
      </div>
    </div>

    <infinite
      :namespace="namespace"
      :item-component="itemComponent"
      :loadable="!summary"
    />
  </div>
</template>

<script>
export default {
  components: {
    Infinite: () => import('components/paginate/Infinite')
  },

  props: {
    namespace: {
      type: String,
      default: null
    },

    itemComponent: {
      type: String,
      default: null
    },

    label: {
      type: String,
      default: null
    },

    summary: {
      type: Boolean,
      default: false
    },

    query: {
      type: String,
      default: null
    }
  },

  methods: {
    viewAll () {
      this.$store.dispatch('search/query', {
        type: this.namespace,
        query: this.query
      })
    }
  }
}
</script>
