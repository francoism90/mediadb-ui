<template>
  <div>
    <section class="bg-black-bis q-py-lg">
      <div class="container row items-start">
        <div class="col">
          <div class="text-subtitle1 text-grey-5">{{ data.name }}</div>
          <div class="text-subtitle2 text-grey-4">
            <router-link class="text-grey-4 no-decoration" to="/">{{ data.relationships.user.name }}</router-link> •
              {{ Number(data.properties.duration) | timestamp }} •
              {{ Number(data.properties.duration) | approximate }} views
          </div>
          <div class="q-pt-xs">
            <tag v-for="(tag, index) in data.relationships.tags" :key="index" :item="tag" />
          </div>
        </div>

        <div v-if="$q.screen.gt.xs" class="col-auto">
          <actions :data="data" :meta="meta" />
        </div>
      </div>
    </section>

    <section v-if="$q.screen.lt.sm" class="bg-grey-2 text-center">
      <actions class="container q-py-md" :data="data" :meta="meta" />
    </section>

    <section class="bg-grey-1">
      <subscribe class="container q-py-md" :data="data" :meta="meta" />
    </section>
  </div>
</template>

<script>
export default {
  components: {
    Actions: () => import('components/video/Actions'),
    Subscribe: () => import('components/video/Subscribe'),
    Tag: () => import('components/ui/Tag')
  },

  props: {
    data: {
      type: Object,
      required: true
    },

    meta: {
      type: Object,
      required: true
    }
  }
}
</script>
