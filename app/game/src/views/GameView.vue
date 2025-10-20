<script setup>
import { ref } from 'vue'
import GameRecordsModal from '@/components/game/GameRecordsModal.vue'
import { useGameSaveStore } from '@/stores/gameSave'

const gameSaveStore = useGameSaveStore()

const isOpenGameRecordsModal = ref(false)
const isWinGame = ref(false)

function openWinGameRecordsModal() {
    isWinGame.value = true
    gameSaveStore.setScore(2048)
    isOpenGameRecordsModal.value = true
}

function openGameRecordsModal() {
    isWinGame.value = false
    isOpenGameRecordsModal.value = true
}
</script>

<template>
    <div class="game">
        <p>Счёт: {{ gameSaveStore.score }}</p>
        <button
            @click="gameSaveStore.setScore(gameSaveStore.score + 2)"
        >
            Увеличить счёт
        </button>
        <button
            @click="openWinGameRecordsModal"
        >
            Выйграть
        </button>
        <button
            @click="openGameRecordsModal"
        >
            Проиграть
        </button>
    </div>
    <GameRecordsModal
        v-model:isOpenGameRecordsModal="isOpenGameRecordsModal"
        v-model:isWinGame="isWinGame"
    />
</template>

<style scoped>
.game {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 50vw;
    height: 50vh;
}
</style>