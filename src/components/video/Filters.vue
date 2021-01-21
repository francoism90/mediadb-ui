<template>
  <q-btn
    no-caps
    color="grey-12"
    text-color="white"
    dense
    unelevated
    icon="o_filter_alt"
  >
    <dropdown>
      <template #toolbar-title>
        Filters
      </template>

      <q-list
        separator
        style="width: 240px; max-width: 100vw;"
      >
        <types />
        <duration />
        <tags
          v-for="(tagger, index) in taggers"
          :key="index"
          :label="tagger.label"
          :type="tagger.type"
          :namespace="tagger.namespace"
        />
      </q-list>
    </dropdown>
  </q-btn>
</template>

<script>
export default {

  components: {
    Dropdown: () => import('components/ui/Dropdown'),
    Duration: () => import('components/video/FilterDuration'),
    Types: () => import('components/video/FilterType'),
    Tags: () => import('components/video/FilterTags')
  },
  data () {
    return {
      taggers: [
        { namespace: 'actors', type: 'actor', label: 'Actors' },
        { namespace: 'genres', type: 'genre', label: 'Genres' },
        { namespace: 'studios', type: 'studio', label: 'Studios' }
      ]
    }
  }
}
</script>
