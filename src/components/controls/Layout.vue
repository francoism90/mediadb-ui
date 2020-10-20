<template>
  <div class="absolute-full player-controls">
    <navigation />
    <playback />

    <div class="q-px-xl q-pb-lg absolute-bottom">
      <seeker />
      <actions />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Actions: () => import('components/controls/Actions'),
    Navigation: () => import('components/controls/Navigation'),
    Playback: () => import('components/controls/Playback'),
    Seeker: () => import('components/controls/Seeker')
  }
}
</script>
