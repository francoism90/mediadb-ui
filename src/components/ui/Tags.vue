<template>
  <div class="q-gutter-xs">
    <q-chip
      v-for="(item, index) in items"
      :key="index"
      :color="labelColor"
      :size="size"
      :class="labelClass"
      square
      clickable
      @click.stop="onClick(item)"
    >
      <q-avatar
        :icon="avatar(item).icon"
        :color="avatarColor"
        :class="avatarClass"
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

    avatarColor: {
      type: String,
      default: 'grey-9'
    },

    avatarClass: {
      type: String,
      default: 'transparent-2'
    },

    labelColor: {
      type: String,
      default: 'grey-8'
    },

    labelClass: {
      type: String,
      default: 'transparent-2'
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
          icon: 'o_local_offer'
        },
        {
          value: 'default',
          icon: 'o_label'
        },
        {
          value: 'language',
          icon: 'o_language'
        },
        {
          value: 'actor',
          icon: 'o_person'
        },
        {
          value: 'studio',
          icon: 'o_movie'
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
