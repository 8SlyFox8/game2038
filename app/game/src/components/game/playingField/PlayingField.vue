<script setup>
import { computed } from 'vue'
import EmptyCell from '@/components/game/playingField/EmptyCell.vue'
import EnemyCell from '@/components/game/playingField/EnemyCell.vue'
import { useGameSaveStore } from '@/stores/gameSave'

const gameSaveStore = useGameSaveStore()
const filteredPlayingField = computed(() => {
    return gameSaveStore.playingField
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