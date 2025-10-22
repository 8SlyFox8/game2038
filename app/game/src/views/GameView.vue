<script setup>
import GameRecordsModal from '@/components/game/GameRecordsModal.vue'
import PlayingField from '@/components/game/playingField/PlayingField.vue'
</script>

<template>
    <div class="game">
        <PlayingField/>
    </div>
    <GameRecordsModal/>
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