<template>
  <q-item
    clickable
    manual-focus
    class="no-padding search-item"
    draggable="false"
    :to="{ name: 'video-details', params: { id: data.id, slug: data.slug } }"
  >
    <q-item-section side>
      <q-avatar
        square
        size="48px"
        color="grey-6"
        text-color="grey-3"
      >
        <q-img
          :alt="data.name.charAt(0)"
          :src="data.thumbnail_url"
          height="100%"
          width="100%"
        />
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
        {{ String(data.created_at) | datestamp }} •
        {{ Number(data.duration || 0) | timestamp }}
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
