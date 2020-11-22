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
    Actions: () => import('components/player/Actions'),
    Navigation: () => import('components/player/Navigation'),
    Playback: () => import('components/player/Playback'),
    Seeker: () => import('components/player/Seeker')
  }
}
</script>
