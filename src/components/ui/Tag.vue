<template>
  <q-chip
    dark
    square
    clickable
    @click.prevent="onClick(item)"
    color="grey-2"
    class="q-ml-none q-mr-sm text-weight-light"
    :size="size"
  >
    <q-avatar :icon="icon" :color="color" text-color="white" /> {{ item.name }}
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
          color: 'grey-1',
          icon: 'star'
        },
        {
          value: 'default',
          color: 'grey-1',
          icon: 'label'
        },
        {
          value: 'language',
          color: 'grey-1',
          icon: 'language'
        },
        {
          value: 'person',
          color: 'grey-1',
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
      this.$store.dispatch('search/query', '#' + value.slug)

      if (this.$route.name !== 'search') {
        this.$router.replace({ name: 'search' })
      }
    }
  }
}
</script>
