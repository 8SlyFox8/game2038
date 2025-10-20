<script setup>
import { useNavigationGame } from '@/composables/useNavigationGame.js'
import { useGameSaveStore } from '@/stores/gameSave'

const { goToNewGame, goToGame, goToTableRecords } = useNavigationGame()
const gameSaveStore = useGameSaveStore()

function startNewGame() {
    gameSaveStore.startNewGame()
    goToGame()
}
</script>

<template>
    <div class="main-menu">
        <button
            v-show="gameSaveStore.isGameStarted"
            @click="goToNewGame"    
        >
            Продолжить
        </button>
        <button
            @click="startNewGame"
        >
            Новая игра
        </button>
        <button
            @click="goToTableRecords"
        >
            Таблица рекордов
        </button>
    </div>
    
</template>

<style scoped>
.main-menu {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>