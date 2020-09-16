<template>
  <div class="q-gutter-xs">
    <q-chip
      v-for="(item, index) in items"
      :key="index"
      :color="labelColor"
      :size="size"
      class="transparent-dimmed"
      :clickable="clickable"
      square
      @click="onClick(item)"
    >
      <q-avatar
        :icon="avatar(item).icon"
        :color="avatarColor"
        class="transparent-dimmed"
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

    clickable: {
      type: Boolean,
      default: false
    },

    avatarColor: {
      type: String,
      default: 'grey-9'
    },

    labelColor: {
      type: String,
      default: 'grey-8'
    },

    size: {
      type: String,
      default: '12px'
    }
  },

  data () {
    return {
      avatars: [
        {
          value: 'genre',
          icon: 'local_offer'
        },
        {
          value: 'default',
          icon: 'label'
        },
        {
          value: 'language',
          icon: 'language'
        },
        {
          value: 'actor',
          icon: 'person'
        },
        {
          value: 'studio',
          icon: 'movie'
        }
      ]
    }
  },

  methods: {
    avatar (item) {
      return this.avatars.find(x => x.value === (item.type || 'default'))
    },

    onClick (model) {
      this.$router.push({
        name: 'search',
        query: {
          id: +new Date(),
          q: 'tag:' + model.slug
        }
      })
    }
  }
}
</script>
