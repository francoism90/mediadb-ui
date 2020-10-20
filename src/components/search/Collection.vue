<template>
  <q-item
    v-ripple
    clickable
    class="no-padding search-item"
    draggable="false"
    :to="{ name: 'collection-details', params: { id: data.id, slug: data.slug } }"
  >
    <q-item-section side>
      <q-avatar
        square
        size="64px"
        color="grey-6"
        text-color="grey-3"
      >
        <q-img
          v-if="data.thumbnail_url"
          :alt="data.name"
          :src="data.thumbnail_url"
          height="100%"
          width="100%"
        />

        <span v-else>{{ data.name.charAt(0) }}</span>
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
        <span v-if="data.type !== 'title'">
          {{ data.relationships.model.name }} •
        </span>
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
