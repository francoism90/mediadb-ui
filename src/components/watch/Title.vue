<template>
  <q-card-section class="row items-center">
    <div class="text-h6 ellipsis">
      {{ video.name }}
    </div>

    <q-space />

    <q-btn
      v-close-popup
      icon="close"
      color="grey-9"
      size="12px"
      dense
      round
      unelevated
    />
  </q-card-section>
</template>

<script>
import VideoModel from 'src/models/Video'

export default {
  props: {
    video: {
      type: VideoModel,
      required: true
    }
  }
}
</script>
