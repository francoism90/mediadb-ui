<template>
  <q-item clickable dark class="no-padding" @click.prevent="onClick(item)" v-ripple>
      <q-item-section side>
        <q-avatar square size="48px" color="grey-4" text-color="grey-6">
          {{ item.name.charAt(0) }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ item.name }}</q-item-label>
        <q-item-label class="text-grey-5" caption>{{ item.media }} items</q-item-label>
      </q-item-section>
    </q-item>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      avatars: [
        {
          value: 'category',
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
          value: 'people',
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
    }
  }
}
</script>
