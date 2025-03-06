<script setup>
  import { onMounted, ref } from 'vue'

  defineProps({
    video: {
      type: String,
      required: true,
    },
  })

  const videoRef = ref(null)

  const name = 'hola'

  onMounted(() => {
    videoRef.value.play()
  })
</script>

<template>
  <div class="game-video-player">
    <video controls autoplay ref="videoRef" :class="name" :src="video" type="video/mp4" />
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
