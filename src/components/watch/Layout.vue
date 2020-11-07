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
    Actions: () => import('components/watch/Actions'),
    Navigation: () => import('components/watch/Navigation'),
    Playback: () => import('components/watch/Playback'),
    Seeker: () => import('components/watch/Seeker')
  }
}
</script>
