<script setup>
import LayoutHero from './components/Layout/LayoutHero.vue'
import GameCard from './components/Games/GameCard.vue'
import GameLayout from './components/Games/GameLayout.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import GameModal from './components/Games/GameModal.vue'

const API_URL = 'https://gamestreamapi.herokuapp.com/api/games'

const state = reactive({
  error: null,
  isLoading: false,
  data: [],
})

const gamesView = ref([])

const fetchGames = async () => {
  try {
    state.isLoading = true
    const response = await fetch(API_URL)
    const json = await response.json()
    state.data = json
  } catch (error) {
    console.error(error)
    state.error = error
  } finally {
    state.isLoading = false
  }
}

onMounted(() => {
  fetchGames()
})

watch(state, (newValue) => {
  gamesView.value = newValue.data
})

const setGameView = (filteredGames) => {
  gamesView.value = filteredGames
}
</script>

<template>
  <LayoutHero />
  <main>
    <GameLayout title="Recent games" :games="state.data" @set-game-view="setGameView">
      <GameCard v-for="game in gamesView" :key="game.title" :game="game" />
    </GameLayout>
    <GameModal />
  </main>
</template>

<style scoped>
main {
  padding: 2rem;
}
</style>
