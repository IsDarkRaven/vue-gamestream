<script setup>
  import { ref, watch } from 'vue'
  import GameCard from './components/Games/GameCard.vue'
  import GameLayout from './components/Games/GameLayout.vue'
  import GameModal from './components/Games/GameModal.vue'
  import LayoutHero from './components/Layout/LayoutHero.vue'
  import SharedLoader from './components/Shared/SharedLoader.vue'
  import { useFetch } from './composables/useFetch'

  const API_URL = 'https://gamestreamapi.herokuapp.com/api/games'
  const gamesView = ref([])

  const { state } = useFetch(API_URL)

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
    <SharedLoader v-if="state.isLoading" />
    <GameLayout title="Recent games" :games="state.data" @set-game-view="setGameView">
      <GameCard v-for="game in gamesView" :key="game.title" :game="game" />
    </GameLayout>
    <Teleport to="body">
      <GameModal />
    </Teleport>
  </main>
</template>

<style scoped>
  main {
    padding: 2rem;
  }
</style>
