<template>
  <div>
    <q-chip
      v-for="(item, index) in items"
      :key="index"
      dark
      square
      clickable
      color="grey-8"
      class="q-ml-none q-mr-sm text-weight-light"
      :size="size"
      @click="onClick(item)"
    >
      <q-avatar
        :icon="avatar(item).icon"
        :color="avatar(item).color"
        text-color="white"
      /> {{ item.name }}
    </q-chip>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: null
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

  methods: {
    avatar (item) {
      return this.avatars.find(x => x.value === (item.type || 'default'))
    },

    onClick (value) {
      this.$router.push({
        name: 'search',
        query: {
          q: 'tag:' + value.slug,
          type: '',
          id: +new Date()
        }
      })
    }
  }
}
</script>
