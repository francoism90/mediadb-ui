<template>
  <q-img
    :alt="tag.name"
    :src="tag.thumbnail_url"
    loading="lazy"
    class="tag-title"
    img-class="tag-title-placeholder"
  >
    <div class="absolute-full tag-title-elements">
      <div class="container absolute-top">
        <div class="tag-title-details">
          <div class="q-pt-lg text-h4 text-white ellipsis-2-lines">
            {{ tag.name }}
          </div>

          <div class="text-subtitle1 text-grey-3 ellipsis-2-lines">
            {{ Number(tag.item_count) | approximate }} items
          </div>

          <div
            v-if="tag.overview"
            class="q-pt-md text-subtitle1 text-grey ellipsis-3-lines"
          >
            {{ tag.overview }}
          </div>
        </div>

        <div class="q-pt-sm">
          <div class="q-gutter-sm">
            <q-btn
              unelevated
              class="transparent-1"
              text-color="grey-1"
              size="13px"
              icon="o_theaters"
              label="Videos"
              :to="{ name: 'search', query: { id: +new Date(), q: 'tag:' + tag.slug, t: 'video' } }"
            />

            <q-btn
              unelevated
              class="transparent-1"
              text-color="grey-1"
              size="13px"
              icon="o_folder"
              label="Browse"
              :to="{ name: 'search', query: { id: +new Date(), q: 'tag:' + tag.slug, t: 'collection' } }"
            />

            <q-btn
              v-if="$auth.check({ permissions: 'edit tags'})"
              stack
              unelevated
              class="transparent-1"
              text-color="grey-1"
              size="13px"
              icon="o_wysiwyg"
              label="Edit Item"
              @click="editModal"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="absolute-left tag-gradient-left" />
    <div class="absolute-right tag-gradient-right" />
    <div class="absolute-bottom tag-gradient-bottom" />
  </q-img>
</template>

<script>
import TagModel from 'src/models/Tag'

export default {
  props: {
    tag: {
      type: TagModel,
      required: true
    }
  },

  methods: {
    editModal () {
      // TODO: tag edit modal
    }
  }
}
</script>
