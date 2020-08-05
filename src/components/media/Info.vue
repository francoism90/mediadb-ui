<template>
  <div>
    <section class="bg-grey-10 q-py-lg">
      <div class="container row items-start">
        <div class="col">
          <div class="text-subtitle1 text-grey-5">
            {{ media.name }}
          </div>
          <div
            v-if="media.metadata"
            class="text-subtitle2 text-grey-6"
          >
            {{ Number(media.metadata.duration) | timestamp }} •
            {{ Number(media.views) | approximate }} views
          </div>
          <tags
            v-if="media.relationships.tags.length"
            :items="media.relationships.tags"
            class="q-pt-xs"
          />
        </div>

        <div
          v-if="$q.screen.gt.xs"
          class="col-auto"
        >
          <actions :media="media" />
        </div>
      </div>
    </section>

    <section
      v-if="$q.screen.lt.sm"
      class="bg-grey-8 text-center"
    >
      <actions
        class="container q-py-md"
        :media="media"
      />
    </section>

    <section class="bg-grey-9">
      <subscribe
        class="container q-py-md"
        :media="media"
      />
    </section>
  </div>
</template>

<script>
export default {
  components: {
    Actions: () => import('components/media/Actions'),
    Subscribe: () => import('components/media/Subscribe'),
    Tags: () => import('components/ui/Tags')
  },

  props: {
    media: {
      type: Object,
      required: true
    }
  }
}
</script>
