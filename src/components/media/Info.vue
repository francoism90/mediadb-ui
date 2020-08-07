<template>
  <div>
    <section class="bg-grey-10 q-py-lg">
      <div class="container row items-start">
        <div class="col">
          <div class="text-subtitle1 text-grey-5">
            {{ data.name }}
          </div>
          <div
            v-if="data.metadata"
            class="text-subtitle2 text-grey-6"
          >
            {{ Number(data.metadata.duration) | timestamp }} •
            {{ Number(data.views) | approximate }} views
          </div>
          <tags
            v-if="data.relationships.tags.length"
            :items="data.relationships.tags"
            class="q-pt-xs"
          />
        </div>

        <div
          v-if="$q.screen.gt.xs"
          class="col-auto"
        >
          <actions />
        </div>
      </div>
    </section>

    <section
      v-if="$q.screen.lt.sm"
      class="bg-grey-8 text-center"
    >
      <actions class="container q-py-md" />
    </section>

    <section class="bg-grey-9">
      <subscribe class="container q-py-md" />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
    Actions: () => import('components/media/Actions'),
    Subscribe: () => import('components/media/Subscribe'),
    Tags: () => import('components/ui/Tags')
  },

  computed: {
    ...mapState('media', [
      'data'
    ])
  }
}
</script>
