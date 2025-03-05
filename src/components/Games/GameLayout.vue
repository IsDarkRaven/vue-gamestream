<script setup>
import { ref, watch } from 'vue'
import SharedSearch from '../Shared/SharedSearch.vue'

const emit = defineEmits(['setGameView'])

const { title, games } = defineProps({
  title: {
    type: String,
    default: 'Recent games',
  },
  games: {
    type: Array,
    required: true,
  },
})

const searchInput = ref('')

watch(searchInput, (newValue) => {
  if (newValue.trim().length === 0) {
    emit('setGameView', games)
    return
  }
  const filteredGames = games.filter(
    (game) =>
      game.title.toLowerCase().includes(newValue.toLowerCase()) ||
      game.tags.some((tag) => tag.toLowerCase().includes(newValue.toLowerCase())),
  )
  emit('setGameView', filteredGames)
})
</script>

<template>
  <section>
    <h2>{{ title }}</h2>
    <div class="game-layout">
      <SharedSearch v-model="searchInput" class="my-class" id="search-form" />
      <slot />
    </div>
  </section>
</template>

<style scoped>
.game-layout {
  display: grid;
  gap: 2rem;
  margin: 1rem auto;
  max-width: 90%;
}
</style>
