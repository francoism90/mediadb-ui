<template>
  <div class="container fluid">
    <div class="q-py-lg text-caption text-uppercase">
      Next
    </div>
    <infinite
      :namespace="namespace"
      item-component="Video"
    />
  </div>
</template>

<script>
import paginateModule from 'src/store/paginate'

export default {
  components: {
    Infinite: () => import('components/paginate/Infinite')
  },

  props: {
    data: {
      type: Object,
      required: true
    },

    meta: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      namespace: 'next',
      apiRoute: {
        path: 'media',
        params: {
          include: 'model,tags',
          'filter[related]': this.data.id,
          'page[size]': 12,
          sort: 'relevance'
        }
      }
    }
  },

  async created () {
    if (!this.$store.hasModule(this.namespace)) {
      this.$store.registerModule(this.namespace, paginateModule)

      await this.$store.dispatch(this.namespace + '/create', this.apiRoute)
    }
  },

  beforeDestroy () {
    this.$store.unregisterModule(this.namespace)
  }
}
</script>
