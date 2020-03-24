<template>
  <div v-if="state.ready" :key="id">
    <q-infinite-scroll @load="onLoad">
      <div :class="rowClass">
        <div v-for="(item, index) in state.data" :key="index" :class="columnClass">
          <component :is="itemComponent" :class="componentClass" :item="item" />
        </div>
      </div>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner color="primary" size="xs" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script>
export default {
  components: {
    Collect: () => import('components/paginate/item/Collect'),
    Topic: () => import('components/paginate/item/Topic'),
    Video: () => import('components/paginate/item/Video')
  },

  data () {
    return {
      id: +new Date()
    }
  },

  props: {
    namespace: {
      type: String,
      required: true
    },

    apiRoute: {
      type: Object,
      default: () => {
        return {
          path: null,
          params: {}
        }
      }
    },

    itemComponent: {
      type: String,
      required: true
    },

    rowClass: {
      type: String,
      default: 'row q-col-gutter-md items'
    },

    columnClass: {
      type: String,
      default: 'col-xs-12 col-sm-6 col-md-4 col-lg-2'
    },

    componentClass: {
      type: String,
      default: 'item'
    }
  },

  computed: {
    state () {
      return this.$store.state[this.namespace]
    }
  },

  created () {
    this.$store.dispatch(this.namespace + '/create', this.apiRoute)
  },

  mounted () {
    this.$store.subscribeAction((action) => {
      if (action.type === this.namespace + '/reset') {
        this.id += 1
      }
    })
  },

  methods: {
    async onLoad (index, done) {
      // Fetch items
      const response = await this.$store.dispatch(this.namespace + '/fetch')
      const { next = false } = response

      // Stop fetching when true
      await done(!next)
    }
  }
}
</script>
