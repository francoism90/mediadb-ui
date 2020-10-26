<template>
  <div
    v-if="items.length"
    class="q-pb-lg"
  >
    <q-toolbar class="q-mb-xs">
      <q-toolbar-title class="text-grey-1">
        {{ label }}
      </q-toolbar-title>
    </q-toolbar>

    <div class="row wrap justify-start items-start content-start q-col-gutter-md">
      <q-intersection
        v-for="(item, index) in items"
        :key="index"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3 search-item"
      >
        <component
          :is="itemComponent"
          :data="item"
        />
      </q-intersection>
    </div>

    <q-toolbar class="q-pt-sm">
      <router-link
        class="text-caption text-uppercase text-grey-5"
        :to="{ name: 'search', query: { q: query, t: type } }"
      >
        Show All
      </router-link>
    </q-toolbar>
  </div>
</template>

<script>
export default {
  components: {
    Collection: () => import('components/search/Collection'),
    Tag: () => import('components/search/Tag'),
    Video: () => import('components/search/Video')
  },

  props: {
    label: {
      type: String,
      required: true
    },

    itemComponent: {
      type: String,
      required: true
    },

    items: {
      type: Array,
      default: null
    },

    type: {
      type: String,
      required: true
    },

    query: {
      type: String,
      required: true
    }
  }
}
</script>
