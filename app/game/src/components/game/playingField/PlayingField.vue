<script setup>
import { computed, ref, watch } from 'vue'
import EmptyCell from '@/components/game/playingField/EmptyCell.vue'
import EnemyCell from '@/components/game/playingField/EnemyCell.vue'
import { useGameSaveStore } from '@/stores/gameSave'
import { useInput } from '@/composables/useInput'

const gameSaveStore = useGameSaveStore()
const filteredPlayingField = computed(() => {
    return gameSaveStore.playingField
})

const currentMoveDirection = ref(null)
const isShaking = ref(false)

watch(() => gameSaveStore.playingField, () => {
    isShaking.value = true
    setTimeout(() => {
        isShaking.value = false
    }, 500)
}, { deep: true })

useInput({
    onArrowUp: () => {
        gameSaveStore.move('up')
        currentMoveDirection.value = 'up'
    },
    onArrowDown: () => {
        gameSaveStore.move('down')
        currentMoveDirection.value = 'down'
    },
    onArrowLeft: () => {
        gameSaveStore.move('left')
        currentMoveDirection.value = 'left'
    },
    onArrowRight: () => {
        gameSaveStore.move('right')
        currentMoveDirection.value = 'right'
    },
    onSwipeUp: () => {
        gameSaveStore.move('up')
        currentMoveDirection.value = 'up'
    },
    onSwipeDown: () => {
        gameSaveStore.move('down')
        currentMoveDirection.value = 'down'
    },
    onSwipeLeft: () => {
        gameSaveStore.move('left')
        currentMoveDirection.value = 'left'
    },
    onSwipeRight: () => {
        gameSaveStore.move('right')
        currentMoveDirection.value = 'right'
    },
})
</script>

<template>
    <div class="playing-field">
        <EmptyCell 
            v-for="(number, index) in gameSaveStore.playingField" 
            :key="index"
        />
    </div>
    <div
        class="playing-field-overlay"
        :class="{
            'shake-up': isShaking && currentMoveDirection === 'up',
            'shake-down': isShaking && currentMoveDirection === 'down',
            'shake-left': isShaking && currentMoveDirection === 'left',
            'shake-right': isShaking && currentMoveDirection === 'right',
        }"
    >
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
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.playing-field-overlay {
    position: absolute;
    top: 0;
    left: 0;
}

.shake-left {
    animation: shake-left 0.5s ease-in-out;
}
@keyframes shake-left {
    0%, 100% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-3px);
    }
    75% {
        transform: translateX(3px);
    }
}

.shake-right {
    animation: shake-right 0.5s ease-in-out;
}
@keyframes shake-right {
    0%, 100% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(3px);
    }
    75% {
        transform: translateX(-3px);
    }
}

.shake-up {
    animation: shake-up 0.5s ease-in-out;
}
@keyframes shake-up {
    0%, 100% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(-3px);
    }
    75% {
        transform: translateY(3px);
    }
}

.shake-down {
    animation: shake-down 0.5s ease-in-out;
}
@keyframes shake-down {
    0%, 100% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(3px);
    }
    75% {
        transform: translateY(-3px);
    }
}
</style>