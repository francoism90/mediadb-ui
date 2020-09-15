<template>
  <div
    v-if="video.sprite && video.sprite.length"
    class="container"
  >
    <q-card-section
      class="q-px-none"
    >
      <div class="text-caption text-uppercase text-grey q-pb-sm">
        Video Segments
      </div>

      <q-scroll-area
        horizontal
        visible
        class="frame-container"
      >
        <div class="row no-wrap justify-start items-start content-start q-col-gutter-sm">
          <q-intersection
            v-for="(item, index) in video.sprite"
            :key="index"
            class="frame-item cursor-pointer"
            @click="watchRoute(item)"
          >
            <q-card
              square
              class="cursor-pointer frame-item"
              draggable="false"
            >
              <q-img
                :alt="`Frame ${item.id}`"
                :src="video.sprite_url"
                :position="`-${item.x}px -${item.y}px`"
                width="220px"
                height="160px"
                loading="lazy"
                img-class="frame-item"
              >
                <div class="absolute-bottom-right">
                  <q-badge class="transparent-dimmed text-caption q-ma-sm">
                    {{ Number(item.timecode || 0) | timestamp }}
                  </q-badge>
                </div>
              </q-img>
            </q-card>
          </q-intersection>
        </div>
      </q-scroll-area>
    </q-card-section>
  </div>
</template>

<script>
import VideoModel from 'src/models/Video'

export default {
  props: {
    video: {
      type: VideoModel,
      required: true
    }
  },

  methods: {
    watchRoute (item) {
      this.$router.push({
        name: 'watch',
        params: {
          id: this.video.id,
          slug: this.video.slug
        },
        query: {
          id: +new Date(),
          time: item.timecode || 0
        }
      })
    }
  }
}
</script>
