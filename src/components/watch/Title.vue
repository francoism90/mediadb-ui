<template>
  <q-card-section class="row no-wrap justify-between items-center">
    <div class="col text-h6 ellipsis">
      {{ video.name }}
    </div>

    <div class="col-auto">
      <q-btn
        v-close-popup
        icon="close"
        color="grey-9"
        size="12px"
        dense
        round
        unelevated
      />
    </div>
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
