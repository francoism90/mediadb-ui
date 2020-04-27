<template>
  <q-pull-to-refresh v-if="state.ready" :key="state.id" :disable="!refreshable" @refresh="onRefresh">
    <q-infinite-scroll :debounce="300" scroll-target="body" @load="onLoad">
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        name="list"
        tag="div"
        :class="rowClass"
      >
        <div v-for="(item, index) in state.data" :key="`key-${index}`" :class="columnClass">
          <component :is="itemComponent" :class="componentClass" :item="item" />
        </div>
      </transition-group>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner color="primary" size="xs" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-pull-to-refresh>
</template>

<script>
export default {
  components: {
    Collection: () => import('components/paginate/item/Collection'),
    Tag: () => import('components/paginate/item/Tag'),
    User: () => import('components/paginate/item/User'),
    Video: () => import('components/paginate/item/Video')
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
    },

    refreshable: {
      type: Boolean,
      default: false
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

  methods: {
    async onLoad (index, done) {
      // Fetch items
      const response = await this.$store.dispatch(this.namespace + '/fetch')
      const { stop = true } = response

      // Stop fetching when true
      await done(stop)
    },

    async onRefresh (done) {
      await this.$store.dispatch(this.namespace + '/reset')
      done()
    }
  }
}
</script>
