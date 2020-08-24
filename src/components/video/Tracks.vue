<template>
  <q-card
    v-if="video && video.tracks"
    dark
    style="width: 520px"
  >
    <q-inner-loading
      dark
      :showing="!video.id"
    >
      <q-spinner
        size="50px"
        color="primary"
      />
    </q-inner-loading>

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-form>
        <q-card-section class="row items-center">
          <div class="text-h6">
            {{ video.name }}
          </div>
          <q-space />
          <q-btn
            v-close-popup
            icon="close"
            round
            unelevated
            color="grey-9"
            dense
            size="12px"
          />
        </q-card-section>

        <q-separator dark />

        <q-card-section>
          <q-list
            v-for="(track, index) in tracks"
            :key="index"
          >
            <q-item
              v-if="track.id && track.label"
              v-ripple
              tag="label"
            >
              <q-item-section>
                <q-item-label>{{ track.label }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle
                  v-model="selection"
                  color="primary"
                  :val="track.id"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator dark />

        <q-card-actions
          align="right"
        >
          <q-btn
            v-close-popup
            flat
            label="Close"
            color="primary"
          />
        </q-card-actions>
      </q-form>
    </transition>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { filter, map } from 'lodash'
import Video from 'src/models/Video'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      video: null
    }
  },

  computed: {
    ...mapGetters('player', {
      tracks: 'getSubtitles'
    }),

    selection: {
      get () {
        return map(
          filter(this.tracks, { mode: 'showing' }),
          'id'
        )
      },

      set (value) {
        this.$root.$emit('playerShowTracks', value)
      }
    }
  },

  async created () {
    this.video = await Video.$find(this.data.id)
  }
}
</script>
