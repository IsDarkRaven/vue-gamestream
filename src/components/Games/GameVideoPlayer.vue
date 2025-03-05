<script setup>
defineProps({
  video: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="game-video-player">
    <video controls autoplay ref="videoRef" :src="video" type="video/mp4" />
  </div>
</template>

<style scoped>
.game-video-player {
  max-width: 100%;
  overflow: hidden;
}

video {
  width: 100%;
  height: auto;
}
</style>
