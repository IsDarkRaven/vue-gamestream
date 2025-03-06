import { reactive, onMounted } from 'vue'

export function useFetch(apiUrl) {
  const state = reactive({
    error: null,
    isLoading: false,
    data: [],
  })

  const fetchGames = async () => {
    try {
      state.isLoading = true
      const response = await fetch(apiUrl)
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

  return { state }
}
