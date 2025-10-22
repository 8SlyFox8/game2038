<script setup>
import { computed } from 'vue'
import EmptyCell from '@/components/game/playingField/EmptyCell.vue'
import EnemyCell from '@/components/game/playingField/EnemyCell.vue'
import { useGameSaveStore } from '@/stores/gameSave'
import { useInput } from '@/composables/useInput'

const gameSaveStore = useGameSaveStore()
const filteredPlayingField = computed(() => {
    return gameSaveStore.playingField
})

useInput({
    onArrowUp: () => gameSaveStore.move('up'),
    onArrowDown: () => gameSaveStore.move('down'),
    onArrowLeft: () => gameSaveStore.move('left'),
    onArrowRight: () => gameSaveStore.move('right'),
    onSwipeUp: () => gameSaveStore.move('up'),
    onSwipeDown: () => gameSaveStore.move('down'),
    onSwipeLeft: () => gameSaveStore.move('left'),
    onSwipeRight: () => gameSaveStore.move('right'),
})
</script>

<template>
    <div class="playing-field">
        <EmptyCell 
            v-for="(number, index) in gameSaveStore.playingField" 
            :key="index"
        />
    </div>
    <div class="playing-field-overlay">
        <template
            v-for="(number, index) in filteredPlayingField"
            :key="index"
        >
            <EnemyCell
                v-if="number !== 0"
                :number="number"
            />
            <div v-else>
            </div>
        </template>
    </div>
</template>

<style scoped>
.playing-field, .playing-field-overlay {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    justify-items: center;
    width: 100%;
    margin: 0 auto;
    gap: 20px;
}

.playing-field-overlay {
    position: absolute;
    top: 0;
    left: 0;
}
</style>