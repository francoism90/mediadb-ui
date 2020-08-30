<template>
  <q-card
    v-if="subtitles"
    dark
    style="width: 520px"
  >
    <q-inner-loading
      dark
      :showing="!subtitles.length"
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
            Subtitles & Captions
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
            v-for="(subtitle, index) in subtitles"
            :key="index"
          >
            <q-item
              v-if="subtitle.id && subtitle.label"
              v-ripple
              tag="label"
            >
              <q-item-section>
                <q-item-label>{{ subtitle.label }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle
                  v-model="selection"
                  color="primary"
                  :val="subtitle.id"
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
import { createNamespacedHelpers } from 'vuex'
import { filter, map } from 'lodash'

const { mapGetters } = createNamespacedHelpers('video/player')

export default {
  computed: {
    ...mapGetters({
      subtitles: 'getSubtitles'
    }),

    selection: {
      get () {
        return map(
          filter(this.subtitles, { mode: 'showing' }),
          'id'
        )
      },

      set (value) {
        this.$root.$emit('videoShowTracks', value)
      }
    }
  }
}
</script>
