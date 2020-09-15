<template>
  <q-card-section class="q-px-none">
    <q-list
      v-for="(subtitle, index) in video.subtitles"
      :key="index"
    >
      <q-item
        v-if="subtitle.id && subtitle.name"
        v-ripple
        tag="label"
      >
        <q-item-section>
          <q-item-label class="ellipsis">
            {{ subtitle.name }}
          </q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="form.textTracks"
            color="primary"
            :val="subtitle.id"
            @input="setTextTracks"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script>
import { formHandler } from 'src/mixins/form'
import { filter, map } from 'lodash'
import VideoModel from 'src/models/Video'

export default {
  mixins: [formHandler],

  props: {
    textTracks: {
      type: TextTrackList,
      default: null
    },

    video: {
      type: VideoModel,
      required: true
    }
  },

  computed: {
    showingTextTracks () {
      return map(
        filter(this.textTracks, { mode: 'showing' }),
        'id'
      )
    }
  },

  created () {
    this.setForm({
      textTracks: this.showingTextTracks
    })
  },

  methods: {
    setTextTracks (value) {
      this.$root.$emit('setTextTracks', value)
    }
  }
}
</script>
