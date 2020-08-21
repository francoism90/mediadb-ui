<template>
  <q-item
    v-ripple
    draggable="false"
    clickable
    dark
    class="no-padding"
    @click="onClick"
  >
    <q-item-section side>
      <q-avatar
        square
        size="48px"
        color="grey-6"
        text-color="grey-3"
      >
        {{ data.name.charAt(0) }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ data.name }}</q-item-label>
      <q-item-label
        class="text-grey-5"
        caption
      >
        {{ Number(data.item_count || 0) | approximate }} items
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  methods: {
    onClick () {
      this.$router.push({
        name: 'search',
        query: {
          q: 'tag:' + this.data.slug,
          type: '',
          id: +new Date()
        }
      })
    }
  }
}
</script>
