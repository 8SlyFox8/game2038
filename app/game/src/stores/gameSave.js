import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameSaveStore = defineStore('gameSave', () => {
    const score = ref(0)
    const isGameStarted = ref(false)
    const playingField = ref(createEmptyPlayingField())

    function createEmptyPlayingField() {
        return Array(16).fill(0)
    }

    function setScore(newScore) {
        score.value = newScore
    }

    function resetPlayingField() {
        playingField.value = createEmptyPlayingField()
        placeTwoRandomTwos()
        
    }

    function placeTwoRandomTwos() {
        const emptyCellIndices = Array.from({ length: 16 }, (_, i) => i)

        for (let i = emptyCellIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            [emptyCellIndices[i], emptyCellIndices[j]] = [emptyCellIndices[j], emptyCellIndices[i]]
        }

        const position1 = emptyCellIndices[0]
        const position2 = emptyCellIndices[1]

        playingField.value[position1] = 2
        playingField.value[position2] = 2
    }

    function startNewGame() {
        score.value = 0
        isGameStarted.value = true
        resetPlayingField()
    }

    function resetGame() {
        score.value = 0
        isGameStarted.value = false
        resetPlayingField()
    }

    return {
        score,
        isGameStarted,
        playingField,
        setScore,
        startNewGame,
        resetGame
    }
},
{
  persist: true,
})