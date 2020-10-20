<template>
  <q-item
    v-ripple
    clickable
    class="no-padding search-item"
    draggable="false"
    :to="{ name: 'tag-details', params: { id: data.id, slug: data.slug } }"
  >
    <q-item-section side>
      <q-avatar
        square
        size="64px"
        color="grey-6"
        text-color="grey-3"
      >
        {{ data.name.charAt(0) }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="ellipsis">
        {{ data.name }}
      </q-item-label>

      <q-item-label
        class="text-grey-5 ellipsis-2-lines"
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
  }
}
</script>
