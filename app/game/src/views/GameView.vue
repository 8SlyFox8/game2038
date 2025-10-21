<script setup>
import { ref } from 'vue'
import GameRecordsModal from '@/components/game/GameRecordsModal.vue'
import PlayingField from '@/components/game/playingField/PlayingField.vue'
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
        <PlayingField/>
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
    position: relative;
}
</style>