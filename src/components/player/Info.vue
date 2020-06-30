<template>
  <q-card v-if="ready" :key="data.id" dark style="width: 530px">
    <q-card-section style="max-height: 50vh" class="scroll q-gutter-y-md">
      <p>
        {{ data.properties }}
      </p>
    </q-card-section>

    <q-card-actions align="right" class="q-mx-sm">
      <q-btn flat label="OK" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import modelModule from 'src/store/model'

export default {
  props: {
    props: {
      type: Object,
      required: true
    }
  },

  created () {
    if (!this.$store.hasModule('model_info')) {
      this.$store.registerModule('model_info', modelModule)
    }

    this.setModel()
  },

  beforeDestroy () {
    this.$store.unregisterModule('model_info')
  },

  computed: {
    ...mapGetters('model_info', {
      ready: 'isReady',
      data: 'getData'
    })
  },

  methods: {
    async setModel () {
      await this.$store.dispatch('model_info/fetch', {
        path: 'media/' + this.props.id
      })
    }
  }
}
</script>
