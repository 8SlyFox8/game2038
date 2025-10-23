import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameSaveStore = defineStore('gameSave', () => {
    const score = ref(0)
    const isGameStarted = ref(false)
    const playingField = ref(createEmptyPlayingField())
    const isGameOver = ref(false)
    const isWinGame = ref(false)

    function createEmptyPlayingField() {
        return Array(16).fill(0)
    }

    function resetPlayingField() {
        isWinGame.value = false
        isGameOver.value = false
        playingField.value = createEmptyPlayingField()
        placeTwoRandom()
        placeTwoRandom()
        score.value = getCurrentScore()
    }

    function placeTwoRandom() {
        const emptyCellIndices = playingField.value
            .map((value, index) => (value === 0 ? index : -1))
            .filter(index => index !== -1)
            
        if (emptyCellIndices.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCellIndices.length)
            const position = emptyCellIndices[randomIndex]
            playingField.value[position] = 2
        }
    }

    function move(direction) {
        if (isGameOver.value) return

        const oldField = [...playingField.value]

        switch (direction) {
            case 'up':
                for (let column = 0; column < 4; column++) {
                    let verticalLine = []
                    for (let row = 0; row < 4; row++) {
                        verticalLine.push(playingField.value[row * 4 + column])
                    }
                    const newVerticalLine = processLine(verticalLine)
                    for (let row = 0; row < 4; row++) {
                        playingField.value[row * 4 + column] = newVerticalLine[row]
                    }
                }
                break
            case 'down':
                for (let column = 0; column < 4; column++) {
                    let verticalLine = []
                    for (let row = 3; row >= 0; row--) {
                        verticalLine.push(playingField.value[row * 4 + column])
                    }
                    const newVerticalLine = processLine(verticalLine)
                    for (let row = 3; row >= 0; row--) {
                        playingField.value[row * 4 + column] = newVerticalLine[3 - row]
                    }
                }
                break
            case 'left':
                for (let row = 0; row < 4; row++) {
                    let horizontalLine = []
                    for (let column = 0; column < 4; column++) {
                        horizontalLine.push(playingField.value[row * 4 + column])
                    }
                    const newHorizontalLine = processLine(horizontalLine)
                    for (let column = 0; column < 4; column++) {
                        playingField.value[row * 4 + column] = newHorizontalLine[column]
                    }
                }
                break
            case 'right':
                for (let row = 0; row < 4; row++) {
                    let horizontalLine = []
                    for (let column = 3; column >= 0; column--) {
                        horizontalLine.push(playingField.value[row * 4 + column])
                    }
                    const newHorizontalLine = processLine(horizontalLine)
                    for (let column = 3; column >= 0; column--) {
                        playingField.value[row * 4 + column] = newHorizontalLine[3 - column]
                    }
                }
                break
        }
        
        if (areFieldsEqual(oldField, playingField.value)) {
            checkGameOver()
        } else {
            checkWinGame()
        }

        if(!isWinGame.value) {
            placeTwoRandom()
            score.value = getCurrentScore()
        }
    }

    function processLine(line) {
        let filteredLine = line.filter(number => number !== 0)
        
        for (let index = 0; index < filteredLine.length - 1; index++) {
            if (filteredLine[index] !== 0 && filteredLine[index] === filteredLine[index + 1]) {
                filteredLine[index] *= 2
                filteredLine.splice(index + 1, 1)
            }
        }

        while (filteredLine.length < 4) {
            filteredLine.push(0)
        }
        
        return filteredLine
    }

    function getCurrentScore() {
        return playingField.value.reduce((total, number) => total + number, 0)
    }

    function areFieldsEqual(oldField, newField) {
        return JSON.stringify(oldField) === JSON.stringify(newField)
    }

    function checkGameOver() {
        const canMove = playingField.value.some((number, index) => {
            if (number === 0) return true
            const row = Math.floor(index / 4)
            const column = index % 4
            
            if (row < 3 && playingField.value[index + 4] === number) return true
            if (column < 3 && playingField.value[index + 1] === number) return true

            return false
        })

        if (!canMove) {
            isGameOver.value = true
        }
    }

    function checkWinGame() {
        if (playingField.value.includes(2048)) {
            isWinGame.value = true
            isGameOver.value = true
        }
    }

    function startNewGame() {
        isGameStarted.value = true
        resetPlayingField()
    }

    function resetGame() {
        isGameStarted.value = false
        resetPlayingField()
    }

    return {
        score,
        isGameStarted,
        playingField,
        isGameOver,
        isWinGame,
        startNewGame,
        resetGame,
        move
    }
},
{
  persist: true,
})