<template>
  <nav>
    <section class="bg-grey-10 q-py-lg">
      <div class="container row items-start">
        <div class="col">
          <div class="text-subtitle1 ellipsis-3-lines text-grey-5">
            {{ model.name }}
          </div>
          <div
            v-if="model.metadata"
            class="text-subtitle2 text-grey-6"
          >
            {{ Number(model.metadata.duration) | timestamp }} •
            {{ Number(model.views) | approximate }} views
          </div>
          <tags
            v-if="model.relationships.tags.length"
            :items="model.relationships.tags"
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
      class="row no-wrap justify-center items-center q-py-md bg-grey-8"
    >
      <actions />
    </section>
  </nav>
</template>

<script>
export default {
  components: {
    Actions: () => import('components/video/Actions'),
    Tags: () => import('components/ui/Tags')
  },

  props: {
    model: {
      type: Object,
      required: true
    }
  }
}
</script>
