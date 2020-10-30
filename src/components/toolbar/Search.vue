<template>
  <component
    :is="type.component"
    v-if="type"
  />
</template>

<script>
import { find } from 'lodash'

export default {
  components: {
    Collection: () => import('components/search/Collection'),
    Tag: () => import('components/search/Tag'),
    Video: () => import('components/search/Video')
  },

  data () {
    return {
      type: null,
      types: [
        { name: 'collection', component: 'Collection' },
        { name: 'tag', component: 'Tag' },
        { name: 'video', component: 'Video' }
      ]
    }
  },

  watch: {
    '$route' () {
      this.initialize()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      const routeName = this.$route.name || 'home'

      this.type = find(this.types, { name: routeName }) || null
    }
  }
}
</script>
