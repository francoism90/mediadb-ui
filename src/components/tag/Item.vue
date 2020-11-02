<template>
  <q-item
    v-ripple
    clickable
    manual-focus
    class="no-padding tag-item"
    active-class="text-body"
    draggable="false"
    :to="{ name: 'tag-model', params: { id: tag.id, slug: tag.slug }}"
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
      <q-item-label class="ellipsis">
        {{ tag.name }}
      </q-item-label>

      <q-item-label
        class="text-grey-5 ellipsis-2-lines"
        caption
      >
        {{ Number(tag.items || 0) | approximate }} items
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
