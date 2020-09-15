<template>
  <q-item
    v-ripple
    clickable
    class="no-padding tag-item"
    draggable="false"
  >
    <q-item-section side>
      <q-avatar
        square
        size="48px"
        color="grey-6"
        text-color="grey-3"
      >
        {{ tag.name.charAt(0) }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="ellipsis-2-lines">
        {{ tag.name }}
      </q-item-label>

      <q-item-label
        class="text-grey-5"
        caption
      >
        {{ Number(tag.item_count || 0) | approximate }} items
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import TagModel from 'src/models/Tag'

export default {
  props: {
    tag: {
      type: TagModel,
      required: true
    }
  }
}
</script>
