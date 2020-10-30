<template>
  <div class="container">
    <div class="q-pt-lg text-h4 text-white ellipsis-2-lines">
      {{ tag.name }}
    </div>

    <div class="text-subtitle1 text-grey-3 ellipsis-2-lines">
      {{ Number(tag.items) | approximate }} items •
      {{ Number(tag.views) | approximate }} views
    </div>
  </div>
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
