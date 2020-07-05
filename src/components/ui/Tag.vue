<template>
  <q-chip
    dark
    square
    clickable
    color="grey-8"
    class="q-ml-none q-mr-sm text-weight-light"
    :size="size"
    @click.prevent="onClick(item)"
  >
    <q-avatar
      :icon="icon"
      :color="color"
      text-color="white"
    /> {{ item.name }}
  </q-chip>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },

    size: {
      type: String,
      default: '0.75rem'
    }
  },

  data () {
    return {
      avatars: [
        {
          value: 'genre',
          color: 'grey-9',
          icon: 'star'
        },
        {
          value: 'default',
          color: 'grey-9',
          icon: 'label'
        },
        {
          value: 'language',
          color: 'grey-9',
          icon: 'language'
        },
        {
          value: 'person',
          color: 'grey-9',
          icon: 'person'
        }
      ]
    }
  },

  computed: {
    avatar () {
      return this.avatars.find(x => x.value === (this.item.type || 'default'))
    },

    icon () {
      return this.avatar.icon
    },

    color () {
      return this.avatar.color
    }
  },

  methods: {
    onClick (value) {
      this.$store.dispatch('search/query', {
        type: null,
        query: '#' + value.slug
      })

      if (this.$route.name !== 'search') {
        this.$router.push({ name: 'search' })
      }
    }
  }
}
</script>
