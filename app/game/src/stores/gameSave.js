import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameSaveStore = defineStore('gameSave', () => {
    const score = ref(0)
    const isGameStarted = ref(false)

    function setScore(newScore) {
        score.value = newScore
    }

    function startNewGame() {
        score.value = 0
        isGameStarted.value = true
    }

    function resetGame() {
        score.value = 0
        isGameStarted.value = false
    }

    return {
        score,
        isGameStarted,
        setScore,
        startNewGame,
        resetGame
    }
},
{
  persist: true,
})