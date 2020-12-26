<template>
  <div
    class="hero"
    :style="heroStyle"
  >
    <div class="hero-container relative-position">
      <div class="hero-main container fluid relative-position">
        <slot />
      </div>

      <div class="hero-gradient-left absolute-left" />
      <div class="hero-gradient-right absolute-right" />
      <div class="hero-gradient-bottom absolute-bottom" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    heroStyle: {
      type: String,
      default: null
    }
  }
}
</script>
