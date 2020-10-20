<template>
  <q-page :key="id">
    <template v-if="error">
      {{ error }}
    </template>

    <template v-if="tag">
      <tag-title :tag="tag" />
    </template>
  </q-page>
</template>

<script>
import TagModel from 'src/models/Tag'

export default {
  components: {
    TagTitle: () => import('components/tag/Title')
  },

  props: {
    id: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      error: null,
      title: null,
      tag: null
    }
  },

  watch: {
    $route: 'fetchModel'
  },

  meta () {
    return {
      title: this.title
    }
  },

  created () {
    this.fetchModel()
  },

  methods: {
    async fetchModel () {
      try {
        if (this.tag && this.tag.id !== this.id) {
          this.error = this.title = this.tag = null
        }

        this.tag = await TagModel.$find(this.id)
        this.title = this.tag.name
      } catch {
        this.error = 'Unable to load tag'
      }
    }
  }
}
</script>
