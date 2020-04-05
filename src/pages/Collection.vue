<template>
  <q-page v-if="ready" :key="data.id" class="container fluid">
    <section class="q-pt-lg">
      <div class="text-h5">{{ data.name }}</div>
      <div class="text-subtitle2 text-grey-4">
        <router-link class="text-grey-4 no-decoration" to="/">{{ data.relationships.user.name }}</router-link> •
        {{ Number(data.media) | approximate }} items •
        {{ Number(data.views) | approximate }} views
      </div>
    </section>

    <q-btn-group class="q-py-md" unelevated>
      <filters :namespace="namespace" field="sort" :options="sorters" />
    </q-btn-group>

    <infinite
      :namespace="namespace"
      :api-route="apiRoute"
      item-component="Video"
    />
  </q-page>
</template>

<script>
import paginateModule from 'src/store/paginate'
import modelModule from 'src/store/model'
import { mapGetters } from 'vuex'

export default {
  components: {
    Infinite: () => import('components/paginate/Infinite'),
    Filters: () => import('components/paginate/Filters')
  },

  meta () {
    return {
      title: this.title
    }
  },

  data () {
    return {
      title: '',
      namespace: `collect_${this.id}`,
      apiRoute: {
        path: 'media',
        params: {
          include: 'model,tags',
          'filter[collect]': this.id
        }
      },
      sorters: [
        { label: 'Recommended for You', value: 'recommended' },
        { label: 'Trending', value: 'trending' },
        { label: 'Most recent', value: 'recent' },
        { label: 'Most viewed', value: 'views' },
        { label: 'Popular this week', value: 'popular-week' },
        { label: 'Popular this month', value: 'popular-month' }
      ]
    }
  },

  props: {
    id: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      default: null
    }
  },

  computed: {
    ...mapGetters('collect', {
      ready: 'isReady',
      data: 'getData',
      meta: 'getMeta'
    })
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetch(to.params.id)
      next()
    })
  },

  beforeRouteUpdate (to, from, next) {
    this.fetch(to.params.id)
    next()
  },

  created () {
    if (!this.$store.state.collect) {
      this.$store.registerModule('collect', modelModule)
    }

    if (!this.$store.state[this.namespace]) {
      this.$store.registerModule(this.namespace, paginateModule)
    }
  },

  methods: {
    async fetch (id) {
      await this.$store.dispatch('collect/fetch', {
        path: 'collect/' + id,
        params: {
          include: 'tags,user'
        }
      })

      this.title = this.data.name
    }
  }
}
</script>
