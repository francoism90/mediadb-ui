<template>
  <div class="filter-tags">
    <q-separator />

    <q-expansion-item
      v-model="showing"
      :label="label"
    >
      <q-list
        v-if="showing"
        class="scroll"
        style="max-height: 200px;"
      >
        <q-infinite-scroll
          :disable="!isReady"
          :offset="200"
          @load="onLoad"
        >
          <q-item
            v-for="(item, index) in state.data"
            :key="index"
            v-ripple
            tag="label"
            dense
          >
            <q-item-section side>
              <q-checkbox
                v-model="tagModel"
                :val="item"
                dense
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.name }} ({{ item.items | approximate }})</q-item-label>
            </q-item-section>
          </q-item>
        </q-infinite-scroll>
      </q-list>
    </q-expansion-item>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import { debounce } from 'quasar'
import Tag from 'src/models/Tag'

const { mapFields } = createHelpers({
  getterType: 'videos/getOption',
  mutationType: 'videos/setOption'
})

export default {
  props: {
    label: {
      type: String,
      required: true
    },

    namespace: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      showing: false
    }
  },

  computed: {
    state () {
      return this.$store.state[this.namespace]
    },

    isLoaded () {
      return this.$store.getters[this.namespace + '/isLoaded']
    },

    isReady () {
      return this.$store.getters[this.namespace + '/isReady']
    },

    ...mapFields([
      'tags'
    ]),

    tagModel: {
      get () {
        return this.tags
      },

      set: debounce(function (value) {
        this.tags = value
      }, 150)
    }
  },

  created () {
    this.initialize({
      name: `${this.namespace}_tags_` + new Date()
    })
  },

  methods: {
    ...mapActions({
      initialize (dispatch, payload) {
        return dispatch(this.namespace + '/initialize', payload)
      },

      resetItems (dispatch, payload) {
        return dispatch(this.namespace + '/resetItems', payload)
      },

      setPage (dispatch, payload) {
        return dispatch(this.namespace + '/setPage', payload)
      }
    }),

    async setModels () {
      const response = await Tag
        .where('type', this.type)
        .include('model', 'tags')
        .append('item_count')
        .orderBy('name')
        .page(this.state.page)
        .limit(15)
        .get()

      this.setPage(response)
    },

    async onLoad (index, done) {
      await this.setModels()
      done(this.isLoaded)
    },

    async onRefresh (done) {
      await this.resetItems()
      done()
    }
  }
}
</script>
