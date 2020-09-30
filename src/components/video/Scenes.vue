<template>
  <div
    v-if="video.sprite && video.sprite.length"
    class="row wrap justify-start items-start content-start q-col-gutter-md"
  >
    <q-intersection
      v-for="(item, index) in video.sprite"
      :key="index"
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3 scene-item"
    >
      <q-item
        v-ripple
        clickable
        class="no-padding section-item"
        draggable="false"
        @click="onClick(item)"
      >
        <q-item-section side>
          <q-avatar
            square
            class="scene-placeholder"
          >
            <q-img
              :alt="`Scene ${item.id}`"
              :src="video.sprite_url"
              :position="`-${item.x}px -${item.y}px`"
              width="128px"
              height="64px"
              loading="lazy"
              img-class="scene-placeholder"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="ellipsis">
            Scene {{ item.id }}
          </q-item-label>

          <q-item-label
            class="text-grey-5"
            caption
          >
            {{ Number(item.timecode || 0) | timestamp }} /
            {{ Number(video.duration || 0) | timestamp }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-intersection>
  </div>
</template>

<script>
import WatchComponent from 'components/video/Watch'
import VideoModel from 'src/models/Video'

export default {
  props: {
    video: {
      type: VideoModel,
      required: true
    }
  },

  methods: {
    onClick (item) {
      this.$q.dialog({
        component: WatchComponent,
        parent: this,
        id: this.video.id,
        timecode: item.timecode || 0
      })
    }
  }
}
</script>
