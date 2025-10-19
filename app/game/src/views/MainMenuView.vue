<script setup>
import { useNavigationGame } from '@/composables/useNavigationGame.js'

const { goToNewGame, goToGame, goToTableRecords } = useNavigationGame()
</script>

<template>
    <div class="main-menu">
        <button
            v-show="false"
            @click="goToNewGame"    
        >
            Продолжить
        </button>
        <button
            @click="goToGame"
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